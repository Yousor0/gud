'use client';

import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeXmark,
  faExpand,
  faCompress,
} from '@fortawesome/free-solid-svg-icons';

// Converts a raw number of seconds into a readable time string.
// e.g. 125 → "2:05", 3725 → "1:02:05"
function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function VideoPlayer({ src, poster, knownDuration }) {
  // useRef gives us a direct handle to a DOM element without triggering re-renders.
  // containerRef points to the outer div (used for fullscreen).
  // videoRef points to the <video> element itself (used for play/pause/seek/etc).
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // These drive what the UI displays.
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Use the duration stored in the database so the total time is correct immediately.
  // If the video is missing that value, we fall back to what the browser reports.
  const [duration, setDuration] = useState(knownDuration || 0);

  // Start playing as soon as the component loads.
  // If the browser blocks autoplay, the video stays paused and playing stays false,
  // so the play button will correctly appear.
  useEffect(() => {
    videoRef.current?.play().catch(() => setPlaying(false));
  }, []);

  // The browser fires a 'fullscreenchange' event whenever fullscreen is entered or
  // exited (including when the user presses Escape). We listen for it so our
  // fullscreen icon stays in sync.
  useEffect(() => {
    const onFullscreenChange = () =>
      setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Keyboard controls. We read directly from videoRef.current rather than React
  // state so we always get the true current state of the video element.
  // We skip handling if the user is typing in a text field.
  useEffect(() => {
    function handleKeyDown(e) {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (!videoRef.current) return;

      if (e.code === 'Space') {
        e.preventDefault(); // prevents the page from scrolling on spacebar
        if (videoRef.current.paused)
          videoRef.current.play().catch(() => setPlaying(false));
        else videoRef.current.pause();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        videoRef.current.currentTime = Math.min(
          videoRef.current.duration,
          videoRef.current.currentTime + 5
        );
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        videoRef.current.currentTime = Math.max(
          0,
          videoRef.current.currentTime - 5
        );
      } else if (e.code === 'KeyM') {
        videoRef.current.muted = !videoRef.current.muted;
        setMuted(videoRef.current.muted);
      } else if (e.code === 'KeyF') {
        if (document.fullscreenElement) document.exitFullscreen();
        else containerRef.current?.requestFullscreen();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    // Returning a cleanup function removes the listener when the component unmounts,
    // preventing memory leaks.
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // We read from videoRef.current.paused (the video element's actual state) rather
  // than the playing state variable. This avoids a bug where stale React state
  // could cause the wrong action to fire.
  function togglePlay() {
    if (!videoRef.current) return;
    if (videoRef.current.paused)
      videoRef.current.play().catch(() => setPlaying(false));
    else videoRef.current.pause();
  }

  // If the database didn't have a duration, use what the browser reports once the
  // video's metadata (dimensions, duration, etc.) has been read.
  function handleLoadedMetadata() {
    if (
      !knownDuration &&
      videoRef.current?.duration &&
      isFinite(videoRef.current.duration)
    ) {
      setDuration(videoRef.current.duration);
    }
  }

  // Calculates where in the video the user clicked on the progress bar and jumps there.
  // e.stopPropagation() prevents the click from also triggering the video's own onClick.
  function handleSeek(e) {
    e.stopPropagation();
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    videoRef.current.currentTime = ratio * duration;
  }

  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  }

  function toggleFullscreen() {
    if (!containerRef.current) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else containerRef.current.requestFullscreen();
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="group relative w-full overflow-hidden rounded-sm bg-black"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
        onLoadedMetadata={handleLoadedMetadata}
      />

      {/* Controls bar — hidden until the user hovers over the player */}
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent px-3 pt-8 pb-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {/* Progress bar */}
        <div
          className="mb-2 flex cursor-pointer items-center py-2"
          onClick={handleSeek}
        >
          <div className="h-1 w-full rounded-full bg-white/30">
            <div
              className="pointer-events-none h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="text-white"
            >
              <FontAwesomeIcon icon={playing ? faPause : faPlay} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="text-white"
            >
              <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
            </button>
            <span className="text-sm text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
            className="text-white"
          >
            <FontAwesomeIcon icon={fullscreen ? faCompress : faExpand} />
          </button>
        </div>
      </div>
    </div>
  );
}
