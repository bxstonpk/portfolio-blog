// Central place to customize the site — edit this file with your own info.
// Fields that should support both languages use { en, th } objects, resolved
// with pick() from src/i18n/translations.js. Plain strings (name, links,
// email) are shown as-is in both languages.
export const site = {
  name: 'Prasit Krongmaroeng',
  initials: 'PK',
  role: {
    en: 'Business Analyst • Software Engineer • Problem Solver',
    th: 'นักวิเคราะห์ธุรกิจ • วิศวกรซอฟต์แวร์ • นักแก้ปัญหา',
  },
  tagline: {
    en: 'I build digital solutions that improve business processes and create value through data and automation.',
    th: 'ผมสร้างโซลูชันดิจิทัลที่ช่วยพัฒนากระบวนการทางธุรกิจและสร้างคุณค่าผ่านข้อมูลและระบบอัตโนมัติ',
  },
  bio: {
    en: [
      "I'm a Business Analyst and Software Engineer with a background in accounting and a strong passion for process improvement.",
      'I enjoy solving complex problems, automating tasks, and turning ideas into practical business value.',
    ],
    th: [
      'ผมเป็นนักวิเคราะห์ธุรกิจและวิศวกรซอฟต์แวร์ที่มีพื้นฐานด้านบัญชี และมีความหลงใหลในการพัฒนากระบวนการทำงานอย่างมาก',
      'ผมชอบแก้ปัญหาที่ซับซ้อน ทำงานอัตโนมัติ และเปลี่ยนไอเดียให้กลายเป็นคุณค่าทางธุรกิจที่จับต้องได้',
    ],
  },
  location: { en: 'Bangkok, Thailand', th: 'กรุงเทพฯ ประเทศไทย' },
  email: 'p.krongmaaroeng@gmail.com',
  github: 'https://github.com/bxstonpk',
  linkedin: 'https://www.linkedin.com/in/prasit-krongmaroeng-735a2426a',
  twitter: '',
}

export const whatIDo = [
  {
    icon: 'business',
    title: { en: 'Business Analysis', th: 'การวิเคราะห์ธุรกิจ' },
    description: {
      en: 'Gather requirements, analyze processes, and design solutions that drive impact.',
      th: 'รวบรวมความต้องการ วิเคราะห์กระบวนการ และออกแบบโซลูชันที่สร้างผลกระทบ',
    },
  },
  {
    icon: 'code',
    title: { en: 'Software Development', th: 'การพัฒนาซอฟต์แวร์' },
    description: {
      en: 'Build web applications and automation tools with modern technologies.',
      th: 'สร้างเว็บแอปพลิเคชันและเครื่องมืออัตโนมัติด้วยเทคโนโลยีที่ทันสมัย',
    },
  },
  {
    icon: 'data',
    title: { en: 'Data & Forecasting', th: 'ข้อมูลและการพยากรณ์' },
    description: {
      en: 'Forecast demand, analyze data, and support business decision-making.',
      th: 'พยากรณ์ความต้องการ วิเคราะห์ข้อมูล และสนับสนุนการตัดสินใจทางธุรกิจ',
    },
  },
  {
    icon: 'process',
    title: { en: 'Process Improvement', th: 'การปรับปรุงกระบวนการ' },
    description: {
      en: 'Streamline workflows and increase efficiency through digital transformation.',
      th: 'ปรับปรุงขั้นตอนการทำงานให้มีประสิทธิภาพมากขึ้นด้วยการเปลี่ยนผ่านสู่ดิจิทัล',
    },
  },
]

export const journey = [
  {
    year: '2019',
    title: { en: 'Accounting', th: 'งานบัญชี' },
    description: { en: 'Cost & Financial Analysis', th: 'วิเคราะห์ต้นทุนและการเงิน' },
  },
  {
    year: '2021',
    title: { en: 'Business Analyst', th: 'นักวิเคราะห์ธุรกิจ' },
    description: { en: 'Process Improvement & Automation', th: 'ปรับปรุงกระบวนการและระบบอัตโนมัติ' },
  },
  {
    year: '2023',
    title: { en: 'Software Developer', th: 'นักพัฒนาซอฟต์แวร์' },
    description: { en: 'Full-stack & System Development', th: 'พัฒนาระบบแบบฟูลสแตก' },
  },
  {
    year: { en: 'Now', th: 'ปัจจุบัน' },
    title: { en: 'Continuous Learning', th: 'เรียนรู้อย่างต่อเนื่อง' },
    description: { en: 'AI, Cloud & New Technologies', th: 'AI, Cloud และเทคโนโลยีใหม่ๆ' },
  },
]

export const education = [
  {
    en: "Master's Degree in Computer Engineering (In Progress)\nDhurakij Pundit University, Thailand",
    th: 'ปริญญาโท วิศวกรรมคอมพิวเตอร์ (กำลังศึกษา)\nมหาวิทยาลัยธุรกิจบัณฑิตย์',
  },
  {
    en: "Bachelor's Degree in Computer Engineering\nSoutheast Asia University, Thailand",
    th: 'ปริญญาตรี วิศวกรรมคอมพิวเตอร์\nมหาวิทยาลัยเอเชียอาคเนย์',
  },
  {
    en: 'Certifications: AI ML IoT',
    th: 'ใบรับรอง: AI ML IoT',
  },
]

export const interests = [
  { en: 'AI / Machine Learning', th: 'AI / แมชชีนเลิร์นนิง' },
  { en: 'Automation', th: 'ระบบอัตโนมัติ' },
  { en: 'Data Analytics', th: 'การวิเคราะห์ข้อมูล' },
  { en: 'Cloud Computing', th: 'คลาวด์คอมพิวติ้ง' },
  { en: 'UI/UX Design', th: 'ออกแบบ UI/UX' },
  { en: 'Travel & Photography', th: 'ท่องเที่ยวและถ่ายภาพ' },
]
