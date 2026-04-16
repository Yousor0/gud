'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { avatarUrl } from '@/lib/mediaUrl';
import { createClient } from '../../../lib/supabase/client';
import { useAuth } from '../../../context/AuthContext';

// Formats a UTC timestamp into a readable local date/time string.
// e.g. "Mar 11, 2026, 3:45 PM"
function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Takes a flat array of comments and organises them into a nested tree
// based on each comment's parent_id field.
function buildCommentTree(comments) {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c.id] = { ...c, replies: [] };
  });

  comments.forEach((c) => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].replies.push(map[c.id]);
    } else if (!c.parent_id) {
      roots.push(map[c.id]);
    }
  });

  return roots;
}

// Recursively collects the IDs of all descendants of a given comment.
// Used so that deleting a comment also removes all its replies from state.
function getAllDescendantIds(comments, parentId) {
  const children = comments
    .filter((c) => c.parent_id === parentId)
    .map((c) => c.id);
  const deeper = children.flatMap((id) => getAllDescendantIds(comments, id));
  return [...children, ...deeper];
}

// Shared button styles matching the rest of the site
const btnPrimary =
  'rounded-md bg-[#9D4431] px-3 py-1 text-sm font-semibold text-[#FAF7F3] shadow-sm duration-150 hover:bg-[#D07A64] disabled:opacity-50 disabled:cursor-default disabled:hover:bg-[#9D4431]';
const btnBorder =
  'rounded-md border border-[#9D4431] px-3 py-1 text-sm font-medium text-[#9D4431] duration-150 hover:border-[#D07A64] hover:bg-[#D07A64] hover:text-[#FAF7F3] disabled:opacity-50 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-[#9D4431] disabled:hover:border-[#9D4431]';

