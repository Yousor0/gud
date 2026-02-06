'use client';

import { motion } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function MailButton({ mail, profile }) {
  return (
    <motion.a
      href={`mailto:${mail}`}
      aria-label="Email Professional"
      className={`${profile.type == 'Fitness' ? 'bg-[#466273]' : 'bg-[#566835]'} items-center justify-center rounded-full p-2 align-middle`}
    >
      <FontAwesomeIcon icon={faEnvelope} size="lg" color="#fff" />
    </motion.a>
  );
}
