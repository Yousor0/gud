import Link from 'next/link';
import Image from 'next/image';
import { users } from '../data/users';

export default function VideoCard({ video }) {
  const user = users.find((u) => u.id === video.userId);

  console.log(user.username);
  return (
    <section
      className={`mx-1 rounded-md ${user.type === 'Fitness' ? 'hover:bg-cyan-800/40' : 'hover:bg-emerald-800/40'} duration-150 hover:scale-103`}
    >
      <Link href={`video/${video.id}`}>
        <div className="flex flex-col gap-1 p-2">
          {/* Thumbnail Image */}
          <Image
            src={video.thumbnail || '/default-thumbnail.png'}
            alt={video.title}
            width={640}
            height={360}
            className="rounded-md"
          />

          {/* Thumbnail Information Wrapper */}
          <div className="flex items-center gap-3">
            {/* Profile Picture */}
            <Link href={`user/${user?.id}`}>
              <Image
                src={'/default-avatar.jpg'}
                // src={user?.avatarUrl || '/default-avatar.jpg'}
                alt={user.username || 'User'}
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <div className="flex flex-col">
              {/* Text Information */}
              <h2 className="font-semibold">{video.title}</h2>
              <Link className="text-sm text-gray-500" href={`user/${user?.id}`}>
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
