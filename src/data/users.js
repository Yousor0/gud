import { videos } from './videos';

export const users = [
  {
    id: 'user_123',
    username: 'andrewjiang',
    name: {
      firstName: 'Andrew',
      lastName: 'Jiang',
    },
    type: 'Fitness',
    email: 'andrew@email.com',
    avatarUrl: 'https://cdn.site.com/avatars/andrew.png',
    bio: 'UI Engineer | Web Dev @ UCF',
    createdAt: '2026-01-30T12:00:00Z',
  },
  {
    id: 'user_456',
    username: 'fitqueen',
    name: {
      firstName: 'Fit',
      lastName: 'Queen',
    },
    type: 'Fitness',
    email: 'fitqueen@email.com',
    avatarUrl: 'https://cdn.site.com/avatars/fitqueen.png',
    bio: 'Fitness Enthusiast | Cardio & Strength Trainer',
    createdAt: '2025-11-15T09:30:00Z',
  },
  {
    id: 'user_789',
    username: 'workoutpro',
    name: {
      firstName: 'WorkoutPro',
      lastName: '',
    },
    type: 'Nutrition',
    email: 'workoutpro@email.com',
    avatarUrl: 'https://cdn.site.com/avatars/workoutpro.png',
    bio: 'Certified Personal Trainer | Home & Gym Workouts',
    createdAt: '2024-08-22T16:45:00Z',
  },
];

// Dynamic video Count based on Videos API
export const userWithVideos = users.map((user) => ({
  ...user,
  stats: {
    subscriberCount: Math.floor(Math.random() * 2000) + 500,
    videoCount: videos.filter((video) => video.userId === user.id).length,
  },
  videos: videos.filter((video) => video.userId === user.id),
}));
