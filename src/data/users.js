import { videos } from './videos';

export const users = [
  {
    id: '1',
    username: 'sophiaalvarez',
    name: {
      firstName: 'Sophia',
      lastName: 'Alvarez',
    },
    specialty: [
      'Yoga Instructor',
      'Yoga Stretch & Strength',
      'Mobility & Flexibility',
      'Beginner Yoga Flow',
    ],
    // fitness? or nutrition?
    type: 'Fitness',
    about: {
      header: 'Get a personalized fitness plan',
      description:
        'Achieve your fitness goals with a custom workout plan tailored to your needs and goals',
      email: '',
      avatarUrl: '/profileAvatars/sophiaAlvarez.jpg',
      bio: '',
      createdAt: '',
    },
  },
  {
    id: '2',
    username: 'jordanlee',
    name: {
      firstName: 'Jordan',
      lastName: 'Lee',
    },
    specialty: [
      'Cardio & HIIT',
      'HIIT Cardio',
      'Full-Body Conditioning',
      'Endurance & Agility',
    ],
    // fitness? or nutrition?
    type: 'Fitness',
    about: {
      header: 'Get a personalized fitness plan',
      description:
        'Achieve your fitness goals with a custom workout plan tailored to your needs and goals',
      email: '',
      avatarUrl: '/profileAvatars/jordanLee.jpg',
      bio: '',
      createdAt: '',
    },
  },
  {
    id: '3',
    username: 'thethompson',
    name: {
      firstName: 'The',
      lastName: 'Thompson',
    },
    specialty: [
      'Strength Training',
      'Functional Strength Training',
      'High-Intensity Cardio',
      'Core Stability Work',
    ],
    // fitness? or nutrition?
    type: 'Fitness',
    about: {
      header: 'Get a personalized fitness plan',
      description:
        'Achieve your fitness goals with a custom workout plan tailored to your needs and goals',
      email: '',
      avatarUrl: '/profileAvatars/theThompson.jpg',
      bio: '',
      createdAt: '',
    },
  },
  {
    id: '4',
    username: 'noahwilliams',
    name: {
      firstName: 'Noah',
      lastName: 'Williams',
    },
    specialty: [
      'Mobility & Cardio',
      'Functional Movement Training',
      'Low-Impact Cardio',
      'Strength and Flexibility',
    ],
    // fitness? or nutrition?
    type: 'Fitness',
    about: {
      header: 'Get a personalized fitness plan',
      description:
        'Achieve your fitness goals with a custom workout plan tailored to your needs and goals',
      email: '',
      avatarUrl: '/profileAvatars/noahWilliams.jpg',
      bio: '',
      createdAt: '',
    },
  },
  {
    id: '5',
    username: 'emilynguyen',
    name: {
      firstName: 'Emily',
      lastName: 'Nguyen',
    },
    specialty: [
      'Nutritionist',
      'Meal Planning',
      'Therapeutic Nutrition Plans',
      '',
    ],
    // fitness? or nutrition?
    type: 'Nutrition',
    about: {
      header: 'Get a personalized nutrition plan',
      description:
        'Achieve your fitness goals with a custom nutritional plan tailored to your needs and goals',
      email: '',
      avatarUrl: '/profileAvatars/emilyNguyen.jpg',
      bio: '',
      createdAt: '',
    },
  },
  {
    id: '6',
    username: 'malikrobinson',
    name: {
      firstName: 'Malik',
      lastName: 'Robinson',
    },
    specialty: [
      'Nutritionist',
      'Clinical Nutrition Science',
      'Metabolic Health Research',
      'Nutritional Biochemistry',
    ],
    // fitness? or nutrition?
    type: 'Nutrition',
    about: {
      header: 'Get a personalized nutrition plan',
      description:
        'Achieve your fitness goals with a custom nutritional plan tailored to your needs and goals',
      email: '',
      avatarUrl: '/profileAvatars/malikRobinson.jpg',
      bio: '',
      createdAt: '',
    },
  },
  {
    id: '7',
    username: 'paulsilva',
    name: {
      firstName: 'Paul',
      lastName: 'Silva',
    },
    specialty: [
      'Nutrition Specialist',
      'Clinical Nutrition Science',
      'Metabolic Health Research',
      'Nutritional Biochemistry',
    ],
    // fitness? or nutrition?
    type: 'Nutrition',
    about: {
      header: 'Get a personalized nutrition plan',
      description:
        'Achieve your fitness goals with a custom nutritional plan tailored to your needs and goals',
      email: '',
      avatarUrl: '/profileAvatars/paulSilva.webp',
      bio: '',
      createdAt: '',
    },
  },
  {
    id: '8',
    username: 'lenabrooks',
    name: {
      firstName: 'Lena',
      lastName: 'Brooks',
    },
    specialty: [
      'Nutritionist',
      'Meal Planning',
      'Therapeutic Nutrition Plans',
      '',
    ],
    // fitness? or nutrition?
    type: 'Nutrition',
    about: {
      header: 'Get a personalized nutrition plan',
      description:
        'Achieve your fitness goals with a custom nutritional plan tailored to your needs and goals',
      email: '',
      avatarUrl: '/profileAvatars/lenaBrooks.jpg',
      bio: '',
      createdAt: '',
    },
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
