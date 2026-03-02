import React from 'react';
import Image from 'next/image';
import Button from '../../../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDumbbell,
  faAppleWhole,
  faCertificate,
  faHeart,
  faLeaf,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

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

export default function AboutPage() {
  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col gap-20 px-5 py-16">
      {/* Mission Hero */}
      <section className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-5">
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
          <div className="flex gap-4 pt-2">
            <Button href="/register" text="Get Started" />
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/about01.png"
            alt="People being active"
            width={600}
            height={500}
            className="rounded-lg"
          />
        </div>
      </section>

      {/* What We Offer */}
      <section>
        <h2 className="section-title mb-8 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center gap-4 rounded-lg border border-[#d0c5b6] bg-[#f5f0e7] p-8 text-center shadow-sm">
            <FontAwesomeIcon
              icon={faDumbbell}
              size="3x"
              className="text-[#c3583e]"
            />
            <h3 className="sub-header">At-Home Workouts</h3>
            <p className="body-primary">
              Structured workout programs designed for your home environment. No
              gym membership or equipment required.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-[#d0c5b6] bg-[#f5f0e7] p-8 text-center shadow-sm">
            <FontAwesomeIcon
              icon={faAppleWhole}
              size="3x"
              className="text-[#c3583e]"
            />
            <h3 className="sub-header">Nutrition Guidance</h3>
            <p className="body-primary">
              Realistic meal plans and nutritional advice that fit into your
              everyday life without feeling restrictive.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 rounded-lg border border-[#d0c5b6] bg-[#f5f0e7] p-8 text-center shadow-sm">
            <FontAwesomeIcon
              icon={faCertificate}
              size="3x"
              className="text-[#c3583e]"
            />
            <h3 className="sub-header">Expert-Backed Content</h3>
            <p className="body-primary">
              All programs and guides are developed by certified trainers and
              nutritionists you can trust.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="rounded-xl bg-[#f5f0e7] p-10">
        <h2 className="section-title mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#9d4431]">
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
        <div className="flex justify-center">
          <Image
            src="/about02.png"
            alt="Three people being active outside"
            width={600}
            height={400}
            className="rounded-lg"
          />
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
          <div className="flex justify-center gap-4 pt-2 md:justify-start">
            <Button href="/register" text="Create an Account" />
            <Button
              href="/explore"
              variant="border"
              text="Browse Content"
            ></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
