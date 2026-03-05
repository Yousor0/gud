'use client';
import { useState } from 'react';
import Link from 'next/link';
import { easeInOut, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { logIn } from '../login';
import { CldImage } from 'next-cloudinary';

function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
      await logIn(formData.email, formData.password);
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
        <h1 className="page-title">Welcome back!</h1>
        <p className="mb-6 text-base">Log back into your account</p>
      </div>
      {/* Login */}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {/* email field */}
        <div className="mb-5 flex flex-col gap-2">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 duration-100 hover:border-brand-primary-hover focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-hover focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* password field */}
          <div>
            <label htmlFor="password" className="mb-1 block">
              Password
            </label>
            <input
              id="password"
              name="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 duration-100 hover:border-brand-primary-hover focus:border-brand-primary focus:ring-2 focus:ring-brand-primary-hover focus:outline-none"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        {/* Buttons */}
        <div className="flex w-full flex-col items-center gap-2">
          {/* LOGIN */}
          <motion.button
            whileHover={{ scale: 1.02, translateY: -1 }}
            whileTap={{ scale: 0.99 }}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ ease: easeInOut, duration: 0.2 }}
            type="submit"
            className="w-full cursor-auto rounded-md bg-brand-primary px-5 py-2 font-semibold text-bg-primary shadow-sm hover:cursor-pointer hover:bg-brand-primary-hover"
          >
            Login
          </motion.button>

          {/* OR
          <div className="text-gray-500">or</div>

          GOOGLE LOGIN

          <motion.button
            whileHover={{ scale: 1.02, translateY: -1 }}
            whileTap={{ scale: 0.99 }}
            style={{ originX: 0.5, originY: 0.5 }}
            transition={{ ease: easeInOut, duration: 0.2 }}
            type="button"
            className="w-full cursor-auto rounded-md border border-[#9D4431] px-5 py-2 font-medium text-[#9D4431] hover:cursor-pointer hover:border-[#D07A64] hover:bg-[#D07A64] hover:text-[#FAF7F3]"
          >
            <FontAwesomeIcon icon={faGoogle} /> Login with Google
          </motion.button> */}
        </div>
      </form>

      <p className="text-accent mt-6 text-center">
        Don't have an account?{' '}
        <Link
          href="/register"
          className="font-medium underline duration-100 hover:text-brand-primary"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

function LoginGraphic() {
  return (
    <div className="relative flex justify-center">
      <CldImage
        src="login02_jrtpff"
        alt="About GÜD Welcome Back"
        width="800"
        height="400"
      />

      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 -z-40 m-auto h-full w-full rotate-180 overflow-visible"
      >
        <path
          fill="var(--color-bg-secondary)"
          d="M45.3,-51.9C58.7,-42.7,69.7,-28.5,75.7,-10.9C81.7,6.6,82.7,27.5,73.6,41.8C64.5,56,45.2,63.7,29.1,61.6C13,59.5,0,47.6,-16.9,43C-33.8,38.3,-54.7,41,-66.9,32.5C-79.2,24,-82.8,4.4,-76.3,-10.2C-69.9,-24.8,-53.4,-34.4,-39,-43.4C-24.6,-52.4,-12.3,-60.9,1.8,-63.1C15.9,-65.2,31.8,-61.1,45.3,-51.9Z"
          transform="translate(50 50)"
        />
      </svg>
    </div>
  );
}

export default function Login() {
  return (
    <main>
      <div className="mx-auto my-20 grid max-w-5xl grid-cols-1 items-center gap-20 px-6 py-16 md:grid-cols-2">
        <LoginForm />
        <LoginGraphic />
      </div>
    </main>
  );
}
