'use client';

import React from 'react';
import Button from '../../../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLeaf, faUsers } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { avatarUrl } from '@/lib/mediaUrl';

const values = [
  {
    icon: faHeart,
    title: 'Your Wellbeing First',
    description:
      'Every piece of content is designed with your health and safety as the top priority — always.',
  },
  {
    icon: faLeaf,
    title: 'Sustainable Habits',
    description:
      'We focus on routines you can actually maintain, not quick fixes or unsustainable extremes.',
  },
  {
    icon: faUsers,
    title: 'For Everyone',
    description:
      "Whether you're a complete beginner or getting back on track, GÜD meets you where you are.",
  },
];

const team = [
  {
    name: 'Andrew Jiang',
    imageUrl:
      '/https://d2d8wkqybl2mij.cloudfront.net/public/default-avatar.jpg',
  },
  { name: 'Jeremy Auguste', imageUrl: 'public/default-avatar.jpg' },
  { name: 'Biana Lambis-Puryear', imageUrl: 'public/default-avatar.jpg' },
  { name: 'Francesca Lorthe', imageUrl: 'public/default-avatar.jpg' },
  { name: 'Nikolai Cooperider', imageUrl: 'public/default-avatar.jpg' },
];

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col gap-20 px-5 py-16">
      {/* Mission Hero */}
      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-5 text-center md:text-left">
          <h1 className="page-title">About Us</h1>
          <p className="body-primary">
            GÜD is a wellness platform built to help you develop healthy habits
            from home in a way that feels practical, structured, and
            sustainable. Our goal is to make it easier for you to take care of
            your body and build routines you can actually maintain, no matter
            your starting point.
          </p>
          <p className="body-primary">
            We strive to provide effective at-home workouts, realistic nutrition
            guidance, and expert-backed education designed to support your
            day-to-day lifestyle. Everything is created to be clear,
            approachable, and adaptable so you can move at your own pace.
          </p>
          <div className="flex justify-center gap-4 pt-2 md:justify-start">
            <Button
              href="/register"
              text="Get Started"
              className="w-full text-center"
            />
          </div>
        </div>
        <div className="relative flex justify-center">
          <Image
            src="https://d2d8wkqybl2mij.cloudfront.net/public/about01.png"
            alt="About characters"
            width={600}
            height={500}
            className="rounded-lg"
          />
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 -z-40 m-auto h-full w-full rotate-180 overflow-visible"
          >
            <path
              fill="var(--color-bg-secondary)"
              d="M54.1,-59C69.1,-51.9,79.4,-33.9,83.4,-14.3C87.4,5.3,84.9,26.5,73.9,40C62.9,53.5,43.3,59.4,27.3,57.7C11.3,55.9,-1.1,46.6,-15.1,41.5C-29,36.4,-44.5,35.5,-54.6,27.1C-64.7,18.7,-69.5,2.8,-64.4,-8.8C-59.4,-20.4,-44.4,-27.7,-32,-35.3C-19.6,-42.8,-9.8,-50.6,4.9,-56.5C19.6,-62.3,39.1,-66.1,54.1,-59Z"
              transform="translate(35 50) "
            />
          </svg>
        </div>
      </section>

      {/* Who we are */}
      <section className="flex flex-col gap-20">
        <div className="center flex flex-col">
          <h2 className="section-title mb-8 text-center">Our Team</h2>
          <p className="text-secondary px-5 text-center md:text-left">
            We are a team of five Digital Media students from the University of
            Central Florida united by a shared passion for wellness, design, and
            meaningful technology. As part of our capstone project, we created
            GÜD to combine a thoughtful user experience, research-driven
            strategy, and accessible design into a platform that encourages and
            supports healthy living. With various backgrounds spanning
            development, design, and digital storytelling, we collaborated to
            build a solution that reflects both our technical skills and our
            commitment to creating something practical, impactful, and built for
            real life.
          </p>
        </div>

        <svg
          width="0"
          height="0"
          style={{ position: 'absolute', overflow: 'hidden' }}
        >
          <defs>
            <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
              <path
                d="M0.838,0.4005 C0.8815,0.5255,0.8225,0.694,0.711,0.77 C0.5995,0.8465,0.436,0.83,0.3315,0.75 C0.2275,0.67,0.183,0.526,0.221,0.4095 C0.259,0.2925,0.3795,0.202,0.513,0.198 C0.647,0.1935,0.794,0.275,0.838,0.4005Z"
                transform="translate(0.5 0.5) scale(1.3) translate(-0.5 -0.5)"
              />
            </clipPath>
          </defs>
        </svg>

        <div className="flex flex-row flex-wrap justify-center gap-5">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex w-50 flex-col items-center gap-5"
            >
              <div>
                <Image
                  width={400}
                  height={400}
                  src="https://d2d8wkqybl2mij.cloudfront.net/public/default-avatar.jpg"
                  alt={member.name}
                  className="rounded-full object-cover"
                />
              </div>
              <span className="sub-header text-center">{member.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-bg-secondary rounded-xl p-10">
        <h2 className="section-title mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="bg-brand-primary flex h-14 w-14 items-center justify-center rounded-full">
                <FontAwesomeIcon
                  icon={value.icon}
                  size="lg"
                  className="text-white"
                />
              </div>
              <h3 className="sub-header">{value.title}</h3>
              <p className="body-primary">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="relative flex justify-center">
          <Image
            src="https://d2d8wkqybl2mij.cloudfront.net/public/about02.png"
            alt="About_2_Start_Now"
            width={600}
            height={400}
            className="rounded-lg"
          />
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 -z-40 m-auto h-full w-full overflow-visible"
          >
            <path
              fill="var(--color-bg-secondary)"
              d="M54.1,-59C69.1,-51.9,79.4,-33.9,83.4,-14.3C87.4,5.3,84.9,26.5,73.9,40C62.9,53.5,43.3,59.4,27.3,57.7C11.3,55.9,-1.1,46.6,-15.1,41.5C-29,36.4,-44.5,35.5,-54.6,27.1C-64.7,18.7,-69.5,2.8,-64.4,-8.8C-59.4,-20.4,-44.4,-27.7,-32,-35.3C-19.6,-42.8,-9.8,-50.6,4.9,-56.5C19.6,-62.3,39.1,-66.1,54.1,-59Z"
              transform="translate(40 50)"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-5 text-center md:text-left">
          <h2 className="section-title">
            Ready to build something that lasts?
          </h2>
          <p className="body-primary">
            Join GÜD and get access to workouts, nutrition content, and expert
            guidance — all designed to fit your life at home.
          </p>
          <p className="body-primary">
            All content is developed by certified professionals, so you can
            trust that what you&apos;re following is safe, informed, and
            results-focused. Whether you&apos;re just getting started or getting
            back on track, we&apos;ve got you.
          </p>
          <div className="flex flex-col gap-4 pt-2 lg:flex-row">
            <Button
              href="/register"
              text="Create an Account"
              className="w-full text-center"
            />
            <Button
              href="/explore"
              variant="border"
              text="Browse Content"
              className="w-full text-center"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
