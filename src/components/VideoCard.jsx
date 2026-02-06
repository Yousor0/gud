'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { users } from '../data/users';

export default function VideoCard({ video }) {
  const router = useRouter();
  const user = users.find((u) => u.id === video.userId);

  return (
    <section
      className={`mx-1 rounded-md ${
        user.type === 'Fitness'
          ? 'hover:bg-cyan-800/40'
          : 'hover:bg-emerald-800/40'
      } duration-150 hover:scale-103`}
    >
      <Link href={`/media/${video.id}`} className="block">
        <div className="flex flex-col p-1">
          {/* Thumbnail Image */}
          <Image
            src={video.thumbnailUrl || '/default-thumbnail.png'}
            alt={video.title}
            width={640}
            height={360}
            className="rounded-md"
          />

          {/* Thumbnail Information Wrapper */}
          <div className="flex items-center gap-3">
            {/* Profile Picture */}

            <Image
              src={
                user.about.avatarUrl == ''
                  ? '/default-avatar.jpg'
                  : user.about.avatarUrl
              }
              alt={user.username || 'User'}
              width={40}
              height={40}
              className="rounded-full"
            />

            <div className="flex flex-col">
              {/* Text Information */}
              <h2 className="font-semibold">{video.title}</h2>
              <Link
                className="text-sm text-gray-500"
                href={`/user/${user?.id}`}
              >
                {user.name.firstName + ' ' + user.name.lastName ||
                  'Unknown User'}
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
