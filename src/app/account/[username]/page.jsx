'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import { useAuth } from '../../../context/AuthContext';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Button from '../../../components/ui/Button';
import VideoCarousel from '../../../components/VideoCarousel';

const inputClass =
  'w-full rounded-md border border-bg-accent px-3 py-2 text-sm duration-100 focus:border-brand-primary focus:outline-none';

export default function AccountPage() {
  const { username } = useParams();
  const { profile: currentUserProfile } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    avatar_public_id: '',
    specialties: [],
    certifications: [],
    website_url: '',
    youtube_url: '',
    instagram_url: '',
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newCertification, setNewCertification] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*, videos(*)')
        .eq('username', username)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          bio: data.bio || '',
          avatar_public_id: data.avatar_public_id || '',
          specialties: data.specialties || [],
          certifications: data.certifications || [],
          website_url: data.website_url || '',
          youtube_url: data.youtube_url || '',
          instagram_url: data.instagram_url || '',
        });
      }
      setLoading(false);
    }

    fetchProfile();
  }, [username]);

  const isOwner = currentUserProfile?.username === username;
  const isProfessional = profile?.role === 'professional';

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
    const supabase = createClient();

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

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', profile.id);

    if (error) {
      setSaveStatus('error');
    } else {
      setProfile((prev) => ({ ...prev, ...updateData }));
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    }
    setSaving(false);
  }

  if (loading)
    return <div className="mx-auto max-w-7xl px-5 py-10">Loading...</div>;
  if (notFound)
    return (
      <div className="mx-auto max-w-7xl px-5 py-10">Profile not found.</div>
    );
  if (!profile) return null;

  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 py-10">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <CldImage
          src={profile.avatar_public_id || 'default-avatar_m0m2pe'}
          width={120}
          height={120}
          alt={`${profile.username} avatar`}
          className="aspect-square rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <h1 className="section-title">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-gray-600">{profile.username}</p>
        </div>
      </div>

      {/* Videos */}
      {profile.videos?.length > 0 && (
        <VideoCarousel sectionTitle="Videos" videoAPI={profile.videos} />
      )}

      {/* Owner-only settings */}
      {isOwner && (
        <div className="flex flex-col gap-6">
          {/* Edit Profile */}
          <div className="bg-bg-secondary rounded-sm p-5">
            <h2 className="mb-4 text-lg font-semibold">Edit Profile</h2>
            <div className="flex flex-col gap-5">
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
                  {/* Requires an unsigned upload preset named "gud_avatars" in your Cloudinary dashboard */}
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

              {/* First + Last name */}
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

              {/* Professional-only fields */}
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
                        onChange={(e) =>
                          setField('website_url', e.target.value)
                        }
                        placeholder="https://..."
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-medium">YouTube</h4>
                      <input
                        type="url"
                        value={formData.youtube_url}
                        onChange={(e) =>
                          setField('youtube_url', e.target.value)
                        }
                        placeholder="https://youtube.com/..."
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-medium">Instagram</h4>
                      <input
                        type="url"
                        value={formData.instagram_url}
                        onChange={(e) =>
                          setField('instagram_url', e.target.value)
                        }
                        placeholder="https://instagram.com/..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Save */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-brand-primary text-bg-primary hover:bg-brand-primary-hover rounded-md px-5 py-2 text-sm font-semibold shadow-sm duration-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                {saveStatus === 'success' && (
                  <span className="text-sm text-green-600">
                    Saved successfully!
                  </span>
                )}
                {saveStatus === 'error' && (
                  <span className="text-sm text-red-600">
                    Failed to save. Try again.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="bg-bg-secondary rounded-sm p-5">
            <h2 className="mb-4 text-lg font-semibold">Account Security</h2>
            <div className="flex flex-col gap-4">
              <div>
                <h4 className="mb-1 text-sm font-medium">Email</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    defaultValue={profile.email}
                    className="border-bg-accent min-w-60 rounded-md border px-3 py-2 text-sm focus:outline-none"
                  />
                  <Button text="Edit Email" />
                </div>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-medium">Password</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="border-bg-accent min-w-60 rounded-md border px-3 py-2 text-sm focus:outline-none"
                  />
                  <Button text="Edit Password" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary rounded-sm p-5">
            <h2 className="mb-2 text-lg font-semibold">My Membership</h2>
            <p className="mb-4 text-sm">Premium Plan</p>
            <Button
              text="Manage Membership"
              href="/account/subscription/manage"
            />
          </div>

          <div className="bg-bg-secondary col-span-full rounded-sm p-5">
            <h2 className="text-lg font-semibold">Devices</h2>
            <p className="mb-2 text-sm text-gray-500">
              Connect your device to optimize your experience
            </p>
            <Button text="Add New Device" />
          </div>

          <div className="flex justify-end">
            <Button text="Delete Account" variant="delete" />
          </div>
        </div>
      )}
    </main>
  );
}
