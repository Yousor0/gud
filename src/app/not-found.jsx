// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1 className="flex justify-center">404 - Page Not Found</h1>
      <p className="flex justify-center">
        It seems the page you are looking for does not exist.
      </p>
      <Link href="/" className="flex justify-center">
        Return Home
      </Link>
    </div>
  );
}
