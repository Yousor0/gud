'use client';

import { useState, useEffect } from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileVideoCard } from './VideoCard';

export default function VideoCarousel({
  sectionTitle,
  videoAPI,
  orientation = 'horizontal',
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsToShow(1);
      else if (width < 768) setCardsToShow(1);
      else if (width < 1024) setCardsToShow(2);
      else if (width < 1280) setCardsToShow(3);
      else setCardsToShow(4);
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  const next = () => {
    setStartIndex((prev) =>
      Math.min(prev + cardsToShow, videoAPI.length - cardsToShow)
    );
  };

  const prev = () => {
    setStartIndex((prev) => Math.max(prev - cardsToShow, 0));
  };

  const visibleVideos = videoAPI.slice(startIndex, startIndex + cardsToShow);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="sub-header col-span-full">{sectionTitle}</h1>

      <div className="relative">
        <div className="grid-row-2 grid">
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns:
                orientation === 'horizontal'
                  ? `repeat(${cardsToShow}, minmax(0, 1fr))`
                  : 'repeat(1, minmax(0, 1fr))',
            }}
          >
            {visibleVideos.map((video) => (
              <div key={video.id} className="w-full">
                <ProfileVideoCard video={video} />
              </div>
            ))}
          </div>

          <button
            onClick={prev}
            disabled={startIndex === 0}
            className="absolute top-1/2 -left-10 h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#D07A64] duration-125 hover:scale-105 disabled:hidden sm:-left-12"
          >
            <FontAwesomeIcon
              className="text-white"
              icon={faAngleLeft}
              size="2x"
            />
          </button>

          <button
            onClick={next}
            disabled={startIndex + cardsToShow >= videoAPI.length}
            className="absolute top-1/2 -right-10 h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-[#D07A64] duration-125 hover:scale-105 disabled:hidden sm:-right-12"
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
