'use client';

import React from 'react';
import Button from '../../../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faHeart,
  faLeaf,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';

const NEXT_PUBLIC_CDN_BASE_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL;
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
    imageUrl: 'public/team/andrew.jpg',
    role: 'Lead Developer',
  },
  {
    name: 'Jeremy Auguste',
    imageUrl: 'public/team/jeremy.jpg',
    role: 'Developer',
  },
  {
    name: 'Biana Lambis-Puryear',
    imageUrl: 'public/team/IMG_5008_3.jpg',
    role: 'Product Designer',
  },
  {
    name: 'Francesca Lorthe',
    imageUrl: 'public/team/image0.jpg',
    role: 'UI/UX Designer',
  },
  {
    name: 'Nikolai Cooperider',
    imageUrl: 'public/team/IMG_3416.jpg',
    role: 'Physical Artifact Engineer',
  },
  {
    name: 'Jacob Gomez',
    imageUrl: 'public/team/07e130f08be86f0de7f5d647650997e0.webp',
    role: 'Testing & Debugging',
  },
];

export default function AboutPage() {
  const { user } = useAuth();

  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col gap-20 px-5 py-16">
      {/* Mission Hero */}
      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-5 text-center md:text-left">
          <h1 className="page-title">About Us</h1>
          <p className="body-primary">
            GÜD is a wellness platform built to make healthy habits feel
            practical — no gym required, no extreme commitments.
          </p>
          <ul className="flex flex-col gap-3">
            {[
              'Expert-led workouts for every level',
              'Realistic nutrition guidance you can actually follow',
              'Content designed to fit your life, not disrupt it',
            ].map((item) => (
              <li
                key={item}
                className="body-primary flex items-center gap-3 text-center md:text-left"
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-brand-primary shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>

          {!user && (
            <div className="flex justify-center gap-4 pt-2 md:justify-start">
              <Button
                href="/register"
                text="Get Started"
                className="w-full text-center"
              />
            </div>
          )}
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
      <section className="flex flex-col gap-4">
        <h2 className="section-title text-center">Our Team</h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <motion.div
              key={member.name}
              className="bg-bg-secondary flex items-center gap-8 rounded-md p-2 shadow-sm lg:p-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Image
                width={200}
                height={200}
                src={`${NEXT_PUBLIC_CDN_BASE_URL}/${member.imageUrl}`}
                alt={member.name}
                className="h-24 w-24 rounded-full object-cover lg:h-32 lg:w-32"
              />
              <div className="flex flex-col">
                <span className="sub-header text-left">{member.name}</span>
                <span className="body text-left">{member.role}</span>
              </div>
            </motion.div>
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
            guidance — all created by certified professionals and designed to
            fit your life at home. Whether you&apos;re just starting out or
            getting back on track, we&apos;ve got you.
          </p>
          <div className="flex flex-col gap-4 pt-2 lg:flex-row">
            {!user && (
              <Button
                href="/register"
                text="Create an Account"
                className="w-full text-center"
              />
            )}

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
