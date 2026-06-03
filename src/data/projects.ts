import furniva1 from '../assets/furniva1.jpg';
import furniva2 from '../assets/furniva2.jpg';
import furniva3 from '../assets/furniva3.jpg';
import cleanloop1 from '../assets/cleenloop1.jpeg';
import cleanloop2 from '../assets/cleenloop2.jpeg';
import skybook1 from '../assets/skybook1.jpeg';
import skybook2 from '../assets/skybook2.jpeg';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string[];
  tech: string[];
  github: string;
  demo?: string;
  featured: boolean;
  images: string[];
}

export const projects: Project[] = [
  {
    slug: 'furniva',
    title: 'Furniva',
    subtitle: 'AR-Based Furniture Shopping App',
    description: [
      'An augmented-reality app that lets users visualize furniture in real time within their physical space before making a purchase decision.',
      'Features product browsing, 3D model rendering, and interactive AR placement to check size, position, and design fit — reducing return rates and improving buyer confidence.',
      'Built with Flutter and Firebase for the backend, leveraging device cameras and AR capabilities for an immersive shopping experience.',
    ],
    tech: ['Flutter', 'Firebase', 'AR / 3D Visualization', 'Dart'],
    github: 'https://github.com/Rijan77/furniva',
    featured: true,
    images: [furniva1, furniva2, furniva3],
  },
  {
    slug: 'cleanloop',
    title: 'CleanLoop',
    subtitle: 'Smart Waste Management App',
    description: [
      'A community-driven waste management app that makes recycling and sustainability engaging through gamification and real-time features.',
      'Includes waste tracking, recycling guides, and community event listings — empowering users to participate in local green initiatives.',
      'Built-in real-time notifications, pickup scheduling, and gamification features reward eco-friendly habits and drive sustained engagement.',
    ],
    tech: ['Flutter', 'Firebase', 'Dart', 'Real-time Notifications'],
    github: 'https://github.com/Rijan77/CleanLooop_',
    featured: true,
    images: [cleanloop1, cleanloop2],
  },
  {
    slug: 'skybook',
    title: 'SkyBook',
    subtitle: 'Flight Search & Booking App',
    description: [
      'A full-featured flight search and booking application powered by the Aviation Stack API for real-time flight data.',
      'Provides live flight search, real-time tracking, and seamless booking capabilities in a clean, intuitive interface.',
      'Integrates Firebase for authentication and data persistence, with live flight status updates for a complete travel companion experience.',
    ],
    tech: ['Flutter', 'Firebase', 'Aviation Stack API', 'Dart'],
    github: 'https://github.com/Rijan77/flight-tracker',
    demo: 'https://youtube.com/shorts/uqAD8SORLh0?si=rdh62JZDAxfQakUv',
    featured: true,
    images: [skybook1, skybook2],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getAdjacentProjects = (slug: string) => {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
};
