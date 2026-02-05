'use client';
import { Cardo } from 'next/font/google';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/ui/Button';

// first real section of landing page. the name of this can be changed as needed.
function LandingWelcome() {
  return (
    <section>
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <Image
            src="/landing01.png"
            alt="Welcome illustration"
            width={800}
            height={400}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="page-title text-center sm:text-left">
            Get a GÜD start on your wellness journey!
          </h1>
          <p className="body-primary text-center sm:text-left">
            At home workouts and nutritional guidance tailored to you
          </p>
          <div className="flex justify-center gap-5 sm:justify-start">
            <Button href="/register" text="Start you plan" />
            <Button href="/learnmore" text="Learn more" variant="border" />
          </div>
        </div>
      </div>
    </section>
  );
}

// three informational cards
function InfoCards() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* first card. effective workouts at home */}
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">
            Effective Workouts At Home
          </h3>
          <p className="text-sm">
            Exercise from the comfort of your home with guided workouts for all
            levels
          </p>
        </div>
        {/* second card. Expert Nutrition */}
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">
            Expert Nutrition Just For You
          </h3>
          <p className="text-sm">
            Personalized meal plans healthy and easy recipes to fuel your
            workouts
          </p>
        </div>

        {/* third card. Expert Advice */}
        <div className="rounded-lg border p-6">
          <h3 className="mb-2 text-lg font-semibold">
            Expert Advice From Certified Pros
          </h3>
          <p className="text-sm">
            Learn from certified trainers and nutritionists with professional
            advices
          </p>
        </div>
      </div>
    </section>
  );
}

// About GUD section
function AboutGud() {
  return (
    <section>
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h2 className="text-xl font-semibold">About GÜD</h2>
          <p className="text-base">
            GÜD is a wellness platform designed to help you build healthy habits
            from home. We offer effective at-home workouts, practical nutrition
            guidance, and expert advice tailored to your needs.
          </p>
          <p className="text-base">
            All content is created by certified professionals, making it easy to
            follow workouts, learn how to fuel your body, and stay consistent on
            your own schedule.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/landing02.png"
            alt="About GÜD welcome image of woman in yoga pose"
            width={800}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}

// FAQ section, six questions total
function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section>
      <h2 className="mb-8 text-xl font-semibold">Frequently Asked Questions</h2>
      {/* first faq question */}
      <div className="border-b py-4">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
          aria-expanded={openIndex === 0}
        >
          <span className="font-medium">Do I need an account to use GÜD?</span>
          <span>{openIndex === 0 ? '-' : '+'}</span>
        </button>
        {openIndex === 0 && (
          <p className="mt-4 text-sm">
            Yes. In order to browse workouts, nutritional content and engage
            with professionals you would need an account.
          </p>
        )}
      </div>
      {/* second faq question */}
      <div className="border-b py-4">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
          aria-expanded={openIndex === 1}
        >
          <span className="font-medium">
            Can I work out at home without equipment?
          </span>
          <span>{openIndex === 1 ? '-' : '+'}</span>
        </button>
        {openIndex === 1 && (
          <p className="mt-4 text-sm">
            Yes. Many workouts are designed to be done at home with little to no
            equipment.
          </p>
        )}
      </div>
      {/* third faq question */}
      <div className="border-b py-4">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
          aria-expanded={openIndex === 2}
        >
          <span className="font-medium">
            Does GÜD track my workouts or health data?
          </span>
          <span>{openIndex === 2 ? '-' : '+'}</span>
        </button>
        {openIndex === 2 && (
          <p className="mt-4 text-sm">
            No. GÜD focuses on guided content, education, and routine-building
            rather than real-time tracking or health data collection.
          </p>
        )}
      </div>
      {/* fourth faq question */}
      <div className="border-b py-4">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
          aria-expanded={openIndex === 3}
        >
          <span className="font-medium">
            Who creates the workouts and nutrition content?
          </span>
          <span>{openIndex === 3 ? '-' : '+'}</span>
        </button>
        {openIndex === 3 && (
          <p className="mt-4 text-sm">
            All content is created and led by certified fitness trainers and
            nutrition professionals.
          </p>
        )}
      </div>
      {/* fifth faq question */}
      <div className="border-b py-4">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setOpenIndex(openIndex === 4 ? null : 4)}
          aria-expanded={openIndex === 4}
        >
          <span className="font-medium">
            Can I message professionals directly?
          </span>
          <span>{openIndex === 4 ? '-' : '+'}</span>
        </button>
        {openIndex === 4 && (
          <p className="mt-4 text-sm">
            Yes. With our premium plan, you can message professionals for
            general guidance and educational support. For medical questions,
            please contact your healthcare provider. For emergencies, call 911.
          </p>
        )}
      </div>
      {/* sixth faq question */}
      <div className="border-b py-4">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setOpenIndex(openIndex === 5 ? null : 5)}
          aria-expanded={openIndex === 5}
        >
          <span className="font-medium">Is GÜD suitable for beginners?</span>
          <span>{openIndex === 5 ? '-' : '+'}</span>
        </button>
        {openIndex === 5 && (
          <p className="mt-4 text-sm">
            Yes. Workouts and nutrition content are labeled by level and
            designed to be approachable for all experience levels.
          </p>
        )}
      </div>
    </section>
  );
}

export default function landingPage() {
  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5">
      <LandingWelcome />
      <InfoCards />
      <AboutGud />
      <FaqSection />
    </main>
  );
}
