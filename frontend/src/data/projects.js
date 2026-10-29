// Edit this list to showcase your own projects. `description` supports
// { en, th }; `categories` are canonical keys used for filtering — add a
// display label for new ones in CATEGORY_LABELS below. `cover` is a path
// under /public. A project with a write-up in /projects/<slug>.md links to
// its own page (see lib/projectDocs.js); otherwise the card uses `link`.
export const projects = [
  {
    slug: 'self-deployment-platform',
    title: 'Self-Service Deployment Platform',
    description: {
      en: 'An internal platform where employees deploy the apps they build with Claude Code themselves: an MCP server and skill for Claude, a Go API that builds, scans, and runs apps on Docker, signed production approvals, and an admin portal. Runs on one on-prem host.',
      th: 'แพลตฟอร์มภายในให้พนักงาน deploy แอปที่สร้างด้วย Claude Code ได้เอง มี MCP server และ skill สำหรับ Claude, API ภาษา Go ที่ build สแกน และรันแอปบน Docker, การอนุมัติ production ด้วยลายเซ็นดิจิทัล และ Admin Portal รันบน server ในองค์กรเครื่องเดียว',
    },
    period: { en: 'Aug – Oct 2026', th: 'ส.ค. – ต.ค. 2569' },
    cover: 'images/projects/self-deployment-platform/dashboard.webp',
    tags: ['Go', 'Python', 'React', 'TypeScript', 'Docker', 'PostgreSQL', 'MCP'],
    categories: ['Web Application', 'DevOps'],
    link: '#',
  },
  {
    slug: 'tank-monitoring-iot',
    title: 'Tank Monitoring IoT Platform',
    description: {
      en: 'Real-time monitoring for a fish-oil plant: 14 level and flow sensors over MQTT, stored in InfluxDB, shown as dashboards, alarms, and a 3D plant view. Go backend, React frontend, deployed with Docker Compose and GitHub Actions.',
      th: 'ระบบติดตามโรงงานน้ำมันปลาแบบเรียลไทม์ รับค่าระดับและอัตราการไหลจากเซนเซอร์ 14 จุดผ่าน MQTT เก็บใน InfluxDB แสดงเป็นแดชบอร์ด การแจ้งเตือน และมุมมองโรงงาน 3D Backend เป็น Go, Frontend เป็น React, deploy ด้วย Docker Compose และ GitHub Actions',
    },
    period: { en: 'Sep – Oct 2026', th: 'ก.ย. – ต.ค. 2569' },
    cover: 'images/projects/tank-monitoring-iot/plant-view.webp',
    tags: ['Go', 'React', 'TypeScript', 'MQTT', 'PostgreSQL', 'InfluxDB', 'Docker'],
    categories: ['Web Application', 'IoT'],
    link: '#',
  },
  {
    slug: 'vector-search-benchmark',
    title: 'Vector Search Benchmark',
    description: {
      en: 'Course research project: when does approximate vector search (IVF-Flat, HNSW) beat exact search (Flat) once index build time is counted? Measured with FAISS on CPU at 10k–1M vectors and 384/768 dimensions, then applied to a marketing-analysis demo on product reviews.',
      th: 'โปรเจกต์วิจัยในรายวิชา: การค้นหาเวกเตอร์แบบประมาณ (IVF-Flat, HNSW) คุ้มกว่าการค้นหาแบบ exact (Flat) เมื่อไร ถ้านับเวลาสร้าง index ด้วย วัดด้วย FAISS บน CPU ที่ 10k–1M เวกเตอร์ 384/768 มิติ แล้วนำไปประยุกต์ทำเดโมวิเคราะห์รีวิวสินค้าเชิงการตลาด',
    },
    period: { en: 'Oct 2026', th: 'ต.ค. 2569' },
    cover: 'images/projects/vector-search-benchmark/total-time-1m.webp',
    tags: ['Python', 'FAISS', 'NumPy', 'scikit-learn', 'Jupyter'],
    categories: ['Data'],
    link: '#',
  },
]

const CATEGORY_LABELS = {
  'Web Application': { en: 'Web Application', th: 'เว็บแอปพลิเคชัน' },
  Data: { en: 'Data', th: 'ข้อมูล' },
  IoT: { en: 'IoT', th: 'IoT' },
  DevOps: { en: 'DevOps', th: 'DevOps' },
}

export function getProjectCategories() {
  return Array.from(new Set(projects.flatMap((p) => p.categories)))
}

export function getProjectCategoryLabel(category, lang) {
  return CATEGORY_LABELS[category]?.[lang] ?? category
}
