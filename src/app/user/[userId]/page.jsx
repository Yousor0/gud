import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { users } from '../../../data/users.js';
import Carasoul from '../../../components/VideoCarasoul';
import { videos } from '../../../data/videos';
import Button from '../../../components/ui/Button';
import MailButton from '../../../components/ui/MailButton';

export default async function ProfessionalProfile({ params }) {
  const { userId } = await params;

  const profile = users.find((user) => String(user.id) === userId);

  if (!profile) {
    notFound();
  }

  console.log(userId);

  const profileVideos = videos.filter((video) => video.userId === profile.id);

  return (
    <div className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5">
      <div
        className={
          profile.type == 'Fitness'
            ? 'from-beige to-blueOne mt-15 flex flex-col gap-24 rounded-sm bg-linear-to-t p-10'
            : 'from-beige to-greenOne mt-15 flex flex-col gap-24 rounded-sm bg-linear-to-t p-10'
        }
      >
        {/* Profile Section */}
        <div className="grid-row grid gap-20 md:grid-cols-2">
          {/* Left */}
          <div>
            <div className="flex justify-center">
              <Image
                src={
                  profile.about.avatarUrl == ''
                    ? '/default-avatar.jpg'
                    : profile.about.avatarUrl
                }
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

            <div className="mt-6 flex justify-center gap-5">
              <div
                className={`${profile.type == 'Fitness' ? 'bg-[#466273]' : 'bg-[#566835]'} rounded-md px-5 py-2 text-white`}
              >
                {profile.type} Professional
              </div>
              <MailButton mail="example@gmail.com" profile={profile} />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 rounded-sm bg-white p-5">
              <h2 className="text-lg font-semibold">{profile.about.header}</h2>
              <p className="text-base">{profile.about.description}</p>
              <Button
                variant={profile.type == 'Fitness' ? 'fitness' : 'nutrition'}
                text="Manage Subscription"
                href="/account/subscription/manage"
              />
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

      <Carasoul videoAPI={profileVideos} />
    </div>
  );
}
