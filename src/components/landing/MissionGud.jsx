'use client';
import Image from 'next/image';

export default function MissionGud() {
  return (
    <section>
      <h2 className="section-title mb-4 text-center">GÜD's Mission</h2>
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="relative flex items-center justify-center">
          <div className="relative">
            <p>
              GÜD exists to bring people together around a shared commitment to
              living healthier. We believe wellness isn't about perfection, but
              instead about progress, support, and showing up for yourself every
              day.
              <br />
              <br />
              Through expert-led workouts and practical nutrition guidance, we
              want to empower our community to build habits that make them feel
              good and have long lasting effects. Wherever you're starting from,
              you're not doing it alone.
            </p>
            <svg
              viewBox="0 0 150 175"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 -z-40 overflow-visible"
            >
              <path
                fill="var(--color-bg-secondary)"
                d="M43.2,-45.7C58,-39.1,73.3,-27.4,79.9,-11C86.5,5.4,84.3,26.4,73,38.6C61.8,50.9,41.4,54.4,23.7,57.6C5.9,60.8,-9.2,63.8,-25.3,61.4C-41.4,59,-58.5,51.3,-70.7,37.3C-83,23.3,-90.5,3,-86.9,-15C-83.3,-32.9,-68.6,-48.6,-52.3,-54.9C-35.9,-61.2,-18,-58.2,-1.9,-55.9C14.2,-53.7,28.4,-52.3,43.2,-45.7Z"
                transform="translate(75 25)"
              />
            </svg>
          </div>
        </div>

        <Image
          src="https://d2d8wkqybl2mij.cloudfront.net/public/landing02.png"
          alt="About GÜD welcome image of woman in yoga pose"
          width={800}
          height={400}
        />
      </div>
    </section>
  );
}
