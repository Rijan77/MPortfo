export interface PrimarySkill {
  name: string;
  iconKey: string;
  color: string;
  bg: string;
  level: number;
  desc: string;
}

export interface SkillCategory {
  label: string;
  icon: string;
  skills: string[];
}

export const primarySkills: PrimarySkill[] = [
  { name: 'Flutter',   iconKey: 'flutter',   color: '#54C5F8', bg: 'rgba(84,197,248,0.08)',  level: 90, desc: 'Cross-platform mobile apps' },
  { name: 'Dart',      iconKey: 'dart',      color: '#0175C2', bg: 'rgba(1,117,194,0.08)',   level: 88, desc: 'Primary programming language' },
  { name: 'Firebase',  iconKey: 'firebase',  color: '#FFA000', bg: 'rgba(255,160,0,0.08)',   level: 82, desc: 'Auth, Firestore & Analytics'  },
  { name: 'Supabase',  iconKey: 'supabase',  color: '#3ECF8E', bg: 'rgba(62,207,142,0.08)', level: 72, desc: 'PostgreSQL backend & APIs'     },
  { name: 'Python',    iconKey: 'python',    color: '#3776AB', bg: 'rgba(55,118,171,0.08)', level: 70, desc: 'Scripting & FastAPI backend'   },
  { name: 'FastAPI',   iconKey: 'fastapi',   color: '#009688', bg: 'rgba(0,150,136,0.08)',  level: 65, desc: 'RESTful API development'       },
];

export const skillCategories: SkillCategory[] = [
  {
    label: 'Databases',
    icon: '▦',
    skills: ['Firestore', 'SQLite', 'MySQL', 'MSSQL'],
  },
  {
    label: 'Dev Tools',
    icon: '⚙',
    skills: ['Git', 'GitHub', 'Jira', 'ClickUp', 'VS Code', 'Android Studio'],
  },
  {
    label: 'Architecture & Concepts',
    icon: '◈',
    skills: ['Clean Architecture', 'Cubit / Bloc', 'REST API Integration', 'Agile / Scrum', 'State Management', 'Networking'],
  },
];
