'use client';

import Link from 'next/link';
import logo from '../../public/logo2.svg';
import {
  faInstagram,
  faXTwitter,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationLink from './ui/NavigationLink';

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
  return (
    <footer
      className="mt-10 overflow-hidden"
      style={{
        backgroundImage: `url(${logo.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'calc(100% - 2.5rem ) center',
        backgroundSize: '400px',
      }}
    >
      <div className="mx-auto flex w-auto max-w-7xl flex-col gap-10 px-5 py-10">
        <div className="grid grid-cols-2 gap-5 text-[#444444] sm:grid-cols-3 sm:gap-20 sm:text-left md:grid-cols-3">
          {/* GUD */}
          <div className="flex flex-col">
            {/* GUD Section */}
            <h4 className="sub-header">GÜD</h4>
            <NavigationLink href="/about" text="About" variant="footerLink" />
            <NavigationLink href="/#faq" text="FAQ" variant="footerLink" />
            {/* Non-traversalble Footer Links */}
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

          {/* Developer */}
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

          {/* Menu */}
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
          <div className="flex flex-col items-center gap-2 text-[#444444] sm:items-start">
            <div className="flex gap-5">
              <span>
                <Link
                  href="https://github.com/Yousor0/gud"
                  className="text-primary transition-colors duration-100 hover:text-[#D07A64]"
                >
                  <FontAwesomeIcon size="2x" icon={faGithub} />
                </Link>
              </span>
              <span>
                <Link
                  href="#"
                  className="text-primary transition-colors duration-100 hover:text-[#D07A64]"
                >
                  <FontAwesomeIcon size="2x" icon={faXTwitter} />
                </Link>
              </span>
              <span>
                <Link
                  href="https://github.com/Yousor0/gud"
                  className="text-primary transition-colors duration-100 hover:text-[#D07A64]"
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
