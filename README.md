# GÜD — Fitness & Wellness Platform

GÜD is a community-driven fitness and wellness web app connecting certified trainers and nutritionists with users seeking guided at-home workouts and personalized nutrition content.

---

## Features

- **Video Library** — Browse and search fitness and nutrition videos uploaded by certified professionals
- **Explore Page** — Discover trainers, nutritionists, and featured content
- **User Profiles** — Customizable profiles with avatar uploads, bios, and linked video content
- **Professional Profiles** — Extended profiles for trainers/nutritionists with specialties, certifications, and social links
- **Authentication** — Email/password sign-up and login with session management
- **Search** — Find videos by title from the header search bar
- **Responsive UI** — Mobile-friendly navigation and layout

---

## Tech Stack

| Layer           | Technology                                                                                                       |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js](https://nextjs.org/) (App Router)                                                                      |
| UI              | [Tailwind CSS](https://tailwindcss.com/), [FontAwesome](https://fontawesome.com/), [Motion](https://motion.dev/) |
| Auth & Database | [Supabase](https://supabase.com/) (PostgreSQL + Auth)                                                            |
| Media           | [Cloudinary](https://cloudinary.com/) via `next-cloudinary`                                                      |
| Deployment      | Docker / standalone Next.js output                                                                               |

---

## Vercel Site

Live Application  
https://gud-fitness.vercel.app

## Screenshots

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project
- A [Cloudinary](https://cloudinary.com/) account

### Installation

```bash
git clone https://github.com/Yousor0/gud-app.git
cd gud-app
npm install
```

### Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/             # Login, register, user profiles
│   ├── (feed)/             # Explore and search pages
│   ├── media/[content]/    # Video detail page
│   └── api/                # API routes (Cloudinary signing, account deletion)
├── components/             # Shared UI components
├── context/                # Auth context provider
├── features/               # Domain modules (auth, profiles, videos)
│   ├── auth/
│   ├── profiles/
│   └── videos/
└── lib/supabase/           # Supabase client setup
```

---

## Database Schema

| Table                   | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `profiles`              | Core user info (username, avatar, bio, role)      |
| `professional_profiles` | Extended info for trainers/nutritionists          |
| `videos`                | Video metadata (title, type, thumbnail, uploader) |

---

## Deployment

The app supports Docker deployment:

```bash
docker-compose up --build
```

Or deploy to [Vercel](https://vercel.com/):

```bash
vercel deploy
```

---

## License

MIT
