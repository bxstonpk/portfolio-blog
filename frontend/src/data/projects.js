// Edit this list to showcase your own projects. `description` supports
// { en, th }; `categories` are canonical keys used for filtering — add a
// display label for new ones in CATEGORY_LABELS below.
export const projects = [
  {
    slug: 'pr-online-system',
    title: 'PR Online System',
    description: {
      en: 'Purchase request system with approval flow and accounting system integration.',
      th: 'ระบบขอซื้อออนไลน์ พร้อมขั้นตอนอนุมัติและเชื่อมต่อกับระบบบัญชี',
    },
    tags: ['Golang', 'React', 'MySQL'],
    categories: ['Web Application', 'Automation'],
    link: '#',
    blogSlug: 'building-a-pr-online-system-with-golang-and-react',
  },
  {
    slug: 'hr-automation-system',
    title: 'HR Automation System',
    description: {
      en: 'Automated HR workflows and notifications to reduce manual work for 400+ employees.',
      th: 'ทำให้กระบวนการและการแจ้งเตือนของฝ่าย HR เป็นระบบอัตโนมัติ ลดงานที่ต้องทำด้วยมือให้พนักงานกว่า 400 คน',
    },
    tags: ['Python', 'Flask', 'MySQL'],
    categories: ['Automation'],
    link: '#',
    blogSlug: 'automating-hr-processes-with-web-apps',
  },
  {
    slug: 'forecasting-dashboard',
    title: 'Forecasting Dashboard',
    description: {
      en: 'Demand forecasting and visualization dashboard for production planning.',
      th: 'แดชบอร์ดพยากรณ์ความต้องการและแสดงผลข้อมูลสำหรับวางแผนการผลิต',
    },
    tags: ['Python', 'Pandas', 'Plotly'],
    categories: ['Data'],
    link: '#',
    blogSlug: 'forecasting-in-manufacturing-my-approach',
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    description: {
      en: 'My personal portfolio and blog, built with React, Vite, and Tailwind CSS.',
      th: 'เว็บพอร์ตโฟลิโอและบล็อกส่วนตัวของผม สร้างด้วย React, Vite และ Tailwind CSS',
    },
    tags: ['React', 'Tailwind CSS', 'Vite'],
    categories: ['Web Application'],
    link: '#',
  },
]

const CATEGORY_LABELS = {
  'Web Application': { en: 'Web Application', th: 'เว็บแอปพลิเคชัน' },
  Automation: { en: 'Automation', th: 'ระบบอัตโนมัติ' },
  Data: { en: 'Data', th: 'ข้อมูล' },
}

export function getProjectCategories() {
  return Array.from(new Set(projects.flatMap((p) => p.categories)))
}

export function getProjectCategoryLabel(category, lang) {
  return CATEGORY_LABELS[category]?.[lang] ?? category
}
