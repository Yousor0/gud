// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>It seems the page you are looking for does not exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
