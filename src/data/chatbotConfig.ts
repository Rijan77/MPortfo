export const SYSTEM_PROMPT = `You are Rijan Acharya, a Flutter developer from Kathmandu, Nepal. Always respond in first person as Rijan himself. Keep answers concise (2–4 sentences), friendly, and professional. Only answer questions about Rijan, his work, skills, and projects — for unrelated topics, politely redirect.

About you:
- Flutter & Dart specialist; cross-platform mobile apps are your main focus
- Currently Software Engineer at Mediisha (Aug 2025–present): production Flutter app for hospital staff to scan barcodes and handle patient documents (prescriptions, insurance claims), integrating REST APIs with an MSSQL-backed Laboratory Information System using Clean Architecture and Cubit
- Previously Mobile App Developer Intern at Diyalo Technology (Feb–Jul 2025): shipped BusSewa app features, full multi-language support (Nepali/English), Firebase Analytics across 12+ events
- Education: B.Sc. (Hons) Software Engineering & Computer Engineering, University of Bedfordshire via PCPS College, Kathmandu (Jan 2022 – Dec 2025)
- Skills: Flutter 90%, Dart 88%, Firebase 82%, Supabase 72%, Python/FastAPI 65–70%; also SQLite, MySQL, MSSQL, Git, Jira, Agile/Scrum
- Architecture patterns: Clean Architecture, Cubit/Bloc state management, REST API integration
- Projects: Furniva (AR furniture shopping — Flutter/Firebase), CleanLoop (waste management gamification — Flutter/Firebase), SkyBook (flight booking with Aviation Stack API — Flutter/Firebase)
- GitHub: github.com/Rijan77
- Email: rijanacharya73@gmail.com
- Resume: available at /resume.pdf on this portfolio
- Open to new opportunities and remote collaborations worldwide`;

export interface FaqEntry {
  id: string;
  patterns: RegExp[];
  response: string;
  followUps?: string[];
}

export const WELCOME_MESSAGE =
  "Hey there! I'm Rijan. Ask me anything about my skills, projects, or experience — or pick a topic below.";

export const QUICK_REPLIES = ['Who is Rijan?', 'Skills & Tech', 'Projects', 'Experience', 'Contact'];

export const UNKNOWN_RESPONSE =
  "I'm not sure about that one. Feel free to reach out directly — rijanacharya73@gmail.com — or browse the site for more.";

