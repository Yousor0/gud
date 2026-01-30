import React from 'react';
import Link from 'next/link';

function LoginForm() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>
        Welcome back
      </h1>
      <p className='text-base mb-6'>
        Log back into your account
      </p>
      <form>
        {/* email field */}
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' placeholder='capstone2026@dig4172C.com'/>
        </div>
        {/* password field */}
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' placeholder='**********'/>
        </div>
        {/* should I leave this as a BUTTON or should I change this to SUBMIT */}
        <button type='button'>Log In</button>
      </form>
      <div>
        <span>or</span>
      </div>
      <button type='button'>Sign in with Google</button>
      <p className='text-base mb-6'>
        Don't have an account?{' '}
        <Link href='/register'>Sign Up</Link>
      </p>
    </div>
  )
}

function LoginGraphic() {
  return (
    <div>
      {/* login graphic needs to be added here */}
    </div>
  )
}

function LoginSection() {
  return (
    <section className='px-6 py-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
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