'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireRole } from '../../hooks/useRequireRole';
import { useAuth } from '../../context/AuthContext';
import { createVideo } from '../../features/videos/services/videoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloudArrowUp,
  faImage,
  faFilm,
} from '@fortawesome/free-solid-svg-icons';

function uploadWithProgress(url, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    });
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed: ${xhr.status}`));
    });
    xhr.addEventListener('error', () => reject(new Error('Upload error')));
    xhr.send(file);
  });
}

function getVideoDuration(file) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.addEventListener('loadedmetadata', () => {
      resolve(Math.round(video.duration));
      URL.revokeObjectURL(video.src);
    });
    video.src = URL.createObjectURL(file);
  });
}

function captureVideoThumbnail(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;

    const url = URL.createObjectURL(file);

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(1, video.duration * 0.1);
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to capture thumbnail'));
        },
        'image/jpeg',
        0.85
      );
    });

    video.addEventListener('error', () => {
      URL.revokeObjectURL(url);
      reject(new Error('Video load error'));
    });

    video.src = url;
  });
}

const LEVELS = ['beginner', 'intermediate', 'advanced'];
const TYPES = ['fitness', 'nutrition'];

export default function UploadPage() {
  useRequireRole('professional');
  const { user } = useAuth();
  const router = useRouter();

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  async function handleVideoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    e.target.value = '';

    try {
      const blob = await captureVideoThumbnail(file);
      const thumbFile = new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' });
      setThumbnailFile(thumbFile);
      setThumbnailPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(blob);
      });
    } catch (err) {
      console.error('Auto-thumbnail failed:', err);
    }
  }

  function handleThumbnailChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    const preview = URL.createObjectURL(file);
    setThumbnailPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return preview;
    });
    e.target.value = '';
  }

  function addTag() {
    const val = newTag.trim().toLowerCase().replace(/\s+/g, '-');
    if (val && !tags.includes(val)) setTags((prev) => [...prev, val]);
    setNewTag('');
  }

  function removeTag(i) {
    setTags((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleUpload() {
    if (!videoFile) return setError('Please select a video file.');
    if (!thumbnailFile) return setError('Please wait — thumbnail is still generating.');
    if (!title.trim()) return setError('Please enter a title.');

    setError(null);
    setUploading(true);
    setProgress(0);

    try {
      // 1. Get pre-signed URLs
      const res = await fetch('/api/get-video-upload-urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoFileType: videoFile.type,
          videoFileSize: videoFile.size,
          thumbnailFileType: thumbnailFile.type,
          thumbnailFileSize: thumbnailFile.size,
        }),
      });

      if (!res.ok) {
        const { error: apiError } = await res.json();
        throw new Error(apiError || 'Failed to get upload URLs');
      }

      const { videoUploadUrl, thumbnailUploadUrl, s3Key } = await res.json();

      // 2. Upload thumbnail
      await fetch(thumbnailUploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': thumbnailFile.type },
        body: thumbnailFile,
      });

      // 3. Get video duration
      const duration = await getVideoDuration(videoFile);

      // 4. Upload video with progress tracking
      await uploadWithProgress(videoUploadUrl, videoFile, setProgress);

      // 5. Save record to DB
      const video = await createVideo({
        user_id: user.id,
        title: title.trim(),
        description: description.trim(),
        tags,
        level: level || null,
        type: type || null,
        video_s3_key: s3Key,
        duration_seconds: duration,
        status: 'published',
      });

      router.push(`/watch/${video.id}`);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message || 'Upload failed. Please try again.');
      setUploading(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <h1 className="section-title mb-6">Upload Video</h1>

      <div className="bg-bg-secondary flex flex-col gap-6 rounded-sm px-6 py-6">
        {/* Video file */}
        <div>
          <h4 className="mb-2 text-sm font-medium">Video File</h4>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/webm"
            className="hidden"
            onChange={handleVideoChange}
          />
          <button
            type="button"
            onClick={() => videoInputRef.current?.click()}
            className="border-bg-accent hover:bg-bg-accent flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 text-sm duration-100"
          >
            <FontAwesomeIcon icon={faFilm} />
            {videoFile ? videoFile.name : 'Choose a video file…'}
          </button>
        </div>

        {/* Thumbnail */}
        <div>
          <h4 className="mb-2 text-sm font-medium">Thumbnail</h4>
          <input
            ref={thumbnailInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleThumbnailChange}
          />
          {thumbnailPreview ? (
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailPreview}
                alt="thumbnail preview"
                className="h-20 w-36 rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => thumbnailInputRef.current?.click()}
                className="border-bg-accent hover:bg-bg-accent rounded-md border px-4 py-2 text-sm duration-100"
              >
                Change
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => thumbnailInputRef.current?.click()}
              className="border-bg-accent hover:bg-bg-accent flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 text-sm duration-100"
            >
              <FontAwesomeIcon icon={faImage} />
              Choose a thumbnail image…
            </button>
          )}
        </div>

        {/* Title */}
        <div>
          <h4 className="mb-1 text-sm font-medium">Title</h4>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title…"
            className="text-input"
          />
        </div>

        {/* Description */}
        <div>
          <h4 className="mb-1 text-sm font-medium">Description</h4>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe your video…"
            className="border-bg-accent focus:border-brand-primary w-full resize-none rounded-md border px-3 py-2 text-sm duration-100 focus:outline-none"
          />
        </div>

        {/* Level + Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="mb-1 text-sm font-medium">Level</h4>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="dropdown"
            >
              <option value="">Select a level…</option>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h4 className="mb-1 text-sm font-medium">Content Type</h4>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="dropdown"
            >
              <option value="">Select a type…</option>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="mb-2 text-sm font-medium">Tags</h4>
          {tags.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-bg-accent flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    className="text-text-accent ml-1 duration-100 hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Add a tag…"
              className="border-bg-accent focus:border-brand-primary rounded-md border px-3 py-2 text-sm duration-100 focus:outline-none"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-brand-primary text-bg-primary hover:bg-brand-primary-hover rounded-md px-4 py-2 text-sm duration-100"
            >
              Add
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {uploading && (
          <div className="flex flex-col gap-1">
            <div className="bg-bg-accent h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-brand-primary h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-text-accent text-xs">
              Uploading… {progress}%
            </p>
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
            className="bg-brand-primary text-bg-primary hover:bg-brand-primary-hover flex items-center gap-2 rounded-md px-5 py-2 text-sm font-semibold shadow-sm duration-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FontAwesomeIcon icon={faCloudArrowUp} />
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={uploading}
            className="border-bg-accent hover:bg-bg-accent rounded-md border px-5 py-2 text-sm duration-100 disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}
