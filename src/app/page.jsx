'use client';
import { Cardo } from 'next/font/google';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDumbbell,
  faAppleWhole,
  faCertificate,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import Script from 'next/script';
import { easeOut, motion, AnimatePresence, easeIn } from 'motion/react';

// first real section of landing page. the name of this can be changed as needed.
function LandingWelcome() {
  return (
    <section>
      <div className="grid grid-cols-1 items-center gap-10 py-10 md:grid-cols-2">
        <div className="relative flex justify-center">
          <Image
            src="/landing01.png"
            alt="Person following a GÜD at-home workout on their living room floor"
            width={800}
            height={400}
          />

          <svg
            viewBox="0 0 125 125"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 -z-40 m-auto h-full w-full"
          >
            <path
              fill="#F5F0E7"
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
            At home workouts and nutritional guidance tailored to you
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

// three informational cards
function InfoCards() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* first card. effective workouts at home */}
        <motion.div
          className="flex flex-row items-center gap-7 rounded-lg border border-[#d0c5b6] bg-[#f5f0e7] p-6 pl-8 shadow-sm md:flex-col md:gap-4 md:pl-6 md:text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2, ease: easeOut }}
        >
          <FontAwesomeIcon
            icon={faDumbbell}
            size="3x"
            className="text-[#c3583e]"
          />
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Effective Workouts At Home
            </h3>
            <p className="text-sm">
              Exercise from the comfort of your home with guided workouts for
              all levels
            </p>
          </div>
        </motion.div>
        {/* second card. Expert Nutrition */}
        <motion.div
          className="flex flex-row items-center gap-7 rounded-lg border border-[#d0c5b6] bg-[#f5f0e7] p-6 pl-8 shadow-sm md:flex-col md:gap-4 md:pl-6 md:text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2, ease: easeOut }}
        >
          <FontAwesomeIcon
            icon={faAppleWhole}
            size="3x"
            className="text-[#c3583e]"
          />
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Expert Nutrition Just For You
            </h3>
            <p className="text-sm">
              Personalized meal plans healthy and easy recipes to fuel your
              workouts
            </p>
          </div>
        </motion.div>

        {/* third card. Expert Advice */}
        <motion.div
          className="flex flex-row items-center gap-7 rounded-lg border border-[#d0c5b6] bg-[#f5f0e7] p-6 pl-8 shadow-sm md:flex-col md:gap-4 md:pl-6 md:text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2, ease: easeOut }}
        >
          <FontAwesomeIcon
            icon={faCertificate}
            size="3x"
            className="text-[#c3583e]"
          />
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Expert Advice From Certified Professionals
            </h3>
            <p className="text-sm">
              Learn from certified trainers and nutritionists with professional
              advices
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Stats / social proof bar
function StatsBar() {
  const stats = [
    { value: '200+', label: 'Workouts Available' },
    { value: '50+', label: 'Healthy Recipes' },
    { value: '100%', label: 'Certified Professionals' },
    { value: 'All Levels', label: 'Beginner to Advanced' },
  ];

  return (
    <section>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg border border-[#d0c5b6] bg-[#f5f0e7] p-6 text-center shadow-sm"
          >
            <span className="text-2xl font-bold text-[#c3583e]">
              {stat.value}
            </span>
            <span className="mt-1 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// How it works — 3 step overview (ClaudeCode / Mock Content)
function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Create Your Account',
      description:
        'Sign up for free and tell us about your fitness goals and experience level.',
    },
    {
      step: '2',
      title: 'Choose Your Plan',
      description:
        'Browse workouts and nutrition plans curated by certified professionals for your level.',
    },
    {
      step: '3',
      title: 'Start Your Journey',
      description:
        'Follow along from home, build consistency, and develop lasting healthy habits.',
    },
  ];

  return (
    <section>
      <h2 className="section-title mb-8 text-center">How It Works</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c3583e] text-xl font-bold text-white">
              {step.step}
            </div>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Testimonials (ClaudeCode / Mock Content)
function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah M.',
      quote:
        'GÜD helped me build a consistent workout routine from my apartment. The beginner plans are incredibly approachable.',
      role: 'Member since 2024',
    },
    {
      name: 'James T.',
      quote:
        'The nutrition guidance completely changed how I think about food. Simple, practical, and actually sustainable.',
      role: 'Member since 2024',
    },
    {
      name: 'Priya K.',
      quote:
        'I love that all the content is made by real certified professionals. It makes a huge difference in quality.',
      role: 'Member since 2025',
    },
  ];

  return (
    <section>
      <h2 className="section-title mb-8 text-center">What Our Members Say</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-lg border border-[#d0c5b6] bg-[#f5f0e7] p-6 shadow-sm"
          >
            <p className="text-sm italic">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// About GUD section
function MissionGud() {
  return (
    <section>
      <h2 className="section-title mb-4 text-center">GÜD’s Mission</h2>
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="relative flex items-center justify-center">
          <div className="relative">
            <p>
              GÜD exists to bring people together around a shared commitment to
              living healthier. We believe wellness isn’t about perfection, but
              instead about progress, support, and showing up for yourself every
              day.
              <br />
              <br />
              Through expert-led workouts and practical nutrition guidance, we
              want to empower our community to build habits that make them feel
              good and have long lasting effects. Wherever you’re starting from,
              you’re not doing it alone.
            </p>
            <svg
              viewBox="0 0 150 175"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 -z-40 overflow-visible"
            >
              <path
                fill="#F5F0E7"
                d="M43.2,-45.7C58,-39.1,73.3,-27.4,79.9,-11C86.5,5.4,84.3,26.4,73,38.6C61.8,50.9,41.4,54.4,23.7,57.6C5.9,60.8,-9.2,63.8,-25.3,61.4C-41.4,59,-58.5,51.3,-70.7,37.3C-83,23.3,-90.5,3,-86.9,-15C-83.3,-32.9,-68.6,-48.6,-52.3,-54.9C-35.9,-61.2,-18,-58.2,-1.9,-55.9C14.2,-53.7,28.4,-52.3,43.2,-45.7Z"
                transform="translate(75 25)"
              />
            </svg>
          </div>
        </div>

        <Image
          src="/landing02.png"
          alt="About GÜD welcome image of woman in yoga pose"
          width={800}
          height={400}
        />
      </div>
    </section>
  );
}

const faq = [
  {
    question: 'Do I need an account to use GÜD?',
    answer:
      'Yes. In order to browse workouts, nutritional content and engage with professionals you would need an account.',
  },
  {
    question: 'Can I work out at home without equipment?',
    answer:
      'Yes. GÜD offers a wide range of bodyweight workouts that require no equipment at all. Whether you have a full gym or just a living room floor, there are options for you.',
  },
  {
    question: 'Who creates the workouts and nutrition content?',
    answer:
      'All content is created and led by certified fitness trainers and nutrition professionals.',
  },
  {
    question: 'Does GÜD track my workouts or health data?',
    answer:
      'No. GÜD focuses on guided content, education, and routine-building rather than real-time tracking or health data collection.',
  },
  {
    question: 'Is GÜD suitable for beginners?',
    answer:
      'Yes. Workouts and nutrition content are labeled by level and designed to be approachable for all experience levels.',
  },
];

// FAQ section, six questions total
function FaqSection() {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleIndex = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i != index) : [...prev, index]
    );
  };

  return (
    <section>
      <h2 className="section-title mb-4 text-center">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-2">
        {faq.map((item, index) => (
          <div
            key={index}
            className="flex cursor-auto flex-col rounded-md bg-[#f5f0e7] px-6 py-4 hover:cursor-pointer"
            aria-expanded={openIndexes.includes(index)}
            onClick={() => toggleIndex(index)}
          >
            <div className="flex justify-between">
              <span className="font-medium">{item.question}</span>
              <span>
                {openIndexes.includes(index) ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </span>
            </div>
            <AnimatePresence initial={false}>
              {openIndexes.includes(index) && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 text-sm"
                >
                  {item.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function landingPage() {
  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 sm:gap-20">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LandingWelcome />
      <div className="flex flex-col gap-6">
        <InfoCards />
        <StatsBar />
      </div>
      <HowItWorks />
      <MissionGud />
      <Testimonials />
      <FaqSection id="faq" />
    </main>
  );
}