export const FAQ: FaqEntry[] = [
  {
    id: 'intro',
    patterns: [
      /who (are|is) (you|rijan)/i,
      /tell me about (you|yourself|rijan)/i,
      /introduce yourself/i,
      /who (are you|am i talking to)/i,
      /about (you|rijan)/i,
      /rijan\??$/i,
    ],
    response:
      "I'm Rijan Acharya, a Flutter developer based in Kathmandu, Nepal. I specialize in building cross-platform mobile apps with Flutter & Dart, and I'm currently working as a Software Engineer at Mediisha, where I build hospital management software.\n\nI have hands-on experience with Firebase, Clean Architecture, REST API integrations, and Bloc/Cubit state management.",
    followUps: ['Skills & Tech', 'Projects', 'Experience'],
  },
  {
    id: 'skills',
    patterns: [
      /skill/i,
      /tech(nolog|nique|stack)?/i,
      /what (can you|do you) (do|know|use|build)/i,
      /what (are|is) (your|rijan'?s?) (tech|skills?|stack)/i,
      /programming/i,
      /languages?/i,
      /stack/i,
    ],
    response:
      "My primary stack:\n\n• Flutter & Dart — 90% proficiency, cross-platform mobile apps\n• Firebase — Auth, Firestore, Analytics\n• Supabase — PostgreSQL backend\n• Python & FastAPI — scripting and REST APIs\n\nI also work with Clean Architecture, Cubit/Bloc state management, REST API integration, and databases like SQLite, MySQL, and MSSQL.",
    followUps: ['Projects', 'Experience', 'Contact'],
  },
  {
    id: 'projects',
    patterns: [
      /project/i,
      /what (have you|did you) (built|made|created|worked on)/i,
      /show me (your|rijan'?s?) work/i,
      /portfolio work/i,
    ],
    response:
      "Here are my main projects:\n\n1. Furniva — AR-based furniture shopping app that lets users place 3D models in their real space. Built with Flutter & Firebase.\n\n2. CleanLoop — Smart waste management app with gamification, recycling guides, and real-time pickup scheduling. Built with Flutter & Firebase.\n\n3. SkyBook — Full-featured flight search & booking app using the Aviation Stack API for live data. Built with Flutter & Firebase.\n\nYou can explore all of them at /projects on this site.",
    followUps: ['Furniva', 'CleanLoop', 'SkyBook'],
  },
  {
    id: 'furniva',
    patterns: [/furniva/i, /ar.?furniture/i, /furniture app/i, /augmented reality/i],
    response:
      "Furniva is an AR-based furniture shopping app I built with Flutter & Firebase. It lets users browse products and visualize 3D furniture in their real physical space before buying — reducing returns and improving buyer confidence.\n\nGitHub: github.com/Rijan77/furniva",
    followUps: ['CleanLoop', 'SkyBook', 'Skills & Tech'],
  },
  {
    id: 'cleanloop',
    patterns: [/cleanloop|clean.?loop/i, /waste.?management/i, /recycling app/i],
    response:
      "CleanLoop is a community-driven waste management app that makes recycling engaging through gamification. Features include waste tracking, recycling guides, pickup scheduling, and real-time notifications that reward eco-friendly habits.\n\nGitHub: github.com/Rijan77/CleanLooop_",
    followUps: ['Furniva', 'SkyBook', 'Skills & Tech'],
  },
  {
    id: 'skybook',
    patterns: [/skybook|sky.?book/i, /flight.?(app|booking|search|tracker)/i],
    response:
      "SkyBook is a full-featured flight search and booking app. It uses the Aviation Stack API for real-time flight data, supports live tracking, and integrates Firebase for auth and data persistence.\n\nGitHub: github.com/Rijan77/flight-tracker\nDemo: youtube.com/shorts/uqAD8SORLh0",
    followUps: ['Furniva', 'CleanLoop', 'Skills & Tech'],
  },
  {
    id: 'experience',
    patterns: [
      /experience/i,
      /work(ed)? (at|for)/i,
      /\bjob\b/i,
      /employ(ed|ment)/i,
      /career/i,
      /where (do you|have you) work/i,
      /current(ly)? (work|role)/i,
    ],
    response:
      "Current role:\n\nSoftware Engineer @ Mediisha (Aug 2025 – Present)\nBuilding a production Flutter app for hospital staff to scan barcodes and manage patient documents for insurance claim submissions. I integrate REST APIs with a MSSQL-backed Laboratory Information System.\n\nPrevious:\n\nMobile App Developer Intern @ Diyalo Technology (Feb–Jul 2025)\nShipped homepage features for the BusSewa app, implemented full multi-language support (Nepali/English), and integrated Firebase Analytics across 12+ key user events.",
    followUps: ['Skills & Tech', 'Projects', 'Contact'],
  },
  {
    id: 'education',
    patterns: [
      /education/i,
      /degree/i,
      /university|college|school/i,
      /stud(y|ied|ying)/i,
      /qualification/i,
      /certification/i,
    ],
    response:
      "I'm completing a B.Sc. (Hons) in Software Engineering & Computer Engineering at the University of Bedfordshire via PCPS College, Kathmandu (Jan 2022 – Dec 2025).\n\nCertifications:\n• Flutter Bloc State Management — Udemy (2025)\n• Introduction to Databases — Coursera (2024)\n• Algorithmic Toolbox — Coursera (2024)",
    followUps: ['Experience', 'Skills & Tech'],
  },
  {
    id: 'contact',
    patterns: [
      /contact/i,
      /\bemail\b/i,
      /reach (you|rijan)/i,
      /\bhire\b/i,
      /available/i,
      /get in touch/i,
      /talk to (you|rijan)/i,
      /how (can i|do i) (contact|reach)/i,
    ],
    response:
      "You can reach me at:\n\nEmail: rijanacharya73@gmail.com\n\nOr use the Contact page on this site — I usually respond within a day. I'm open to new opportunities and collaborations!",
    followUps: ['Projects', 'Experience'],
  },
  {
    id: 'resume',
    patterns: [/resume|cv\b|curriculum vitae/i, /download.*resume/i],
    response:
      "You can download my resume directly from this site at /resume.pdf, or click the Resume button in the navigation bar.",
    followUps: ['Experience', 'Contact'],
  },
  {
    id: 'location',
    patterns: [/where (are you|is rijan|do you live)/i, /\blocation\b/i, /kathmandu|nepal/i, /country|city/i, /based/i],
    response:
      "I'm based in Kathmandu, Nepal. I'm open to remote work and collaborations worldwide.",
    followUps: ['Contact', 'Experience'],
  },
  {
    id: 'github',
    patterns: [/github/i, /repositor(y|ies)|repo/i, /open.?source/i],
    response:
      "All my public projects are on GitHub at github.com/Rijan77. You'll find Furniva, CleanLoop, SkyBook, and more there.",
    followUps: ['Projects'],
  },
];
