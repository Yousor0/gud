'use client';

import { useState } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { updateProfile } from '../services/profileService';

const inputClass =
  'w-full rounded-md border border-bg-accent px-3 py-2 text-sm duration-100 focus:border-brand-primary focus:outline-none';

export default function EditProfileModal({ profile, onClose, onSaved }) {
  const isProfessional = profile.role === 'professional';

  const [formData, setFormData] = useState({
    first_name: profile.first_name || '',
    last_name: profile.last_name || '',
    bio: profile.bio || '',
    avatar_public_id: profile.avatar_public_id || '',
    specialties: profile.specialties || [],
    certifications: profile.certifications || [],
    website_url: profile.website_url || '',
    youtube_url: profile.youtube_url || '',
    instagram_url: profile.instagram_url || '',
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newCertification, setNewCertification] = useState('');

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

  async function handleSave() {
    setSaving(true);
    setSaveStatus(null);

    const updateData = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      bio: formData.bio,
      avatar_public_id: formData.avatar_public_id,
    };

    if (isProfessional) {
      updateData.specialties = formData.specialties;
      updateData.certifications = formData.certifications;
      updateData.website_url = formData.website_url;
      updateData.youtube_url = formData.youtube_url;
      updateData.instagram_url = formData.instagram_url;
    }

    try {
      await updateProfile(profile.id, updateData);
      setSaveStatus('success');
      setTimeout(() => {
        onSaved(updateData);
      }, 1500);
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
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
          <h2 className="text-lg font-semibold">Edit Profile</h2>
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
            <div className="flex items-center gap-4">
              <CldImage
                src={formData.avatar_public_id || 'default-avatar_m0m2pe'}
                width={72}
                height={72}
                alt="avatar preview"
                className="aspect-square rounded-full object-cover"
              />
              <CldUploadWidget
                uploadPreset="gud_avatars"
                options={{
                  cropping: true,
                  croppingAspectRatio: 1,
                  folder: 'avatars',
                }}
                onSuccess={(result) =>
                  setField('avatar_public_id', result.info.public_id)
                }
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="border-bg-accent hover:bg-bg-accent rounded-md border px-4 py-2 text-sm duration-100"
                  >
                    Change Avatar
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-1 text-sm font-medium">First Name</h4>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setField('first_name', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium">Last Name</h4>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setField('last_name', e.target.value)}
                className={inputClass}
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
                          className="text-text-accent hover:text-text-primary ml-1 duration-100"
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
                          className="text-text-accent hover:text-text-primary ml-1 duration-100"
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
                    className={inputClass}
                  />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium">YouTube</h4>
                  <input
                    type="url"
                    value={formData.youtube_url}
                    onChange={(e) => setField('youtube_url', e.target.value)}
                    placeholder="https://youtube.com/..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-medium">Instagram</h4>
                  <input
                    type="url"
                    value={formData.instagram_url}
                    onChange={(e) => setField('instagram_url', e.target.value)}
                    placeholder="https://instagram.com/..."
                    className={inputClass}
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
