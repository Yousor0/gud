'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'motion/react';
import { faq } from './faqData';

export default function FaqSection() {
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
            className="bg-bg-secondary flex cursor-auto flex-col rounded-md px-6 py-4 hover:cursor-pointer"
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
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    height: { duration: 0.25, ease: 'easeInOut' },
                    opacity: { duration: 0.15, ease: 'easeInOut' },
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="mt-4 text-sm">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
