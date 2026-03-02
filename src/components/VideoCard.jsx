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
      <div className="flex flex-col gap-2 p-2">
        {/* Thumbnail Image */}
        <Link href={`/media/${video.id}`} className="block">
          <Image
            src={video.thumbnailUrl || '/default-thumbnail.png'}
            alt={video.title}
            width={640}
            height={360}
            className="rounded-md"
          />
        </Link>

        {/* Thumbnail Information Wrapper */}
        <div className="ml-3 flex items-center gap-3">
          {/* Profile Picture */}
          <Link
            className="flex gap-3 text-sm hover:text-[#222222]"
            href={`/user/${user?.id}`}
          >
            <Image
              src={
                user.about.avatarUrl == ''
                  ? '/default-avatar.jpg'
                  : user.about.avatarUrl
              }
              alt={user.username || 'User'}
              width={45}
              height={45}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col">
              {/* Text Information */}
              <h2 className="font-semibold">{video.title}</h2>
              <p>
                {user.name.firstName + ' ' + user.name.lastName ||
                  'Unknown User'}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
