import React from 'react';
import Link from 'next/link';


function RegisterForm() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>
        Begin to get GÜD
      </h1>
      <p className='text-base mb-6'>
        Join the GÜD Community
      </p>
      <form>
        {/* First name field */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input id='firstName' type='text' placeholder='Capstone'/>
          </div>
          {/* Last name field */}
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input id='lastName' type='text' placeholder='DIG4172C'/>
          </div>
        </div>
        {/* Email field */}
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' placeholder='capstone2026@dig4172C.com'/>
        </div>
        {/* Password field */}
        <div>
          <label htmlFor='password'>Password</label>
          <input id='password' type='password' placeholder='**********'/>
        </div>
        {/* sign up button */}
        <button type='button'>Sign Up</button>
      </form>
      <div>
        <span>or</span>
      </div>
      {/* same thing here, are we leaving it as a BUTTON or should it be changed to SUBMIT */}
      <button type='button'>Sign up with Google</button>
      <p className='text-base mb-6'>
        Already have an account?{' '}
        <Link href='/login'>Log In</Link>
      </p>
    </div>
  );
}
function RegisterGraphic() {
  return (
    <div>
      {/* register graphic needs to be added here */}
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
