import './globals.css'; // Import global css for app
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'GÜD | At-Home Workouts & Nutrition Guidance',
  description:
    'GÜD offers certified at-home workout plans and personalized nutrition guidance for all fitness levels. Start your wellness journey today.',
  openGraph: {
    title: 'GÜD | At-Home Workouts & Nutrition Guidance',
    description:
      'Certified at-home workouts and personalized nutrition guidance for all fitness levels.',
    siteName: 'GÜD',
    images: [
      { url: '/landing01.png', width: 800, height: 400, alt: 'GÜD wellness platform' },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GÜD | At-Home Workouts & Nutrition',
    description:
      'Certified at-home workouts and personalized nutrition guidance for all fitness levels.',
    images: ['/landing01.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
