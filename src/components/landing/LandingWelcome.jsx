'use client';
import Button from '../ui/Button';
import Image from 'next/image';

export default function LandingWelcome() {
  return (
    <section>
      <div className="grid grid-cols-1 items-center gap-10 py-10 md:grid-cols-2">
        <div className="relative flex justify-center">
          <Image
            src="https://d2d8wkqybl2mij.cloudfront.net/public/landing01.png"
            alt="GUD Landing page Character"
            width={800}
            height={400}
          />

          <svg
            viewBox="0 0 125 125"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 -z-40 m-auto h-full w-full"
          >
            <path
              fill="var(--color-bg-secondary)"
              d="M48.6,-52C63.1,-45.8,75,-30.6,77,-14.3C79.1,2,71.3,19.4,60.7,32.6C50.2,45.9,36.8,55,23.3,56.9C9.7,58.8,-3.9,53.4,-17.1,48.1C-30.4,42.9,-43.4,37.7,-54.6,27.2C-65.8,16.7,-75.2,0.9,-71.5,-11.2C-67.7,-23.4,-50.7,-31.8,-36.6,-38.1C-22.5,-44.4,-11.3,-48.5,2.9,-52C17.1,-55.4,34.1,-58.2,48.6,-52Z"
              transform="translate(50 60)"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="page-title text-center sm:text-left">
            Get a GÜD start on your wellness journey!
          </h1>
          <p className="body-primary text-center sm:text-left">
            At home workouts and nutritional guidance tailored to you!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:justify-start">
            <Button
              href="/register"
              text="Start you plan"
              className="w-full sm:w-auto"
            />
            <Button
              href="/about"
              text="Learn more"
              variant="border"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
