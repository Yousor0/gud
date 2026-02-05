'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDumbbell,
  faAppleWhole,
  faCertificate,
} from '@fortawesome/free-solid-svg-icons';
import { easeOut, motion } from 'motion/react';

function RegisterForm() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <h1 className="page-title">Begin to get GÜD!</h1>
      <p className="mb-6 text-base">Join the GÜD Community</p>
      <form className="space-y-4">
        {/* First name field */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <label htmlFor="lastName" className="mb-1 block">
              Last Name
            </label>
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
          <label htmlFor="email" className="mb-1 block">
            Email
          </label>
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
        {/* sign up button */}
        <div className='w-full [&>div>a]:block [&>div>a]:w-full [&>div>a]:text-center'>
          <Button href="/" text="Sign Up" />
          </div>
      </form>
      <div className="my-4 text-center text-sm text-gray-500">or</div>
      <div className='w-full [&>div>a]:block [&>div>a]:w-full [&>div>a]:text-center'>
        <Button text='Sign up with Google' variant='border'/>
      </div>
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
