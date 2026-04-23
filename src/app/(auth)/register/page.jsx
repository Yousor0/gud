'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { easeInOut, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { signUp } from '../../../features/auth/services/authService';

function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signUp(
        formData.email,
        formData.password,
        formData.username,
        formData.first_name,
        formData.last_name
      );
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center">
      <div className="flex flex-col gap-3">
        <h1 className="page-title">Begin to get GÜD!</h1>
        <p className="mb-6 text-base">Join the GÜD Community</p>
      </div>

      {/* SIGN UP FORM */}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {/* First name field */}
        <div className="mb-5 flex flex-col gap-2">
          <div className="flex flex-row gap-4">
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                className="text-input"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            {/* Last name field */}
            <div>
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                className="text-input"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Username field */}
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              className="text-input"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              className="text-input"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              className="text-input"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        {/* sign up button */}
        <div className="flex w-full flex-col items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02, translateY: -1 }}
            whileTap={{ scale: 0.99 }}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ ease: easeInOut, duration: 0.2 }}
            type="submit"
            disabled={loading}
            className="bg-brand-primary text-bg-primary hover:bg-brand-primary-hover w-full cursor-auto rounded-md px-5 py-2 font-semibold shadow-sm hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </motion.button>
        </div>
      </form>

      <p className="mt-6 text-center text-base">
        Already have an account?{' '}
        <Link
          href="/login"
          className="hover:text-brand-primary font-medium underline duration-100"
        >
          Log In
        </Link>
      </p>
    </div>
  );
}

function RegisterGraphic() {
  return (
    <div className="relative hidden h-100 w-full items-center justify-center md:flex">
      <Image
        src="https://d2d8wkqybl2mij.cloudfront.net/public/register.png"
        alt="Begin to Get GUD"
        width={650}
        height={400}
        className="h-full w-full object-contain"
      />

      <svg
        viewBox="0 0 110 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 -z-40 m-auto h-full w-full rotate-180 overflow-visible"
      >
        <path
          fill="var(--color-bg-secondary)"
          d="M54.1,-59C69.1,-51.9,79.4,-33.9,83.4,-14.3C87.4,5.3,84.9,26.5,73.9,40C62.9,53.5,43.3,59.4,27.3,57.7C11.3,55.9,-1.1,46.6,-15.1,41.5C-29,36.4,-44.5,35.5,-54.6,27.1C-64.7,18.7,-69.5,2.8,-64.4,-8.8C-59.4,-20.4,-44.4,-27.7,-32,-35.3C-19.6,-42.8,-9.8,-50.6,4.9,-56.5C19.6,-62.3,39.1,-66.1,54.1,-59Z"
          transform="translate(35 50) "
        />
      </svg>
    </div>
  );
}

export default function Register() {
  return (
    <main>
      <div className="mx-auto my-8 grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:my-12 sm:gap-12 sm:py-12 md:my-16 md:grid-cols-2 md:gap-16 md:py-16 lg:my-20 lg:gap-20">
        <RegisterForm />
        <RegisterGraphic />
      </div>
    </main>
  );
}
