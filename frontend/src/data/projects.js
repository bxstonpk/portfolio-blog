// Edit this list to showcase your own projects. `description` supports
// { en, th }; `categories` are canonical keys used for filtering — add a
// display label for new ones in CATEGORY_LABELS below.
export const projects = [
  {
    slug: 'tank-monitoring-iot',
    title: 'Tank Monitoring IoT Platform',
    description: {
      en: 'Real-time monitoring for 9 tanks in a fish-oil plant: level and flow sensors over MQTT, stored in InfluxDB, shown as dashboards with trend charts, alarms, and a 3D plant view. Go backend (API + MQTT ingestor) with JWT and role-based access, deployed with Docker Compose and GitHub Actions. The field gateway is tested with simulated data only so far.',
      th: 'ระบบติดตามถัง 9 ถังในโรงงานน้ำมันปลาแบบเรียลไทม์ รับค่าระดับและอัตราการไหลผ่าน MQTT เก็บใน InfluxDB แสดงเป็นแดชบอร์ด กราฟแนวโน้ม การแจ้งเตือน และมุมมองโรงงาน 3D Backend เป็น Go (API + ตัวรับข้อมูล MQTT) มี JWT และสิทธิ์ตามบทบาท deploy ด้วย Docker Compose และ GitHub Actions ส่วน gateway หน้างานยังทดสอบกับข้อมูลจำลองเท่านั้น',
    },
    tags: ['Go', 'React', 'TypeScript', 'MQTT', 'PostgreSQL', 'InfluxDB', 'Docker'],
    categories: ['Web Application', 'IoT'],
    link: '#',
  },
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
    slug: 'vector-search-benchmark',
    title: 'Vector Search Benchmark',
    description: {
      en: 'Course research project on when approximate vector search (IVF-Flat, HNSW) beats exact search (Flat) once index build time is counted. 10k–1M vectors at 384/768 dimensions on CPU, run on one laptop: 103 of 108 jobs completed.',
      th: 'โปรเจกต์วิจัยในรายวิชา ศึกษาว่าการค้นหาเวกเตอร์แบบประมาณ (IVF-Flat, HNSW) คุ้มกว่าการค้นหาแบบ exact (Flat) เมื่อไร โดยนับเวลาสร้าง index ด้วย ทดสอบ 10k–1M เวกเตอร์ ที่ 384/768 มิติบน CPU รันบนโน้ตบุ๊ก 1 เครื่อง สำเร็จ 103 จาก 108 งาน',
    },
    tags: ['Python', 'FAISS', 'NumPy', 'Jupyter'],
    categories: ['Data'],
    link: '#',
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
  IoT: { en: 'IoT', th: 'IoT' },
}

export function getProjectCategories() {
  return Array.from(new Set(projects.flatMap((p) => p.categories)))
}

export function getProjectCategoryLabel(category, lang) {
  return CATEGORY_LABELS[category]?.[lang] ?? category
}
