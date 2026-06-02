export interface Experience {
  role: string;
  company: string;
  period: string;
  current: boolean;
  bullets: string[];
  logoKey: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  logoKey: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  category: 'mobile' | 'backend' | 'cs' | 'tools';
}

export const experiences: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Mediisha (Hospital Software)',
    period: 'Aug 2025 – Present',
    current: true,
    logoKey: 'mediisha',
    bullets: [
      'Develop and maintain a production Flutter application used by hospital staff to scan barcodes and capture patient documents (prescriptions, records) for the hospital\'s insurance (BIMA) claim submission pipeline.',
      'Architect and implement REST API integrations connecting the mobile app to the hospital\'s MSSQL-backed Laboratory Information System (LIS), ensuring reliable real-time data exchange across clinical workflows.',
      'Apply Clean Architecture and Cubit state management patterns to build a testable, modular codebase that scales with growing feature requirements.',
      'Work cross-functionally with clinical, operations, and backend teams to identify bottlenecks and ship workflow automation features that reduce manual claim processing time.',
    ],
  },
  {
    role: 'Mobile Application Developer — Intern',
    company: 'Diyalo Technology',
    period: 'Feb 2025 – Jul 2025',
    current: false,
    logoKey: 'diyalo',
    bullets: [
      'Shipped multiple homepage enhancements for the BusSewa app and implemented full multi-language localization (Nepali / English) used across all regions, with zero regression in existing flows.',
      'Built a robust API communication layer using Dio interceptors with token refresh handling, reducing auth-related failures and improving request reliability across the app.',
      'Structured feature modules following Clean Architecture principles with Cubit state management, contributing to a codebase that is easier to test and maintain.',
      'Integrated Firebase Analytics across 12+ key user events, giving the product team actionable data to prioritize feature development and reduce drop-off.',
    ],
  },
];

export const education: Education[] = [
  {
    degree: 'B.Sc. (Hons) Software Engineering & Computer Engineering',
    institution: 'University of Bedfordshire (PCPS College)',
    period: 'Jan 2022 – Dec 2025',
    logoKey: 'pcps',
  },
  {
    degree: 'Higher Secondary (Science)',
    institution: 'Advance Academy',
    period: '2019 – 2021',
    logoKey: 'advance',
  },
];

export const certifications: Certification[] = [
  { name: 'Flutter Bloc — State Management',  issuer: 'Udemy',    year: '2025', category: 'mobile'  },
  { name: 'Introduction to Databases',         issuer: 'Coursera', year: '2024', category: 'backend' },
  { name: 'Algorithmic Toolbox',               issuer: 'Coursera', year: '2024', category: 'cs'      },
];
