'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDumbbell,
  faAppleWhole,
  faCertificate,
} from '@fortawesome/free-solid-svg-icons';
import { easeOut, motion } from 'motion/react';

const stats = [
  { value: '200+', label: 'Workouts Available' },
  { value: '50+', label: 'Healthy Recipes' },
  { value: '100%', label: 'Certified Professionals' },
  { value: 'All Levels', label: 'Beginner to Advanced' },
];

export default function InfoCards() {
  return (
    <section className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <motion.div
          className="border-bg-accent bg-bg-secondary flex flex-row items-center gap-7 rounded-lg border p-6 pl-8 shadow-sm md:flex-col md:gap-4 md:pl-6 md:text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2, ease: easeOut }}
        >
          <FontAwesomeIcon
            icon={faDumbbell}
            size="3x"
            className="text-brand-secondary"
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

        <motion.div
          className="border-bg-accent bg-bg-secondary flex flex-row items-center gap-7 rounded-lg border p-6 pl-8 shadow-sm md:flex-col md:gap-4 md:pl-6 md:text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2, ease: easeOut }}
        >
          <FontAwesomeIcon
            icon={faAppleWhole}
            size="3x"
            className="text-brand-secondary"
          />
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Expert Nutrition Just For You
            </h3>
            <p className="text-sm">
              Personalized meal plans and easy recipes to fuel your
              body and support your goals
            </p>
          </div>
        </motion.div>

        <motion.div
          className="border-bg-accent bg-bg-secondary flex flex-row items-center gap-7 rounded-lg border p-6 pl-8 shadow-sm md:flex-col md:gap-4 md:pl-6 md:text-center"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2, ease: easeOut }}
        >
          <FontAwesomeIcon
            icon={faCertificate}
            size="3x"
            className="text-brand-secondary"
          />
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Guidance From Certified Professionals
            </h3>
            <p className="text-sm">
              Learn from certified trainers and nutritionists with real,
              professional advice
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="border-bg-accent bg-bg-secondary flex flex-col items-center rounded-lg border p-6 text-center shadow-sm"
          >
            <span className="text-brand-secondary text-2xl font-bold">
              {stat.value}
            </span>
            <span className="mt-1 text-sm">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
