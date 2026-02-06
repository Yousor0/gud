import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import defaultAvatar from '../../../../public/default-avatar.jpg';
import { users } from '../../../data/users.js';
import Carasoul from '../../../components/VideoCarasoul';
import { videos } from '../../../data/videos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
} from '@fortawesome/free-solid-svg-icons';

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
      <div className={profile.type == 'Fitness' ? 'm-24 flex flex-col gap-24 bg-linear-to-t from-beige to-blueOne rounded-sm' : 'm-24 flex flex-col gap-24 bg-linear-to-t from-beige to-greenOne rounded-sm'}>
        {/* Profile Section */}
        <div className="m-4 grid grid-cols-2 gap-20">
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

            <div className="mt-6 flex justify-center gap-5">
              <button className={profile.type == 'Fitness' ? 'fitnessButton' : 'nutritionButton'}>
                {profile.type} Professional
              </button>
              <FontAwesomeIcon
                icon={faHeart}
                size="2x"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            <div className='bg-white rounded-sm p-4'>
              <h2 className="text-lg font-semibold">{profile.about.header}</h2>
              <p className="text-base">{profile.about.description}</p>
              <button className={profile.type == 'Fitness' ? 'mt-3 text-left fitnessButton' : 'mt-3 text-left nutritionButton'}>Message Professional</button>
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
