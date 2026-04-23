'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { avatarUrl, thumbnailUrl, videoUrl } from '@/lib/mediaUrl';
import VideoPlayer from '../../../features/videos/components/VideoPlayer';
import { SidebarVideoCard } from '../../../features/videos/components/VideoCard';
import CommentSection from '../../../features/comments/components/CommentSection';
import AuthorSidebarCard from '../../../features/profiles/components/AuthorSidebarCard';
import EditVideoModal from '../../../features/videos/components/EditVideoModal';
import { useAuth } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'motion/react';

function formatViews(n) {
  return (n ?? 0).toLocaleString('en-US');
}

// --- Sub-components ---

// TAG LEVEL COLOR

const DIFF_COLORS = {
  beginner: 'tag-beginner',
  intermediate: 'tag-intermediate',
  advanced: 'tag-advanced',
};

const CONTENT_TYPE_COLORS = {
  fitness: 'tag-fitness',
  nutrition: 'tag-nutrition',
};

function VideoTagsRow({ level, tags, type }) {
  if (!tags?.length) return null;
  return (
    <div className="-mt-1 flex flex-wrap gap-1">
      {level && (
        <span className={`${DIFF_COLORS[level]} tag`}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      )}
      {type && (
        <span className={`${CONTENT_TYPE_COLORS[type]} tag`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      )}
      {tags.map((tag, i) => (
        <Link
          key={i}
          href={`/search?q=${encodeURIComponent(tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' '))}`}
          className="hover:bg-bg-accent border-bg-accent text-text-secondary rounded-full border px-2 py-1 text-xs font-medium duration-150"
        >
          {tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')}
        </Link>
      ))}
    </div>
  );
}

function VideoMeta({ profile, views }) {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/account/${profile?.username}`}
        className="flex items-center gap-2 hover:opacity-80"
      >
        <Image
          src={avatarUrl(profile?.avatar_s3_key)}
          width={40}
          height={40}
          alt={profile?.username ?? ''}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div>
          {(profile?.first_name || profile?.last_name) && (
            <p className="font-semibold">
              {profile.first_name} {profile.last_name}
            </p>
          )}
          {profile?.username && (
            <p className="text-sm text-gray-500">@{profile.username}</p>
          )}
        </div>
      </Link>

      <div className="text-text-primary flex gap-4 text-sm">
        <span>{formatViews(views)} views</span>
      </div>
    </div>
  );
}

function VideoDescription({ description }) {
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    if (!expanded && descRef.current) {
      setIsClamped(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, [description, expanded]);

  if (!description) return null;

  return (
    <div className="bg-bg-secondary body-small rounded-md p-3">
      <p ref={descRef} className={expanded ? '' : 'line-clamp-3'}>
        {description}
      </p>
      {(isClamped || expanded) && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="text-brand-primary hover:text-brand-primary-hover mt-1 w-full text-left text-sm font-semibold duration-150"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

// --- Main layout ---
const supabase = createClient();

export default function MediaPageContent({ video, relatedVideos, comments }) {
  const profile = video.profiles;
  const [views, setViews] = useState(video.views);


  useEffect(() => {
    if (!video?.id) return;

    const key = `viewed_${video.id}`;
    if (localStorage.getItem(key)) return;

    supabase.rpc('increment_video_views', { video_id: video.id }).then(() => {
      setViews((prev) => prev + 1);
      localStorage.setItem(key, '1');
    });
  }, [video.id]);
  const { profile: currentUserProfile } = useAuth();
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [videoData, setVideoData] = useState(video);

  const isOwner = currentUserProfile?.user_id === video.user_id;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {/* Left column: player + info + comments */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            <VideoPlayer
              key={video.id}
              src={videoUrl(video.video_s3_key)}
              poster={thumbnailUrl(video.video_s3_key)}
              knownDuration={video.duration_seconds}
            />

            <div className="flex items-start justify-between gap-2">
              <h1 className="text-xl leading-none font-bold">
                {videoData.title}
              </h1>
              {isOwner && (
                <motion.button
                  type="button"
                  onClick={() => setEditOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                  style={{ originX: 0.5, originY: 0.5 }}
                  className="border-bg-accent hover:bg-bg-accent shrink-0 rounded-md border px-4 py-2 text-sm"
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                  Edit Video
                </motion.button>
              )}
            </div>

            <VideoTagsRow
              level={videoData.level}
              tags={videoData.tags}
              type={videoData.type}
            />

            <VideoMeta profile={profile} views={videoData.views} />

            <VideoDescription description={videoData.description} />
          </div>

          <CommentSection videoId={video.id} initialComments={comments} />
        </div>

        {/* Right column: author card + related videos */}
        <div className="flex flex-col gap-4">
          <div className="hidden lg:flex">
            <AuthorSidebarCard userId={video.user_id} />
          </div>

          {relatedVideos.length > 0 && (
            <div className="flex flex-col">
              {relatedVideos.map((v) => (
                <SidebarVideoCard key={v.id} video={v} />
              ))}
            </div>
          )}
        </div>
      </div>

      {editOpen && (
        <EditVideoModal
          video={videoData}
          onClose={() => setEditOpen(false)}
          onSaved={(updated) => {
            setVideoData((prev) => ({ ...prev, ...updated }));
            setEditOpen(false);
          }}
          onDeleted={() => {
            router.push(`/account/${profile?.username}`);
          }}
        />
      )}
    </div>
  );
}
