import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { users } from '../../../data/users.js';
import { videos } from '../../../data/videos.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/ui/Button.jsx';

export default async function media({ params }) {
  const { content } = await params;

  const movie = videos.find((video) => String(video.id) === content);
  const user = users.find((u) => String(u.id) === movie.userId);

  console.log('user is ', user);

  return (
    <div className="m-24 flex justify-center">
      <div style={{ width: '1280px', justifyContent: 'center' }}>
        <div className="grid grid-cols-1">
          {/* the video thumbnail */}
          <Image
            src={movie.thumbnailUrl || '/default-thumbnail.png'}
            width="1280"
            height="720"
            alt={movie.title}
            className="rounded-sm"
          />
          <div>
            <h1 className="mt-5 flex justify-start text-2xl font-semibold">
              {/* title of the video */}
              {movie.title}
            </h1>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex">
              {/* Profile Picture */}
              <Link href={`/user/${movie.userId}`}>
                <Image
                  src={
                    user.about.avatarUrl == ''
                      ? '/default-avatar.jpg'
                      : user.about.avatarUrl
                  }
                  // src={user?.avatarUrl || '/default-avatar.jpg'}
                  alt={user.username || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
              <div className="ml-3">
                <h1 className="flex justify-start font-normal">
                  {user.name.firstName} {user.name.lastName}
                </h1>
                <h2 className="flex justify-start text-sm text-gray-500">
                  {user.specialty[0]}
                </h2>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button href="#" text="Subsribe" />
              <FontAwesomeIcon icon={faBell} size="2x" color="#9D4431" />
              <FontAwesomeIcon icon={faHeart} size="2x" color="#9D4431" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
