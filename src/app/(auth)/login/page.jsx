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

function LoginForm() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <h1 className="page-title">Welcome back!</h1>
      <p className="mb-6 text-base">Log back into your account</p>
      <form className="space-y-4">
        {/* email field */}
        <div>
          <label htmlFor="email" className="mb-1 block">
            Email
          </label>
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
            placeholder="**********"
          />
        </div>
        <div className='w-full [&>div>a]:block [&>div>a]:w-full [&>div>a]:text-center'>
          <Button href='/' text='Log In'/>
          </div>
      </form>
      <div className="my-4 text-center text-sm text-gray-500">or</div>
      <div className='w-full [&>div>a]:block [&>div>a]:w-full [&>div>a]:text-center'>
        <Button href='/' text='Login with Google' variant='border'/>
        </div>
      <p className="mt-6 text-center text-base">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium underline">
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
