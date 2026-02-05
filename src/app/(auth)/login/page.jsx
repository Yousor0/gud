import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function LoginForm() {
  return (
    <div className='flex flex-col justify-center max-w-md mx-auto w-full'>
      <h1 className='text-2xl font-bold mb-4'>
        Welcome back
      </h1>
      <p className='text-base mb-6'>
        Log back into your account
      </p>
      <form className='space-y-4'>
        {/* email field */}
        <div>
          <label htmlFor='email' className='block mb-1'>Email</label>
          <input id='email' type='email' className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder='capstone2026@dig4172C.com'/>
        </div>
        {/* password field */}
        <div>
          <label htmlFor='password' className='block mb-1'>Password</label>
          <input id='password' className="w-full border border-gray-300 rounded-md px-3 py-2" type='password' placeholder='**********'/>
        </div>
        {/* changed button to submit */}
        <button type='submit' className='w-full mt-2 bg-[#9C4A2F] text-white py-2 rounded-md'>Log In</button>
      </form>
      <div className="my-4 text-center text-sm text-gray-500">
        or
      </div>
      <button type='button'className='w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50'>
        Sign in with Google
      </button>
      <p className='text-base mt-6 text-center'>
        Don't have an account?{' '}
        <Link href='/register' className="underline font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

function LoginGraphic() {
  return (
    <div>

      <Image src="/login02.png"
            alt="About GÜD welcome image of woman in yoga pose"
            width={800}
            height={400}/>
    </div>
  )
}

function LoginSection() {
  return (
    <section className='px-6 py-16'>
      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
      <LoginForm/>
      <LoginGraphic/>
      </div>
    </section>
  )
}

export default function Login() {
  return (
    <main>
      <LoginSection/>
    </main>
  );
}