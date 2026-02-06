'use client';

import ProfilePicture from './profilePicture';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function ProfileCarasoul({
  sectionTitle,
  usersAPI,
  orientation = 'horizontal',
}) {
  // Prev & Next Functionality
  const [startIndex, setStartIndex] = useState(0);
  const [profilesToShow, setProfilesToShow] = useState(1);

  useEffect(() => {
    const updateProfilesToShow = () => {
      const width = window.innerWidth;
      if (width < 640) setProfilesToShow(3);
      else if (width < 768) setProfilesToShow(4);
      else if (width < 1024) setProfilesToShow(5);
      else if (width < 1280) setProfilesToShow(7);
      else setProfilesToShow(10);
    };

    // Initial check
    updateProfilesToShow();

    // Listen for window resize
    window.addEventListener('resize', updateProfilesToShow);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateProfilesToShow);
  }, []);

  const maxStart = Math.max(usersAPI.length - profilesToShow, 0);
  //   Next Button
  const next = () => {
    setStartIndex((prev) => Math.min(prev + profilesToShow, maxStart));
  };

  // Prev Button
  const prev = () => {
    setStartIndex((prev) => Math.max(prev - profilesToShow, 0));
  };

  const visibleProfiles = usersAPI.slice(
    startIndex,
    startIndex + profilesToShow
  );

  return (
    <div className="mb-5 flex flex-col gap-2">
      {/* Title of Carasoul */}
      <h1 className="sub-header">{sectionTitle}</h1>

      <div className="relative">
        <div className="grid-row-2 grid">
          {/* Profile Pictures Grid */}
          <div
            className={'grid gap-6'}
            style={{
              gridTemplateColumns:
                orientation === 'horizontal'
                  ? `repeat(${profilesToShow}, minmax(0, 1fr))`
                  : 'repeat(1, minmax(0, 1fr))',
            }}
          >
            {visibleProfiles.map((user, index) => (
              <div key={`${user.id}-${startIndex + index}`} className="w-full">
                <ProfilePicture user={user} />
              </div>
            ))}
          </div>

          {/* Previous Button */}
          <button
            onClick={prev}
            disabled={startIndex === 0}
            className="absolute top-1/2 -left-10 h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#D07A64] disabled:hidden sm:-left-12"
          >
            <FontAwesomeIcon
              className="text-white"
              icon={faAngleLeft}
              size="2x"
            />
          </button>

          {/* Next Button */}
          <button
            onClick={next}
            disabled={startIndex + profilesToShow >= usersAPI.length}
            className="absolute top-1/2 -right-10 h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#D07A64] disabled:hidden sm:-right-12"
          >
            <FontAwesomeIcon
              icon={faAngleRight}
              className="text-white"
              size="2x"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCarasoul;
