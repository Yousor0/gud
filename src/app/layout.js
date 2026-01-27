import { Poppins } from 'next/font/google'; // Import the Poppins font from Next.js Google Fonts integration
import './globals.css'; // Import global css for app

// Poppins Font Config
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Gud',
  description: 'Get Fit & Feel Good',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} `}>
      <body>{children}</body>
    </html>
  );
}
