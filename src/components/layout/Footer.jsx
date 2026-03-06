'use client';

import Link from 'next/link';
import {
  faInstagram,
  faXTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationLink from '../ui/NavigationLink';
import { getCldImageUrl } from 'next-cloudinary';

const developers = [
  { name: 'Andrew Jiang', githubLink: 'https://github.com/Yousor0' },
  { name: 'Jeremy Auguste', githubLink: 'https://github.com/jeremyauguste' },
  {
    name: 'Biana Lambis-Puryear',
    githubLink: 'https://github.com/bianalambis',
  },
  {
    name: 'Francesca Lorthe',
    githubLink: 'https://github.com/FrancescaLorthe',
  },
  { name: 'Nikolai Cooperider', githubLink: '#' },
];

export default function Footer() {
  const logoUrl = getCldImageUrl({
    src: 'logo2_nx6857',
    width: 800,
    quality: 'auto',
    format: 'auto',
  });

  return (
    <footer
      className="mt-10 overflow-hidden bg-[length:400px] bg-[position:calc(100%-2.5rem)_center] bg-no-repeat"
      style={{
        backgroundImage: `url(${logoUrl})`,
      }}
    >
      <div className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 py-10">
        <div className="grid grid-cols-2 gap-5 text-text-accent sm:grid-cols-3 sm:gap-20 sm:text-left md:grid-cols-3">
          <div className="flex flex-col">
            <h4 className="sub-header">GÜD</h4>
            <NavigationLink href="/about" text="About" variant="footerLink" />
            <NavigationLink href="/#faq" text="FAQ" variant="footerLink" />
            <NavigationLink
              href="javascript:void(0)"
              text="Contact"
              variant="footerLink"
            />
            <NavigationLink
              href="javascript:void(0)"
              text="Term & Conditions"
              variant="footerLink"
            />
            <NavigationLink
              href="javascript:void(0)"
              text="Privacy Policy"
              variant="footerLink"
            />
          </div>

          <div className="flex flex-col">
            <h4 className="sub-header">Developers </h4>
            {developers.map((person) => (
              <NavigationLink
                key={person.name}
                href={person.githubLink}
                text={person.name}
                variant="footerLink"
                target="_blank"
                rel="noopener noreferrer"
              />
            ))}
          </div>

          <div className="flex flex-col">
            <h4 className="sub-header">Menu</h4>
            <NavigationLink
              href="/explore"
              text="Explore"
              variant="footerLink"
            />
            <NavigationLink href="/about" text="About" variant="footerLink" />
            <NavigationLink
              href="/register"
              text="Sign up"
              variant="footerLink"
            />
            <NavigationLink href="/login" text="Login" variant="footerLink" />
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center gap-2 text-text-accent sm:items-start">
            <div className="flex gap-5">
              <span>
                <Link
                  href="https://github.com/Yousor0/gud"
                  className="text-primary transition-colors duration-100 hover:text-brand-primary-hover"
                >
                  <FontAwesomeIcon size="2x" icon={faGithub} />
                </Link>
              </span>
              <span>
                <Link
                  href="#"
                  className="text-primary transition-colors duration-100 hover:text-brand-primary-hover"
                >
                  <FontAwesomeIcon size="2x" icon={faXTwitter} />
                </Link>
              </span>
              <span>
                <Link
                  href="https://github.com/Yousor0/gud"
                  className="text-primary transition-colors duration-100 hover:text-brand-primary-hover"
                >
                  <FontAwesomeIcon size="2x" icon={faInstagram} />
                </Link>
              </span>
            </div>
            &copy; {new Date().getFullYear()} GÜD. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
