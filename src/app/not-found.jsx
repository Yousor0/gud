import Button from '../components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function NotFound() {
  return (
    <main className="mx-auto flex w-auto max-w-7xl flex-col items-center px-5 py-24 text-center">
      <div className="flex flex-col items-center">
        <span className="text-8xl font-bold text-brand-secondary">404</span>
        <div className="flex flex-col gap-3">
          <h1 className="section-title">Page Not Found</h1>
          <div className="flex flex-col gap-8">
            <p className="body-primary max-w-sm">
              Looks like this page took a wrong turn. Let&apos;s get you back on
              track.
            </p>
            <Button variant="border" href="/">
              <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
