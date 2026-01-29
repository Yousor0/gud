'use client';

import Link from 'next/link';
import logo from '../../public/logo2.svg';
import {
  faInstagram,
  faXTwitter,
  faGithub,
  faGit,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      <div className="grid grid-cols-4 gap-20">
        <div className="flex flex-col">
          <h4 className="font-black">GÜD</h4>
          <span>
            <Link href="/about">About</Link>
          </span>
          <span>
            <Link href="/faq">FAQ</Link>
          </span>
          <span>
            <Link href="/faq">Contact</Link>
          </span>
          <span>
            <Link href="/#">Term & Conditions</Link>
          </span>
          <span>
            <Link href="/#">Privacy Policy</Link>
          </span>
        </div>
        <div className="flex flex-col">
          <h4 className="font-black">Developers </h4>
          <span>
            <Link
              href="https://github.com/Yousor0"
              target="_blank"
              rel="noopener noreferrer"
            >
              Andrew Jiang{' '}
            </Link>
          </span>
          <span>
            <Link
              href="https://github.com/jeremyauguste"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jeremy Auguste
            </Link>
          </span>
          <span>
            <Link
              href="https://github.com/bianalambis"
              target="_blank"
              rel="noopener noreferrer"
            >
              Biana Lambis-Puryear
            </Link>
          </span>
          <span>
            <Link
              href="https://github.com/FrancescaLorthe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Francesca Lorthe
            </Link>
          </span>
          <span>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Nikolai Cooperider{' '}
            </Link>
          </span>
          <span>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Jacob Gomez
            </Link>
          </span>
        </div>
        <div className="flex flex-col">
          <h4 className="font-black">Menu </h4>
          <span>
            <Link href="/about">About</Link>
          </span>
          <span>
            <Link href="/faq">FAQ</Link>
          </span>
          <span>
            <Link href="/register">Sign Up</Link>
          </span>
          <span>
            <Link href="login">Login</Link>
          </span>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            <span>
              <Link href="https://github.com/Yousor0/gud">
                <FontAwesomeIcon size="2x" icon={faGithub} />
              </Link>
            </span>
            <span>
              <Link href="#">
                <FontAwesomeIcon size="2x" icon={faXTwitter} />
              </Link>
            </span>
            <span>
              <Link href="https://github.com/Yousor0/gud">
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
