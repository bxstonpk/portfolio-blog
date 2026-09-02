// Edit this list to showcase your own projects.
export const projects = [
  {
    slug: 'pr-online-system',
    title: 'PR Online System',
    description: 'Purchase request system with approval flow and accounting system integration.',
    tags: ['Golang', 'React', 'MySQL'],
    categories: ['Web Application', 'Automation'],
    link: '#',
    blogSlug: 'building-a-pr-online-system-with-golang-and-react',
  },
  {
    slug: 'hr-automation-system',
    title: 'HR Automation System',
    description: 'Automated HR workflows and notifications to reduce manual work for 400+ employees.',
    tags: ['Python', 'Flask', 'MySQL'],
    categories: ['Automation'],
    link: '#',
    blogSlug: 'automating-hr-processes-with-web-apps',
  },
  {
    slug: 'forecasting-dashboard',
    title: 'Forecasting Dashboard',
    description: 'Demand forecasting and visualization dashboard for production planning.',
    tags: ['Python', 'Pandas', 'Plotly'],
    categories: ['Data'],
    link: '#',
    blogSlug: 'forecasting-in-manufacturing-my-approach',
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'My personal portfolio and blog, built with React, Vite, and Tailwind CSS.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    categories: ['Web Application'],
    link: '#',
  },
]

export function getProjectCategories() {
  return ['All', ...Array.from(new Set(projects.flatMap((p) => p.categories)))]
}
