// UI copy for both languages. Content data (bio, projects, etc.) lives in
// src/data/*.js as { en, th } objects and is resolved with pick().
export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      blog: 'Blog',
      skills: 'Skills',
      contact: 'Contact',
    },
    home: {
      greeting: "Hi, I'm",
      viewWork: 'View My Work',
      readBlog: 'Read My Blog',
      whatIDo: 'What I Do',
      featuredProjects: 'Featured Projects',
      viewAll: 'View all',
      latestBlog: 'Latest from the Blog',
    },
    about: {
      title: 'About Me',
      journey: 'My Journey',
      education: 'Education',
      interests: 'Interests',
    },
    projects: {
      title: 'Projects',
      description: "A selection of projects I've worked on.",
      all: 'All',
      viewProject: 'View Project',
    },
    blog: {
      title: 'Blog',
      description: 'Thoughts on technology, business, and everything I learn along the way.',
      searchPlaceholder: 'Search posts...',
      noResults: 'No posts match your search.',
      minRead: 'min read',
      all: 'All',
    },
    blogPost: {
      back: 'Back to Blog',
      toc: 'Table of Contents',
      tags: 'Tags',
      share: 'Share this post',
      englishOnly: 'This post isn’t available in Thai yet — showing the English version.',
    },
    skills: {
      title: 'Skills & Tools',
      description: 'Technologies and tools I use to build and solve problems.',
      groups: {
        languages: 'Languages',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Tools & Others',
      },
    },
    contact: {
      title: 'Contact Me',
      description: "I'm open to new opportunities and collaborations. Feel free to connect!",
      email: 'Email',
      location: 'Location',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      subjectPlaceholder: 'Subject',
      messagePlaceholder: 'Message',
      send: 'Send Message',
    },
    notFound: {
      title: 'Page not found',
      description: "The page you're looking for doesn't exist.",
      backHome: 'Back to Home',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    common: {
      switchLanguage: 'Switch language',
      toggleTheme: 'Toggle color theme',
    },
  },
  th: {
    nav: {
      home: 'หน้าแรก',
      about: 'เกี่ยวกับฉัน',
      projects: 'ผลงาน',
      blog: 'บล็อก',
      skills: 'ทักษะ',
      contact: 'ติดต่อ',
    },
    home: {
      greeting: 'สวัสดี ผม',
      viewWork: 'ดูผลงานของผม',
      readBlog: 'อ่านบล็อกของผม',
      whatIDo: 'สิ่งที่ผมทำ',
      featuredProjects: 'ผลงานเด่น',
      viewAll: 'ดูทั้งหมด',
      latestBlog: 'บทความล่าสุด',
    },
    about: {
      title: 'เกี่ยวกับฉัน',
      journey: 'เส้นทางของผม',
      education: 'การศึกษา',
      interests: 'ความสนใจ',
    },
    projects: {
      title: 'ผลงาน',
      description: 'ผลงานบางส่วนที่ผมเคยทำ',
      all: 'ทั้งหมด',
      viewProject: 'ดูผลงาน',
    },
    blog: {
      title: 'บล็อก',
      description: 'ความคิดเกี่ยวกับเทคโนโลยี ธุรกิจ และทุกสิ่งที่ผมได้เรียนรู้ระหว่างทาง',
      searchPlaceholder: 'ค้นหาบทความ...',
      noResults: 'ไม่พบบทความที่ตรงกับการค้นหา',
      minRead: 'นาทีในการอ่าน',
      all: 'ทั้งหมด',
    },
    blogPost: {
      back: 'กลับไปที่บล็อก',
      toc: 'สารบัญ',
      tags: 'แท็ก',
      share: 'แชร์บทความนี้',
      englishOnly: 'บทความนี้ยังไม่มีฉบับภาษาไทย — กำลังแสดงฉบับภาษาอังกฤษ',
    },
    skills: {
      title: 'ทักษะและเครื่องมือ',
      description: 'เทคโนโลยีและเครื่องมือที่ผมใช้สร้างสรรค์และแก้ไขปัญหา',
      groups: {
        languages: 'ภาษาโปรแกรม',
        frontend: 'ฟรอนต์เอนด์',
        backend: 'แบ็กเอนด์',
        tools: 'เครื่องมืออื่นๆ',
      },
    },
    contact: {
      title: 'ติดต่อฉัน',
      description: 'ผมยินดีรับโอกาสใหม่ๆ และความร่วมมือ ติดต่อมาได้เลยครับ',
      email: 'อีเมล',
      location: 'ที่อยู่',
      namePlaceholder: 'ชื่อของคุณ',
      emailPlaceholder: 'อีเมลของคุณ',
      subjectPlaceholder: 'หัวข้อ',
      messagePlaceholder: 'ข้อความ',
      send: 'ส่งข้อความ',
    },
    notFound: {
      title: 'ไม่พบหน้านี้',
      description: 'หน้าที่คุณกำลังมองหาไม่มีอยู่',
      backHome: 'กลับหน้าแรก',
    },
    footer: {
      rights: 'สงวนลิขสิทธิ์',
    },
    common: {
      switchLanguage: 'เปลี่ยนภาษา',
      toggleTheme: 'สลับธีมสี',
    },
  },
}

// Resolves a bilingual data field ({ en, th }) for the active language,
// falling back to English, and passing plain (non-bilingual) values through.
export function pick(field, lang) {
  if (field && typeof field === 'object' && !Array.isArray(field) && ('en' in field || 'th' in field)) {
    return field[lang] ?? field.en
  }
  return field
}
