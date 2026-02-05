import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import defaultAvatar from '../../../../public/default-avatar.jpg';
import { users } from '../../../data/users.js';
import Carasoul from '../../../components/VideoCarasoul';
import { videos } from '../../../data/videos';

export default async function ProfessionalProfile({ params }) {
  const { userId } = await params;

  const profile = users.find((user) => String(user.id) === userId);

  if (!profile) {
    notFound();
  }

  console.log(userId);

  const profileVideos =  videos.filter(video => video.userId === profile.id);

  return (
    <div>
      <div className="m-24 flex flex-col gap-24">
        {/* Profile Section */}
        <div className="grid grid-cols-2 gap-20">
          {/* Left */}
          <div>
            <div className="flex justify-center">
              <Image
                src={profile.about.avatarUrl == '' ? '/default-avatar.jpg' : profile.about.avatarUrl}
                width={220}
                height={220}
                alt="profile avatar"
                className="rounded-full"
              />
            </div>

            <div className="mt-4 text-center">
              <h1 className="text-xl font-semibold">
                {profile.name.firstName} {profile.name.lastName}
              </h1>
              <h3 className="text-sm text-gray-600">{profile.specialty[0]}</h3>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-5">
              <button className="text-right">
                {profile.type} Professional
              </button>
              <button className="text-left">❤️</button>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-semibold">{profile.about.header}</h2>
              <p className="text-base">{profile.about.description}</p>
              <button className="mt-3 text-left">Message Professional</button>
            </div>

            <div>
              <h2 className="text-lg font-semibold">Specialties</h2>
              <ul className="ml-5 list-disc text-sm">
                {profile.specialty.slice(1).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Content Below */}

      <Carasoul videoAPI={profileVideos} sectionTitle={'Content'} />
    </div>
  );
}
