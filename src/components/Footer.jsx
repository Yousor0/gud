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

export default function Footer() {
  return (
    <footer
      className="relative flex flex-col gap-10 overflow-hidden bg-[#D0C5B6] px-20 py-10"
      style={{
        backgroundImage: `url(${logo.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'calc(100% - 2.5rem ) center',
        backgroundSize: '400px',
      }}
    >
      <div className="grid grid-cols-1 gap-5 text-center text-[#444444] sm:grid-cols-4 sm:gap-20 sm:text-left">
        <div className="flex flex-col">
          {/* GUD Section */}
          <h4 className="font-black">GÜD</h4>
          <NavigationLink href="/about" text="About" variant="footerLink" />
          <NavigationLink href="/faq" text="FAQ" variant="footerLink" />
          <NavigationLink href="#" text="Contact" variant="footerLink" />
          <NavigationLink
            href="#"
            text="Term & Conditions"
            variant="footerLink"
          />
          <NavigationLink href="#" text="Privacy Policy" variant="footerLink" />
        </div>

        {/* Developer */}
        <div className="flex flex-col">
          <h4 className="font-black">Developers </h4>
          <NavigationLink
            href="https://github.com/Yousor0"
            text="Andrew Jiang"
            variant="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          />
          <NavigationLink
            href="https://github.com/jeremyauguste"
            text="Jeremy Auguste"
            variant="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          />
          <NavigationLink
            href="https://github.com/bianalambis"
            text="Biana Lambis-Puryear"
            variant="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          />
          <NavigationLink
            href="https://github.com/FrancescaLorthe"
            text="Francesca Lorthe"
            variant="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          />
          <NavigationLink
            href="#"
            text="Nikolai Cooperider"
            variant="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          />
          <NavigationLink
            href="#"
            text="Jacob Gomez"
            variant="footerLink"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>

        {/* Menu */}
        <div className="flex flex-col">
          <h4 className="font-black">Menu</h4>
          <NavigationLink href="/explore" text="Explore" variant="footerLink" />
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
    </footer>
  );
}
