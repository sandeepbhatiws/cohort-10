export const COLUMNS = [
  { id: 'todo', title: 'To Do', dot: 'bg-slate-400', bar: 'from-slate-400 to-slate-300' },
  { id: 'inprogress', title: 'In Progress', dot: 'bg-indigo-500', bar: 'from-indigo-500 to-violet-400' },
  { id: 'review', title: 'In Review', dot: 'bg-amber-500', bar: 'from-amber-500 to-orange-400' },
  { id: 'done', title: 'Done', dot: 'bg-emerald-500', bar: 'from-emerald-500 to-teal-400' },
]

export const PRIORITIES = {
  low: {
    label: 'Low',
    chip: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
    chipActive: 'bg-emerald-100 text-emerald-700 ring-emerald-300',
    edge: 'bg-emerald-400',
  },
  medium: {
    label: 'Medium',
    chip: 'bg-amber-50 text-amber-600 ring-amber-200',
    chipActive: 'bg-amber-100 text-amber-700 ring-amber-300',
    edge: 'bg-amber-400',
  },
  high: {
    label: 'High',
    chip: 'bg-rose-50 text-rose-600 ring-rose-200',
    chipActive: 'bg-rose-100 text-rose-700 ring-rose-300',
    edge: 'bg-rose-500',
  },
}

export const AVATAR_COLORS = [
  'bg-indigo-500', 'bg-fuchsia-500', 'bg-emerald-500', 'bg-amber-500', 'bg-sky-500', 'bg-rose-500',
]

export const avatarColor = (name = '') => {
  const code = name.charCodeAt(0) || 0
  return AVATAR_COLORS[code % AVATAR_COLORS.length]
}

export const initials = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?'

export const SEED_TASKS = [
  {
    id: 't1',
    title: 'Design landing page hero section',
    description: 'Create a modern hero section with gradient background, headline, CTA button and product illustration.',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-08-28',
    assignee: 'Ananya Rao',
    tags: ['Design', 'UI'],
    comments: 3,
    attachments: 2,
  },
  {
    id: 't2',
    title: 'Set up project repository',
    description: 'Initialize Git repo, add README, configure ESLint and Prettier for the team.',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-08-26',
    assignee: 'Rohit Sharma',
    tags: ['Setup'],
    comments: 0,
    attachments: 0,
  },
  {
    id: 't3',
    title: 'Build authentication flow',
    description: 'Implement login, signup and forgot password screens with form validation.',
    status: 'inprogress',
    priority: 'high',
    dueDate: '2026-08-30',
    assignee: 'Himanshu Bhati',
    tags: ['Frontend', 'Auth'],
    comments: 5,
    attachments: 1,
  },
  {
    id: 't4',
    title: 'API integration for tasks module',
    description: 'Connect task CRUD endpoints and handle loading/error states across the board.',
    status: 'inprogress',
    priority: 'medium',
    dueDate: '2026-09-02',
    assignee: 'Priya Menon',
    tags: ['Backend'],
    comments: 2,
    attachments: 0,
  },
  {
    id: 't5',
    title: 'Write unit tests for utils',
    description: 'Add Jest test coverage for date formatting and validation helper functions.',
    status: 'review',
    priority: 'medium',
    dueDate: '2026-08-27',
    assignee: 'Karan Verma',
    tags: ['Testing'],
    comments: 1,
    attachments: 0,
  },
  {
    id: 't6',
    title: 'Accessibility audit',
    description: 'Run Lighthouse and axe audits, fix contrast and keyboard navigation issues.',
    status: 'review',
    priority: 'low',
    dueDate: '2026-09-01',
    assignee: 'Ananya Rao',
    tags: ['A11y'],
    comments: 0,
    attachments: 1,
  },
  {
    id: 't7',
    title: 'Wireframe user onboarding',
    description: 'Sketch low-fidelity wireframes for the first-time user onboarding experience.',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-08-20',
    assignee: 'Rohit Sharma',
    tags: ['Design'],
    comments: 4,
    attachments: 3,
  },
  {
    id: 't8',
    title: 'Deploy staging environment',
    description: 'Set up CI/CD pipeline and deploy the app to a staging server for QA.',
    status: 'done',
    priority: 'high',
    dueDate: '2026-08-18',
    assignee: 'Himanshu Bhati',
    tags: ['DevOps'],
    comments: 2,
    attachments: 0,
  },
]
