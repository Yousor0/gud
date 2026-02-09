'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { easeInOut, motion } from 'motion/react';

function RegisterForm() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="page-title">Begin to get GÜD!</h1>
        <p className="mb-6 text-base">Join the GÜD Community</p>
      </div>

      {/* SIGN UP FORM */}
      <form className="flex flex-col">
        {/* First name field */}
        <div className="mb-5 flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                type="text"
                placeholder="Capstone"
              />
            </div>
            {/* Last name field */}
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                type="text"
                placeholder="DIG4172C"
              />
            </div>
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              type="email"
              placeholder="capstone2026@dig4172C.com"
            />
          </div>
          {/* Password field */}
          <div>
            <label htmlFor="password" className="mb-1 block">
              Password
            </label>
            <input
              id="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              type="password"
              placeholder="**********"
            />
          </div>
        </div>

        {/* sign up button */}

        <div className="flex w-full flex-col items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02, translateY: -1 }}
            whileTap={{ scale: 0.99 }}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ ease: easeInOut, duration: 0.2 }}
            type="submit"
            className="w-full rounded-md bg-[#9D4431] px-5 py-2 font-semibold text-[#FAF7F3] shadow-sm hover:bg-[#D07A64]"
          >
            Signup
          </motion.button>

          <div className="text-gray-500">or</div>

          {/* GOOGLE LOGIN */}
          <motion.button
            whileHover={{ scale: 1.02, translateY: -1 }}
            whileTap={{ scale: 0.99 }}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ ease: easeInOut, duration: 0.2 }}
            type="submit"
            className="w-full rounded-md border border-[#9D4431] px-5 py-2 font-medium text-[#9D4431] hover:border-[#D07A64] hover:bg-[#D07A64] hover:text-[#FAF7F3]"
          >
            <FontAwesomeIcon icon={faGoogle} /> Sign Up with Google
          </motion.button>
        </div>
      </form>

      <p className="mt-6 text-center text-base">
        Already have an account?{' '}
        <Link href="/login" className="font-medium underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
function RegisterGraphic() {
  return (
    <div>
      <Image
        src="/register01.png"
        alt="About GÜD welcome image of woman in yoga pose"
        width={650}
        height={400}
      />
    </div>
  );
}

function RegisterSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <RegisterForm />
        <RegisterGraphic />
      </div>
    </section>
  );
}

export default function Register() {
  return (
    <main>
      <RegisterSection />
    </main>
  );
}
