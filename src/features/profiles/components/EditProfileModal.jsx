'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import { avatarUrl } from '@/lib/mediaUrl';
import {
  updateProfile,
  updateProfessional,
  fetchProfessionalByUserId,
} from '../services/profileService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

// Render the cropped area onto a canvas and return a Blob
async function getCroppedBlob(imageSrc, pixelCrop) {
  const image = await new Promise((resolve, reject) => {
    const img = new window.Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', reject);
    img.src = imageSrc;
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      },
      'image/webp',
      0.85
    );
  });
}

export default function EditProfileModal({ profile, onClose, onSaved }) {
  const isProfessional = profile.role === 'professional';

  const [formData, setFormData] = useState({
    first_name: profile.first_name || '',
    last_name: profile.last_name || '',
    bio: profile.bio || '',
    avatar_public_id: profile.avatar_public_id || '',
    content_type: null,
    specialties: [],
    certifications: [],
    website_url: '',
    twitter_url: '',
    youtube_url: '',
    instagram_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newCertification, setNewCertification] = useState('');

  // Crop state
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isProfessional) return;
    fetchProfessionalByUserId(profile.user_id)
      .then((pro) => {
        setFormData((prev) => ({
          ...prev,
          content_type: pro.content_type || null,
          specialties: pro.specialties || [],
          certifications: pro.certifications || [],
          website_url: pro.website_url || '',
          twitter_url: pro.twitter_url || '',
          youtube_url: pro.youtube_url || '',
          instagram_url: pro.instagram_url || '',
        }));
      })
      .catch(() => {});
  }, [isProfessional, profile.user_id]);

  function setField(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function addSpecialty() {
    const val = newSpecialty.trim();
    if (val && !formData.specialties.includes(val)) {
      setField('specialties', [...formData.specialties, val]);
    }
    setNewSpecialty('');
  }

  function removeSpecialty(i) {
    setField(
      'specialties',
      formData.specialties.filter((_, idx) => idx !== i)
    );
  }

  function addCertification() {
    const val = newCertification.trim();
    if (val && !formData.certifications.includes(val)) {
      setField('certifications', [...formData.certifications, val]);
    }
    setNewCertification('');
  }

  function removeCertification(i) {
    setField(
      'certifications',
      formData.certifications.filter((_, idx) => idx !== i)
    );
  }

  // ── Avatar upload flow ──────────────────────────────────────────────────────

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => setImageSrc(reader.result));
    reader.readAsDataURL(file);
    // Reset file input so the same file can be re-selected if needed
    e.target.value = '';
  }

  const onCropComplete = useCallback((_croppedArea, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  async function handleCropConfirm() {
    if (!imageSrc || !croppedAreaPixels) return;
    setUploadingAvatar(true);
    try {
      const blob = await getCroppedBlob(imageSrc, croppedAreaPixels);

      // Get pre-signed URL (userId comes from the auth session server-side)
      const res = await fetch('/api/get-upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileType: 'image/webp',
          fileSize: blob.size,
          mediaType: 'avatar',
        }),
      });
      if (!res.ok) throw new Error('Failed to get upload URL');
      const { url, key } = await res.json();

      // PUT directly to S3 — fixed key overwrites previous avatar in place
      const putRes = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/webp' },
        body: blob,
      });
      if (!putRes.ok) throw new Error('S3 upload failed');

      setField('avatar_public_id', key);
      setImageSrc(null);
    } catch (err) {
      console.error('Avatar upload failed:', err);
    } finally {
      setUploadingAvatar(false);
    }
  }

  function handleCropCancel() {
    setImageSrc(null);
  }

  // ── Profile save ─────────────────────────────────────────────────────────────

  async function handleSave() {
    setSaving(true);
    setSaveStatus(null);

    const updateData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      bio: formData.bio,
      avatar_public_id: formData.avatar_public_id,
    };

    const professionalData = {
      content_type: formData.content_type || null,
      specialties: formData.specialties,
      certifications: formData.certifications,
      website_url: formData.website_url,
      youtube_url: formData.youtube_url,
      instagram_url: formData.instagram_url,
      twitter_url: formData.twitter_url,
    };

    try {
      await updateProfile(profile.user_id, updateData);

      if (isProfessional) {
        await updateProfessional(profile.user_id, professionalData);
      }

      setSaveStatus('success');
      setTimeout(() => {
        onSaved({ ...updateData, ...professionalData });
      }, 1500);
    } catch (err) {
      console.error('Save failed:', err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-bg-primary flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold">
            <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
            Edit Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-text-accent hover:text-text-primary text-xl leading-none duration-100"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 px-6 py-5">
          {/* Avatar */}
          <div>
            <h4 className="mb-2 text-sm font-medium">Avatar</h4>

            {/* Crop UI */}
            {imageSrc ? (
              <div className="flex flex-col gap-3">
                <div className="relative h-64 w-full overflow-hidden rounded-md bg-gray-900">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCropConfirm}
                    disabled={uploadingAvatar}
                    className="bg-brand-primary text-bg-primary hover:bg-brand-primary-hover rounded-md px-4 py-2 text-sm font-semibold duration-100 disabled:opacity-60"
                  >
                    {uploadingAvatar ? 'Uploading…' : 'Confirm Crop'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCropCancel}
                    disabled={uploadingAvatar}
                    className="border-bg-accent hover:bg-bg-accent rounded-md border px-4 py-2 text-sm duration-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Image
                  src={avatarUrl(formData.avatar_public_id)}
                  width={72}
                  height={72}
                  alt="avatar preview"
                  className="aspect-square rounded-full object-cover"
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-bg-accent hover:bg-bg-accent rounded-md border px-4 py-2 text-sm duration-100"
                >
                  Change Avatar
                </button>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-1 text-sm font-medium">First Name</h4>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setField('first_name', e.target.value)}
                className="text-input"
              />
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium">Last Name</h4>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setField('last_name', e.target.value)}
                className="text-input"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="mb-1 text-sm font-medium">Bio</h4>
            <textarea
              value={formData.bio}
              onChange={(e) => setField('bio', e.target.value)}
              rows={3}
              placeholder="Tell us about yourself..."
              className="border-bg-accent focus:border-brand-primary w-full resize-none rounded-md border px-3 py-2 text-sm duration-100 focus:outline-none"
            />
          </div>

          {isProfessional && (
            <>
              {/* Content Type */}
              <div>
                <h4 className="mb-2 text-sm font-medium">Content Type</h4>
                <select
                  value={formData.content_type || ''}
                  onChange={(e) =>
                    setField('content_type', e.target.value || null)
                  }
                  className="dropdown"
                >
                  <option value="" disabled>
                    Select a content type...
                  </option>
                  <option value="fitness">Fitness</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="mental_health">Mental Health</option>
                </select>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="mb-2 text-sm font-medium">Specialties</h4>
                {formData.specialties.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {formData.specialties.map((s, i) => (
                      <span
                        key={i}
                        className="bg-bg-accent flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(i)}
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
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSpecialty();
                      }
                    }}
                    placeholder="Add a specialty..."
                    className="border-bg-accent focus:border-brand-primary rounded-md border px-3 py-2 text-sm duration-100 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addSpecialty}
                    className="bg-brand-primary text-bg-primary hover:bg-brand-primary-hover rounded-md px-4 py-2 text-sm duration-100"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h4 className="mb-2 text-sm font-medium">Certifications</h4>
                {formData.certifications.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {formData.certifications.map((c, i) => (
                      <span
                        key={i}
                        className="bg-bg-accent flex items-center gap-1 rounded-full px-3 py-1 text-sm"
                      >
                        {c}
                        <button
                          type="button"
                          onClick={() => removeCertification(i)}
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
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCertification();
                      }
                    }}
                    placeholder="Add a certification..."
                    className="border-bg-accent focus:border-brand-primary rounded-md border px-3 py-2 text-sm duration-100 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCertification}
                    className="bg-brand-primary text-bg-primary hover:bg-brand-primary-hover rounded-md px-4 py-2 text-sm duration-100"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <h4 className="mb-1 text-sm font-medium">Website</h4>
                  <input
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setField('website_url', e.target.value)}
                    placeholder="https://..."
                    className="text-input"
                  />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium">YouTube</h4>
                  <input
                    type="url"
                    value={formData.youtube_url}
                    onChange={(e) => setField('youtube_url', e.target.value)}
                    placeholder="https://youtube.com/..."
                    className="text-input"
                  />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium">Instagram</h4>
                  <input
                    type="url"
                    value={formData.instagram_url}
                    onChange={(e) => setField('instagram_url', e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="text-input"
                  />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium">X</h4>
                  <input
                    type="url"
                    value={formData.twitter_url}
                    onChange={(e) => setField('twitter_url', e.target.value)}
                    placeholder="https://x.com/..."
                    className="text-input"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !!imageSrc}
            className="bg-brand-primary text-bg-primary hover:bg-brand-primary-hover rounded-md px-5 py-2 text-sm font-semibold shadow-sm duration-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border-bg-accent hover:bg-bg-accent rounded-md border px-5 py-2 text-sm duration-100"
          >
            Cancel
          </button>
          {saveStatus === 'success' && (
            <span className="text-sm text-green-600">Saved successfully!</span>
          )}
          {saveStatus === 'error' && (
            <span className="text-sm text-red-600">
              Failed to save. Try again.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
