import './globals.css'; // Import global css for app
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'GÜD',
  description: 'Get Fit & Feel Good',
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
