'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import { useProfile } from '../../../../features/profiles/hooks/useProfile';

import ProfileHeader from '../../../../features/profiles/components/ProfileHeader';
import ProfessionalInfo from '../../../../features/profiles/components/ProfessionalInfo';
import EditProfileModal from '../../../../features/profiles/components/EditProfileModal';
import AccountSecurity from '../../../../features/profiles/components/AccountSecurity';
import AccountVideos from '../../../../features/profiles/components/AccountVideos';

export default function AccountPage() {
  const { username } = useParams();
  const { profile: currentUserProfile } = useAuth();
  const { profile, loading, notFound, updateProfileCache } =
    useProfile(username);
  const [editOpen, setEditOpen] = useState(false);

  const isOwner = currentUserProfile?.username === username;

  if (loading)
    return <div className="mx-auto max-w-7xl px-5 py-10">Loading...</div>;
  if (notFound)
    return (
      <div className="mx-auto max-w-7xl px-5 py-10">Profile not found.</div>
    );
  if (!profile) return null;

  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 py-10">
      <div className="flex flex-col gap-5">
        <div className="bg-bg-secondary flex flex-col justify-center gap-4 rounded-sm px-5 py-5">
          <ProfileHeader
            profile={profile}
            isOwner={isOwner}
            onEditClick={() => setEditOpen(true)}
          />

          <ProfessionalInfo profile={profile} />
        </div>
        <AccountVideos profile={profile} />
      </div>

      {isOwner && <AccountSecurity profile={profile} />}

      {editOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditOpen(false)}
          onSaved={(updatedData) => {
            updateProfileCache(updatedData);
            setEditOpen(false);
          }}
        />
      )}
    </main>
  );
}
