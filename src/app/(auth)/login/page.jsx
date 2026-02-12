'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { easeInOut, motion } from 'motion/react';

function LoginForm() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="page-title">Welcome back!</h1>
        <p className="mb-6 text-base">Log back into your account</p>
      </div>

      {/* Login */}
      <form className="flex flex-col">
        {/* email field */}
        <div className="mb-5 flex flex-col gap-2">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="capstone2026@dig4172C.com"
            />
          </div>
          {/* password field */}
          <div>
            <label htmlFor="password" className="mb-1 block">
              Password
            </label>
            <input
              id="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex w-full flex-col items-center gap-2">
          {/* LOGIN */}
          <motion.button
            whileHover={{ scale: 1.02, translateY: -1 }}
            whileTap={{ scale: 0.99 }}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ ease: easeInOut, duration: 0.2 }}
            type="button"
            className="w-full cursor-auto rounded-md bg-[#9D4431] px-5 py-2 font-semibold text-[#FAF7F3] shadow-sm hover:cursor-pointer hover:bg-[#D07A64]"
          >
            Login
          </motion.button>

          {/* OR */}
          <div className="text-gray-500">or</div>

          {/* GOOGLE LOGIN */}

          <motion.button
            whileHover={{ scale: 1.02, translateY: -1 }}
            whileTap={{ scale: 0.99 }}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ ease: easeInOut, duration: 0.2 }}
            type="button"
            className="w-full cursor-auto rounded-md border border-[#9D4431] px-5 py-2 font-medium text-[#9D4431] hover:cursor-pointer hover:border-[#D07A64] hover:bg-[#D07A64] hover:text-[#FAF7F3]"
          >
            <FontAwesomeIcon icon={faGoogle} /> Login with Google
          </motion.button>
        </div>
      </form>

      <p className="text-accent mt-6 text-center">
        Don't have an account?{' '}
        <Link
          href="/register"
          className="font-medium underline hover:text-[#9d4431]"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

function LoginGraphic() {
  return (
    <div>
      <Image
        src="/login02.png"
        alt="About GÜD welcome image of woman in yoga pose"
        width={800}
        height={400}
      />
    </div>
  );
}

function LoginSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2">
        <LoginForm />
        <LoginGraphic />
      </div>
    </section>
  );
}

export default function Login() {
  return (
    <main>
      <LoginSection />
    </main>
  );
}
