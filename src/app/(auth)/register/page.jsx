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

      <svg
        viewBox="0 0 400 200"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -z-50 rotate-180"
      >
        <path
          fill="#F5F0E7"
          d="M54.1,-59C69.1,-51.9,79.4,-33.9,83.4,-14.3C87.4,5.3,84.9,26.5,73.9,40C62.9,53.5,43.3,59.4,27.3,57.7C11.3,55.9,-1.1,46.6,-15.1,41.5C-29,36.4,-44.5,35.5,-54.6,27.1C-64.7,18.7,-69.5,2.8,-64.4,-8.8C-59.4,-20.4,-44.4,-27.7,-32,-35.3C-19.6,-42.8,-9.8,-50.6,4.9,-56.5C19.6,-62.3,39.1,-66.1,54.1,-59Z"
          transform="translate(150 100) "
        />
      </svg>

      {/* SIGN UP FORM */}
      <form className="flex flex-col">
        {/* First name field */}
        <div className="mb-5 flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 duration-100 hover:border-[#d07a64] focus:border-[#9d4431] focus:ring-2 focus:ring-[#d07a64] focus:outline-none"
                type="text"
              />
            </div>
            {/* Last name field */}
            <div>
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 duration-100 hover:border-[#d07a64] focus:border-[#9d4431] focus:ring-2 focus:ring-[#d07a64] focus:outline-none"
                type="text"
              />
            </div>
          </div>

          {/* Username field */}
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              className="w-full rounded-md border border-gray-300 px-3 py-2 duration-100 hover:border-[#d07a64] focus:border-[#9d4431] focus:ring-2 focus:ring-[#d07a64] focus:outline-none"
              type="text"
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 duration-100 hover:border-[#d07a64] focus:border-[#9d4431] focus:ring-2 focus:ring-[#d07a64] focus:outline-none"
              type="email"
            />
          </div>
          {/* Password field */}
          <div>
            <label htmlFor="password" className="mb-1 block">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 duration-100 hover:border-[#d07a64] focus:border-[#9d4431] focus:ring-2 focus:ring-[#d07a64] focus:outline-none"
              type="password"
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
            type="button"
            className="w-full cursor-auto rounded-md bg-[#9D4431] px-5 py-2 font-semibold text-[#FAF7F3] shadow-sm hover:cursor-pointer hover:bg-[#D07A64]"
          >
            Sign up
          </motion.button>

          {/* <div className="text-gray-500">or</div>

          GOOGLE LOGIN
          <motion.button
            whileHover={{ scale: 1.02, translateY: -1 }}
            whileTap={{ scale: 0.99 }}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ ease: easeInOut, duration: 0.2 }}
            type="button"
            className="w-full cursor-auto rounded-md border border-[#9D4431] px-5 py-2 font-medium text-[#9D4431] hover:cursor-pointer hover:border-[#D07A64] hover:bg-[#D07A64] hover:text-[#FAF7F3]"
          >
            <FontAwesomeIcon icon={faGoogle} /> Sign Up with Google
          </motion.button> */}
        </div>
      </form>

      <p className="mt-6 text-center text-base">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-medium underline duration-100 hover:text-[#9d4431]"
        >
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