// Renders a single comment and its nested replies recursively.
// depth controls the left indentation so replies are visually nested.
function CommentThread({
  comment,
  depth,
  videoId,
  currentUser,
  currentProfile,
  onAdd,
  onEdit,
  onDelete,
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyBody, setReplyBody] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [replyError, setReplyError] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editError, setEditError] = useState(null);

  const isAuthor = currentUser?.id === comment.user_id;

  async function handleReply(e) {
    e.preventDefault();
    if (!replyBody.trim() || !currentUser) return;
    setReplySubmitting(true);
    setReplyError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('comments')
        .insert({
          video_id: videoId,
          user_id: currentUser.id,
          body: replyBody.trim(),
          parent_id: comment.id,
        })
        .select(`*, profiles(username, avatar_s3_key, first_name, last_name)`)
        .single();

      if (error) throw error;
      onAdd(data);
      setReplyBody('');
      setReplyOpen(false);
    } catch {
      setReplyError('Failed to post reply. Please try again.');
    } finally {
      setReplySubmitting(false);
    }
  }

  async function handleEdit(e) {
    e.preventDefault();
    if (!editBody.trim()) return;
    setEditSubmitting(true);
    setEditError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('comments')
        .update({ body: editBody.trim() })
        .eq('id', comment.id);

      if (error) throw error;
      onEdit(comment.id, editBody.trim());
      setEditOpen(false);
    } catch {
      setEditError('Failed to save edit. Please try again.');
    } finally {
      setEditSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this comment?'))
      return;
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', comment.id);

      if (error) throw error;
      onDelete(comment.id);
    } catch {
      // deletion failed silently — comment remains in view
    }
  }

  return (
    <div className={depth > 0 ? 'ml-8 border-l border-gray-200 pl-4' : ''}>
      {/* Comment Header Information */}
      <div className="flex gap-3">
        {/* Profile Picture */}
        <Link
          href={`/account/${comment.profiles?.username}`}
          className="flex-shrink-0 duration-150 hover:opacity-80"
        >
          <Image
            src={avatarUrl(comment.profiles?.avatar_s3_key)}
            width={36}
            height={36}
            alt={comment.profiles?.username ?? ''}
            className="h-9 w-9 rounded-full object-cover"
          />
        </Link>

        {/* Profile Name, username, time */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/account/${comment.profiles?.username}`}
              className="text-sm font-semibold duration-150 hover:opacity-80"
            >
              {comment.profiles?.first_name} {comment.profiles?.last_name}
              <span className="ml-1 font-normal text-gray-500">
                @{comment.profiles?.username}
              </span>
            </Link>
            <span className="text-xs text-gray-400">
              {formatDate(comment.created_at)}
            </span>
          </div>

          {editOpen ? (
            <form onSubmit={handleEdit} className="mt-2">
              <textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                rows={2}
                className="w-full resize-none border-b border-gray-300 pb-1 text-sm outline-none focus:border-gray-600"
              />
              {editError && <p className="text-sm text-red-500">{editError}</p>}
              <div className="mt-1 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditOpen(false);
                    setEditBody(comment.body);
                  }}
                  disabled={editSubmitting}
                  className={btnBorder}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!editBody.trim() || editSubmitting}
                  className={btnPrimary}
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-1 text-sm">{comment.body}</p>
          )}

          <div className="mt-1 flex items-center gap-3">
            {currentUser && (
              <button
                onClick={() => setReplyOpen((prev) => !prev)}
                className="text-xs text-gray-500 duration-150 hover:text-gray-700"
              >
                Reply
              </button>
            )}
            {isAuthor && (
              <>
                <button
                  onClick={() => setEditOpen((prev) => !prev)}
                  className="text-xs text-gray-500 duration-150 hover:text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="text-xs text-gray-500 duration-150 hover:text-red-500"
                >
                  Delete
                </button>
              </>
            )}
          </div>

          {replyOpen && (
            <form onSubmit={handleReply} className="mt-3 flex gap-2">
              <Image
                src={avatarUrl(currentProfile?.avatar_public_id)}
                width={28}
                height={28}
                alt="Your avatar"
                className="h-7 w-7 shrink-0 rounded-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-1">
                <textarea
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  placeholder={`Reply to @${comment.profiles?.username}...`}
                  rows={1}
                  className="w-full resize-none border-b border-gray-300 pb-1 text-sm outline-none focus:border-gray-600"
                />
                {replyError && (
                  <p className="text-sm text-red-500">{replyError}</p>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setReplyOpen(false);
                      setReplyBody('');
                    }}
                    disabled={replySubmitting}
                    className={btnBorder}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!replyBody.trim() || replySubmitting}
                    className={btnPrimary}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="mt-4 flex flex-col gap-4">
          {comment.replies.map((reply) => (
            <CommentThread
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              videoId={videoId}
              currentUser={currentUser}
              currentProfile={currentProfile}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ videoId, initialComments }) {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleAdd(newComment) {
    setComments((prev) => [...prev, newComment]);
  }

  function handleEdit(id, newBody) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, body: newBody } : c))
    );
  }

  function handleDelete(id) {
    setComments((prev) => {
      const toRemove = new Set([id, ...getAllDescendantIds(prev, id)]);
      return prev.filter((c) => !toRemove.has(c.id));
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!body.trim() || !user) return;
    setSubmitting(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('comments')
        .insert({ video_id: videoId, user_id: user.id, body: body.trim() })
        .select(`*, profiles(username, avatar_s3_key, first_name, last_name)`)
        .single();

      if (error) throw error;
      setComments((prev) => [...prev, data]);
      setBody('');
    } catch {
      setError('Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const tree = buildCommentTree(comments);
  const topLevelCount = comments.filter((c) => !c.parent_id).length;

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-lg font-semibold">{topLevelCount} Comments</h2>

      {!user && (
        <p className="mb-6 text-sm text-gray-500">
          <Link
            href="/login"
            className="font-semibold text-[#9D4431] duration-150 hover:text-[#D07A64]"
          >
            Log in
          </Link>{' '}
          to comment.
        </p>
      )}

      {user && (
        <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
          <Image
            src={avatarUrl(profile?.avatar_s3_key)}
            width={36}
            height={36}
            alt="Your avatar"
            className="h-9 w-9 rounded-full object-cover"
          />

          <div className="flex flex-1 flex-col gap-2">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Add a comment..."
              rows={1}
              className="w-full resize-none border-b border-gray-300 pb-1 outline-none focus:border-gray-600"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setBody('')}
                disabled={!body.trim()}
                className={`${btnBorder} px-4 py-2`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!body.trim() || submitting}
                className={`${btnPrimary} px-4 py-2`}
              >
                Comment
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-5">
        {tree.map((comment) => (
          <CommentThread
            key={comment.id}
            comment={comment}
            depth={0}
            videoId={videoId}
            currentUser={user}
            currentProfile={profile}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
