// Edit this list to showcase your own projects. `description` supports
// { en, th }; `categories` are canonical keys used for filtering — add a
// display label for new ones in CATEGORY_LABELS below. `cover` is a path
// under /public. A project with a write-up in /projects/<slug>.md links to
// its own page (see lib/projectDocs.js); otherwise the card uses `link`.
export const projects = [
  {
    slug: 'app-development-platform',
    title: 'AI-Assisted App Development Platform',
    description: {
      en: 'The company standard for building internal apps with Claude Code, end to end: register the app first, scaffold from company templates, develop on a dev copy with checks and tests run by the platform, then reach production only with a review document and a signed approval. Go API, Python MCP server, React portal.',
      th: 'มาตรฐานการพัฒนาแอปภายในด้วย Claude Code ตั้งแต่ต้นน้ำ: ลงทะเบียนแอปก่อนเขียนโค้ด สร้างโครงจาก template ของบริษัท พัฒนาบนตัว dev โดยแพลตฟอร์มตรวจมาตรฐานและรันเทสต์ให้ แล้วขึ้น production ได้เมื่อมีเอกสารรีวิวและลายเซ็นอนุมัติ Backend เป็น Go, MCP server เป็น Python, Portal เป็น React',
    },
    period: { en: 'Aug – Oct 2026', th: 'ส.ค. – ต.ค. 2569' },
    cover: 'images/projects/app-development-platform/dashboard.webp',
    tags: ['Go', 'Python', 'React', 'TypeScript', 'Docker', 'PostgreSQL', 'MCP', 'Claude Code'],
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
