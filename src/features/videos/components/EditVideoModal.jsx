'use client';

import { useState } from 'react';
import { updateVideo } from '../services/videoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export default function EditVideoModal({ video, onClose, onSaved, onDeleted }) {
  const [formData, setFormData] = useState({
    title: video.title || '',
    description: video.description || '',
    tags: video.tags || [],
  });
  const [newTag, setNewTag] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  function setField(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function addTag() {
    const val = newTag.trim().toLowerCase().replace(/\s+/g, '-');
    if (val && !formData.tags.includes(val)) {
      setField('tags', [...formData.tags, val]);
    }
    setNewTag('');
  }

  function removeTag(i) {
    setField(
      'tags',
      formData.tags.filter((_, idx) => idx !== i)
    );
  }

  async function handleSave() {
    setSaving(true);
    setSaveStatus(null);
    try {
      const updated = await updateVideo(video.id, {
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
      });
      setSaveStatus('success');
      setTimeout(() => {
        onSaved(updated);
      }, 1000);
    } catch (err) {
      console.error('Save failed:', err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch('/api/delete-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId: video.id, s3Key: video.video_s3_key }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Delete failed');
      }
      onDeleted();
    } catch (err) {
      console.error('Delete failed:', err);
      setDeleteError(err.message);
      setDeleting(false);
    }
  }

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
            Edit Video
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
          {/* Title */}
          <div>
            <h4 className="mb-1 text-sm font-medium">Title</h4>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setField('title', e.target.value)}
              className="text-input"
            />
          </div>

          {/* Description */}
          <div>
            <h4 className="mb-1 text-sm font-medium">Description</h4>
            <textarea
              value={formData.description}
              onChange={(e) => setField('description', e.target.value)}
              rows={4}
              placeholder="Describe your video..."
              className="border-bg-accent focus:border-brand-primary w-full resize-none rounded-md border px-3 py-2 text-sm duration-100 focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <h4 className="mb-2 text-sm font-medium">Tags</h4>
            {formData.tags.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {formData.tags.map((tag, i) => (
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
                placeholder="Add a tag..."
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

          {/* Delete section */}
          <div className="border-t border-gray-200 pt-4">
            {!confirmingDelete ? (
              <button
                type="button"
                onClick={() => setConfirmingDelete(true)}
                className="rounded-md border border-red-300 px-4 py-2 text-sm text-red-600 duration-100 hover:bg-red-50"
              >
                Delete Video
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-red-600">
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white duration-100 hover:bg-red-700 disabled:opacity-60"
                  >
                    {deleting ? 'Deleting...' : 'Yes, Delete'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmingDelete(false)}
                    disabled={deleting}
                    className="border-bg-accent hover:bg-bg-accent rounded-md border px-4 py-2 text-sm duration-100"
                  >
                    Cancel
                  </button>
                </div>
                {deleteError && (
                  <p className="text-sm text-red-600">{deleteError}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
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
