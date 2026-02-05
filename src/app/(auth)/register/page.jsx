import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


function RegisterForm() {
  return (
    <div className='flex flex-col justify-center max-w-md mx-auto w-full'>
      <h1 className='text-2xl font-bold mb-4'>
        Begin to get GÜD
      </h1>
      <p className='text-base mb-6'>
        Join the GÜD Community
      </p>
      <form className='space-y-4'>
        {/* First name field */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input id='firstName' className='w-full border border-gray-300 rounded-md px-3 py-2' type='text' placeholder='Capstone'/>
          </div>
          {/* Last name field */}
          <div>
            <label htmlFor='lastName' className='block mb-1'>Last Name</label>
            <input id='lastName' className='w-full border border-gray-300 rounded-md px-3 py-2' type='text' placeholder='DIG4172C'/>
          </div>
        </div>
        {/* Email field */}
        <div>
          <label htmlFor='email' className='block mb-1'>Email</label>
          <input id='email' className='w-full border border-gray-300 rounded-md px-3 py-2' type='email' placeholder='capstone2026@dig4172C.com'/>
        </div>
        {/* Password field */}
        <div>
          <label htmlFor='password' className='block mb-1'>Password</label>
          <input id='password' className='w-full border border-gray-300 rounded-md px-3 py-2' type='password' placeholder='**********'/>
        </div>
        {/* sign up button */}
        <button type='submit' className='w-full mt-2 bg-[#9C4A2F] text-white py-2 rounded-md hover:opacity-90'>Sign Up</button>
      </form>
      <div className="my-4 text-center text-sm text-gray-500">
        or
      </div>
      <button type='button' className="w-full border border-gray-300 py-2 rounded-md hover:bg-gray-50">
        Sign up with Google
      </button>
      <p className='text-base mt-6 text-center'>
        Already have an account?{' '}
        <Link href='/login' className="underline font-medium">
          Log In
        </Link>
      </p>
    </div>
  );
}
function RegisterGraphic() {
  return (
    <div>
      <Image src="/register01.png"
            alt="About GÜD welcome image of woman in yoga pose"
            width={650}
            height={400}/>
    </div>
  )
}

function RegisterSection() {
  return (
    <section className='px-6 py-16'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        <RegisterForm/>
        <RegisterGraphic/>
      </div>
    </section>
  )
}

export default function Register() {
  return (
    <main>
      <RegisterSection/>
    </main>
  );
}
