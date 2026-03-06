import Script from 'next/script';
import LandingWelcome from '../components/landing/LandingWelcome';
import InfoCards from '../components/landing/InfoCards';
import HowItWorks from '../components/landing/HowItWorks';
import MissionGud from '../components/landing/MissionGud';
import Testimonials from '../components/landing/Testimonials';
import FaqSection from '../components/landing/FaqSection';
import { faq } from '../components/landing/faqData';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function landingPage() {
  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 sm:gap-20">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LandingWelcome />
      <InfoCards />
      <HowItWorks />
      <MissionGud />
      <Testimonials />
      <FaqSection id="faq" />
    </main>
  );
}
