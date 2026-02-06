import React from 'react';
import Image from 'next/image';
import PageHeader from '../../../components/PageHeader';

export default function AboutPage() {
  return (
    <section>
      <div className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 py-16">
        <h1 className="page-title self-center-safe text-center">Our Mission</h1>
        <div className="flex flex-col gap-5 text-center">
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
            approachable, and adaptable so you can move at your own pace and
            stay consistent on your own schedule.
          </p>
          <p className="body-primary">
            All of our content is developed by certified professionals, so you
            can trust that what you’re following is safe, informed, and
            results-focused. Whether you’re recently getting started or getting
            back on track, the platform is designed to give you reliable
            guidance and simple next steps you can follow with confidence.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/about02.png"
            alt="Mission Image: Three people being active outside"
            width={600}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
