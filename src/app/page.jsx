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
import { easeOut, motion, AnimatePresence, easeIn } from 'motion/react';

// first real section of landing page. the name of this can be changed as needed.
function LandingWelcome() {
  return (
    <section>
      <div className="grid grid-cols-1 items-center gap-10 py-10 md:grid-cols-2">
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
            <Button href="/about" text="Learn more" variant="border" />
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
  const faq = [
    {
      question: 'Do I need an account to use GÜD?',
      answer:
        'Yes. In order to browse workouts, nutritional content and engage with professionals you would need an account.',
    },
    {
      question: 'Can I work out at home without equipment?',
      answer:
        'Yes. In order to browse workouts, nutritional content and engage with professionals you would need an account.',
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

  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleIndex = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i != index) : [...prev, index]
    );
  };

  return (
    <section>
      <h2 className="mb-8 text-xl font-semibold">Frequently Asked Questions</h2>
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

export default function landingPage() {
  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5">
      <LandingWelcome />
      <InfoCards />
      <AboutGud />
      <FaqSection id="faq" />
    </main>
  );
}
