import Link from 'next/link';
import Image from 'next/image';
import { motion, scale } from 'motion/react';

export default function ProfilePicture({ user }) {
  const { id, name, about } = user;

  return (
    <motion.div whileHover={{ scale: 1.04 }} className="block">
      <Link href={`/user/${id}`}>
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-30 w-30">
            <Image
              src={about.avatarUrl || '/default-avatar.jpg'}
              alt={`${name.firstName} ${name.lastName}`}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">
            {`${name.firstName} ${name.lastName}`}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
