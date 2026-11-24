import { L, type Localized } from "../lib/locale";

export type ProjectCategory = "Web App" | "E-Commerce" | "Game";

export interface ProjectImage {
  src: string;
  alt: string;
  caption: Localized;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  role: Localized;
  summary: Localized;
  description: Localized[];
  tags: string[];
  cover: string;
  coverFit?: "contain" | "cover";
  gallery: ProjectImage[];
  accent: string;
  featured?: boolean;
}

export interface Certificate {
  id: string;
  title: Localized;
  issuer: Localized;
  year: string;
  type: "image" | "pdf";
  file: string;
  gallery?: string[];
  description: Localized;
  credential?: string;
}

// TODO: aktifkan lagi setelah email, WhatsApp, dan CV versi profesional siap.
export const contactVisibility = {
  showEmail: false,
  showWhatsapp: false,
  showCv: false,
  placeholder: "-",
} as const;

export const profile = {
  name: "Rezya Indy Saputra",
  shortName: "Rezya",
  handle: "rezy___a",
  role: "Web Developer",
  location: "Indonesia",
  email: "rezyaindisaputra@gmail.com",
  phone: "+62 821 3542 3599",
  whatsapp: "https://wa.me/6282135423599",
  instagram: "https://www.instagram.com/rezy___a/",
  github: "https://github.com/Blank-MC",
  cv: "/Rezya-Indy-Saputra-CV.pdf",
  bio: L(
    "Saya membangun pengalaman web yang cepat, interaktif, dan punya karakter. Dari antarmuka yang rapi sampai detail animasi yang bikin produk terasa hidup.",
    "I build fast, interactive web experiences with character. From clean interfaces to animation details that make a product feel alive."
  ),
  about: [
    L(
      "Saya adalah web developer muda yang suka membangun sesuatu dari nol. Fokus saya ada pada kualitas antarmuka, struktur kode yang rapi, dan pengalaman pengguna yang terasa natural.",
      "I'm a young web developer who loves building things from scratch. I focus on interface quality, clean code structure, and user experiences that feel natural."
    ),
    L(
      "Perjalanan saya dimulai dari dunia game development, lalu berkembang ke web application, e-commerce, dan kini bereksperimen dengan animasi serta grafis 3D di browser. Saya juga sedang kuliah di Binus jurusan Cybersecurity, yang membuat saya makin peduli pada keamanan dan kualitas sistem yang saya bangun.",
      "My journey started in game development, then grew into web applications, e-commerce, and now experimenting with motion and 3D graphics in the browser. I'm also currently studying Cybersecurity at Binus, which makes me care even more about the security and quality of the systems I build."
    ),
  ],
};

export const stats = [
  { value: 7, suffix: "+", label: L("Project selesai", "Projects completed") },
  { value: 3, suffix: "", label: L("Sertifikat diraih", "Certificates earned") },
  { value: 3, suffix: "+", label: L("Tahun pengalaman", "Years of experience") },
];

export const skills = [
  { name: "HTML", level: 95, group: "Frontend" },
  { name: "CSS", level: 92, group: "Frontend" },
  { name: "JavaScript", level: 88, group: "Frontend" },
  { name: "React", level: 85, group: "Frontend" },
  { name: "Next.js", level: 82, group: "Frontend" },
  { name: "Tailwind CSS", level: 88, group: "Frontend" },
  { name: "TypeScript", level: 76, group: "Frontend" },
  { name: "PHP", level: 80, group: "Backend" },
  { name: "MySQL", level: 78, group: "Backend" },
  { name: "CodeIgniter", level: 72, group: "Backend" },
  { name: "Laravel", level: 70, group: "Backend" },
  { name: "Three.js", level: 68, group: "Creative" },
  { name: "Motion", level: 80, group: "Creative" },
  { name: "Figma / UI Design", level: 75, group: "Creative" },
];

export const experience = [
  {
    period: L("Sep 2025 — Sekarang", "Sep 2025 — Present"),
    title: "Binus University",
    subtitle: L(
      "Cybersecurity · Sarjana Teknik Informatika · Semester 3",
      "Cybersecurity · Bachelor of Informatics · Semester 3"
    ),
    description: L(
      "Mulai 23 September 2025 dan saat ini memasuki semester 3. Fokus belajar di bidang keamanan siber, jaringan, dan praktik keamanan modern — sambil terus membangun proyek web.",
      "Started on 23 September 2025 and currently in semester 3. Focusing on cybersecurity, networks, and modern security practices — while continuing to build web projects."
    ),
    icon: "education" as const,
  },
  {
    period: L("2022 — 2023", "2022 — 2023"),
    title: "SMK Budi Luhur",
    subtitle: L("Rekayasa Perangkat Lunak (RPL)", "Software Engineering (RPL)"),
    description: L(
      "Pendidikan menengah kejuruan dengan fokus pada pengembangan perangkat lunak, basis data, dan praktik kerja tim.",
      "Vocational high school education focused on software development, databases, and teamwork practice."
    ),
    icon: "education" as const,
  },
  {
    period: L("2023", "2023"),
    title: "Web Application Developer",
    subtitle: L("Project sekolah & magang", "School projects & internship"),
    description: L(
      "Membangun aplikasi web dengan panel admin, alur persetujuan, dan pengelolaan konten.",
      "Built web applications with admin panels, approval flows, and content management."
    ),
    icon: "code" as const,
  },
  {
    period: L("2022 — 2023", "2022 — 2023"),
    title: "Web E-Commerce",
    subtitle: L("Project mandiri", "Independent project"),
    description: L(
      "Mendesain dan mengimplementasikan tampilan toko online yang responsif dan mudah digunakan.",
      "Designed and implemented a responsive, easy-to-use online store interface."
    ),
    icon: "briefcase" as const,
  },
  {
    period: L("2022 — 2023", "2022 — 2023"),
    title: "Game Development",
    subtitle: L("Tim Frantic · CCIT Festival", "Frantic Team · CCIT Festival"),
    description: L(
      "Mengembangkan Lost & Found bersama tim dan meraih Juara 3 Lomba Project Competition.",
      "Developed Lost & Found with a team and won 3rd place at the Project Competition."
    ),
    icon: "game" as const,
  },
];

export const projects: Project[] = [
  {
    id: "easycome",
    title: "EasyCome",
    category: "Web App",
    year: "2023",
    role: L("Fullstack Developer", "Fullstack Developer"),
    summary: L(
      "Platform pemesanan venue dengan alur booking, persetujuan admin, dan manajemen profil yang rapi.",
      "Venue booking platform with a clear booking flow, admin approvals, and tidy profile management."
    ),
    description: [
      L(
        "EasyCome adalah aplikasi web untuk memesan tempat atau venue. Saya membangun alur lengkap mulai dari pencarian venue, formulir pemesanan, hingga status booking yang bisa disetujui atau dibatalkan admin.",
        "EasyCome is a web app for booking venues. I built the full flow from browsing venues and submitting bookings to statuses that admins can approve or cancel."
      ),
      L(
        "Fokus utamanya adalah membuat status pemesanan mudah dipahami pengguna, sekaligus memberi panel admin yang ringkas untuk mengelola seluruh transaksi.",
        "The main focus was making booking statuses easy to understand while giving admins a compact panel to manage every transaction."
      ),
    ],
    tags: ["Booking System", "Admin Dashboard", "Approval Flow", "Responsive"],
    cover: "/assets/projects/easycome-dashboard.png",
    accent: "#d8b87c",
    featured: true,
    gallery: [
      { src: "/assets/projects/easycome-dashboard.png", alt: "EasyCome dashboard", caption: L("Dashboard admin dengan ringkasan seluruh aktivitas booking", "Admin dashboard with an overview of all booking activity") },
      { src: "/assets/projects/easycome-home.png", alt: "EasyCome home", caption: L("Halaman utama untuk menjelajahi venue yang tersedia", "Home page for browsing available venues") },
      { src: "/assets/projects/easycome-approve.png", alt: "Booking approval", caption: L("Alur persetujuan pemesanan oleh admin", "Booking approval flow for admins") },
      { src: "/assets/projects/easycome-my-booking.png", alt: "My bookings", caption: L("Riwayat dan status pemesanan pengguna", "User booking history and statuses") },
      { src: "/assets/projects/easycome-add-venue.png", alt: "Add venue", caption: L("Form pengelolaan data venue", "Venue management form") },
      { src: "/assets/projects/easycome-login.png", alt: "Login", caption: L("Autentikasi pengguna", "User authentication") },
    ],
  },
  {
    id: "the-lost-boy",
    title: "The Lost Boy",
    category: "Game",
    year: "2022 — 2023",
    role: L("Game Developer", "Game Developer"),
    summary: L(
      "Prototipe game pertama saya saat kelas 10 — petualangan seorang anak yang tersesat, lalu jadi cikal bakal Lost & Found.",
      "My first game prototype in 10th grade — an adventure about a lost child that later became the seed for Lost & Found."
    ),
    description: [
      L(
        "The Lost Boy dibuat sebagai proyek game saat saya masih kelas 10 di SMK Budi Luhur. Eksperimen ini fokus pada mekanik dasar, level sederhana, dan karakter utama yang sedang mencari jalan pulang.",
        "The Lost Boy was built as a school game project when I was in 10th grade at SMK Budi Luhur. The experiment focused on core mechanics, simple levels, and a main character trying to find his way home."
      ),
      L(
        "Ide dan asetnya kemudian saya bawa ke proyek kelas 11, Lost & Found / Frantic, yang dikembangkan bersama Tim Frantic dan meraih Juara 3 CCIT Festival 2023.",
        "I later carried the ideas and assets into my 11th-grade project, Lost & Found / Frantic, developed with Team Frantic and awarded 3rd place at CCIT Festival 2023."
      ),
    ],
    tags: ["Construct 3", "Game Prototype", "Level Design", "Character"],
    cover: "/assets/projects/the-lost-boy-cover.jpg",
    accent: "#79d6c4",
    gallery: [
      { src: "/assets/projects/the-lost-boy-cover.jpg", alt: "The Lost Boy gameplay", caption: L("Tampilan utama prototipe The Lost Boy", "Main view of The Lost Boy prototype") },
      { src: "/assets/projects/the-lost-boy-early.jpg", alt: "Early concept", caption: L("Konsep awal game kelas 10", "Early 10th-grade game concept") },
      { src: "/assets/projects/the-lost-boy-01.jpg", alt: "Game scene", caption: L("Salah satu adegan dalam game", "One of the scenes in the game") },
      { src: "/assets/projects/the-lost-boy-02.jpg", alt: "Character detail", caption: L("Detail karakter dan visual", "Character and visual details") },
      { src: "/assets/projects/the-lost-boy-03.jpg", alt: "Level design", caption: L("Alur dan rancangan level", "Flow and level layout") },
      { src: "/assets/projects/the-lost-boy-04.jpg", alt: "Game UI", caption: L("Elemen antarmuka dalam game", "In-game interface elements") },
      { src: "/assets/projects/the-lost-boy-05.jpg", alt: "Combo system", caption: L("Mekanik combo yang kemudian dipakai ulang", "Combo mechanic later reused in the sequel") },
    ],
  },
  {
    id: "lost-found",
    title: "Lost & Found",
    category: "Game",
    year: "2023",
    role: L("Game & UI Developer", "Game & UI Developer"),
    summary: L(
      "Aplikasi pelaporan barang hilang dan ditemukan yang dikembangkan sebagai Tim Frantic dan meraih Juara 3 CCIT Festival 2023.",
      "A lost-and-found reporting app developed as Team Frantic, winning 3rd place at CCIT Festival 2023."
    ),
    description: [
      L(
        "Lost & Found membantu pengguna melaporkan barang yang hilang atau ditemukan. Antarmukanya dirancang untuk ponsel sehingga proses pelaporan bisa dilakukan dengan cepat, lengkap dengan riwayat dan ruang chat.",
        "Lost & Found helps users report lost or found items. The mobile-first interface makes reporting quick, with history and a chat room built in."
      ),
      L(
        "Proyek ini juga dikenal dengan nama Frantic saat mengikuti Lomba Project Competition CCIT Festival 2023 bersama Tim Frantic dari SMK Budi Luhur. Kami merancang mekanik, level, dan visualnya, lalu membawa pulang Juara 3.",
        "The project was also known as Frantic during the CCIT Festival 2023 Project Competition with Team Frantic from SMK Budi Luhur. We designed the mechanics, levels, and visuals, and took home 3rd place."
      ),
      L(
        "Lost & Found adalah kelanjutan dari The Lost Boy, prototipe game kelas 10 yang saya bangun sebelumnya. Ide petualangan dan beberapa mekaniknya saya kembangkan ulang sampai menjadi versi kompetisi ini.",
        "Lost & Found continued The Lost Boy, the 10th-grade game prototype I built earlier. I reworked the adventure idea and several mechanics into this competition version."
      ),
    ],
    tags: ["Construct 3", "Mobile UI", "Realtime Chat", "CCIT Festival"],
    cover: "/assets/projects/lost-found-cover.jpg",
    accent: "#e0a96d",
    featured: true,
    gallery: [
      { src: "/assets/projects/lost-found-cover.jpg", alt: "Lost & Found app screens", caption: L("Tampilan aplikasi Lost & Found / Frantic", "App screens of Lost & Found / Frantic") },
      { src: "/assets/projects/lost-found-home.jpg", alt: "Lost & Found home", caption: L("Beranda daftar laporan barang", "Home screen with the list of reports") },
      { src: "/assets/projects/lost-found-chat.jpg", alt: "Lost & Found chat", caption: L("Komunikasi langsung antar pengguna", "Direct communication between users") },
      { src: "/assets/projects/lost-found-history.jpg", alt: "Lost & Found history", caption: L("Riwayat seluruh aktivitas pengguna", "Full activity history for users") },
    ],
  },
  {
    id: "tradisi",
    title: "Tradisi Portal Berita",
    category: "Web App",
    year: "2023",
    role: L("Web Developer", "Web Developer"),
    summary: L(
      "CMS portal berita dengan manajemen artikel, kategori, organisasi, dan alur kurasi konten.",
      "News portal CMS with article, category, organization, and content curation management."
    ),
    description: [
      L(
        "Tradisi adalah portal berita yang dilengkapi panel pengelolaan konten. Saya membangun halaman untuk membuat artikel, mengatur kategori, mengelola data organisasi, serta proses kurasi.",
        "Tradisi is a news portal with a content management panel. I built pages for writing articles, managing categories and organizations, and curating content."
      ),
      L(
        "Tujuannya membuat redaksi bisa bekerja dengan alur yang jelas dari artikel baru hingga konten yang siap tayang.",
        "The goal was to give editors a clear flow from a new draft to content that's ready to publish."
      ),
    ],
    tags: ["CMS", "Article Manager", "Curation", "Dashboard"],
    cover: "/assets/projects/tradisi-dashboard.png",
    accent: "#d8b87c",
    gallery: [
      { src: "/assets/projects/tradisi-dashboard.png", alt: "News dashboard", caption: L("Ringkasan aktivitas redaksi", "Overview of editorial activity") },
      { src: "/assets/projects/tradisi-editor.png", alt: "Article editor", caption: L("Halaman pembuatan artikel", "Article creation page") },
      { src: "/assets/projects/tradisi-kategori.png", alt: "Categories", caption: L("Pengelolaan kategori berita", "News category management") },
      { src: "/assets/projects/tradisi-kurasi.png", alt: "Curation", caption: L("Alur kurasi konten", "Content curation flow") },
    ],
  },
  {
    id: "perpus",
    title: "Perpustakaan Digital",
    category: "Web App",
    year: "2024",
    role: L("Web Developer", "Web Developer"),
    summary: L(
      "Sistem perpustakaan digital dengan sisi admin dan pengguna, termasuk peminjaman dan favorit.",
      "Digital library system with admin and user sides, including loans and favorites."
    ),
    description: [
      L(
        "Proyek latihan UKK ini menghadirkan dua sisi pengalaman: panel admin untuk mengelola buku, petugas, dan pengguna, serta halaman pengguna untuk menjelajahi koleksi.",
        "This UKK training project has two sides: an admin panel for managing books, staff, and users, plus a user page for browsing the collection."
      ),
      L(
        "Pengguna bisa melihat buku, menyimpan favorit, dan memantau peminjaman, sementara admin mendapatkan kontrol penuh atas data perpustakaan.",
        "Users can browse books, save favorites, and track loans, while admins get full control over library data."
      ),
    ],
    tags: ["Library System", "Admin Panel", "Loans", "Dual Role"],
    cover: "/assets/projects/perpus-dashboard.png",
    accent: "#9bb8e8",
    gallery: [
      { src: "/assets/projects/perpus-dashboard.png", alt: "Library dashboard", caption: L("Dashboard admin", "Admin dashboard") },
      { src: "/assets/projects/perpus-buku.png", alt: "Book data", caption: L("Manajemen koleksi buku", "Book collection management") },
      { src: "/assets/projects/perpus-home.png", alt: "User home", caption: L("Beranda untuk pengguna", "Home page for users") },
      { src: "/assets/projects/perpus-peminjaman.png", alt: "Book loans", caption: L("Pantau status peminjaman", "Track loan statuses") },
      { src: "/assets/projects/perpus-favorite.png", alt: "Favorites", caption: L("Daftar buku favorit", "Favorite books list") },
    ],
  },
  {
    id: "prakerin",
    title: "Portal Artikel Prakerin",
    category: "Web App",
    year: "2023",
    role: L("Web Developer", "Web Developer"),
    summary: L(
      "Portal artikel responsif dengan halaman depan, daftar artikel, dan tampilan pembacaan yang nyaman.",
      "Responsive article portal with a landing page, article list, and a comfortable reading view."
    ),
    description: [
      L(
        "Sebagai bagian dari program prakerin, saya mengerjakan portal artikel dengan fokus pada keterbacaan dan navigasi yang sederhana.",
        "As part of an internship program, I worked on an article portal focused on readability and simple navigation."
      ),
      L(
        "Halamannya dirancang responsif agar nyaman dibuka baik di desktop maupun di ponsel.",
        "The pages are responsive so they feel comfortable on both desktop and mobile."
      ),
    ],
    tags: ["CMS", "Article", "Responsive", "UI"],
    cover: "/assets/projects/prakerin-home.jpg",
    coverFit: "contain",
    accent: "#c9a4d8",
    gallery: [
      { src: "/assets/projects/prakerin-home.jpg", alt: "Article portal home", caption: L("Tampilan beranda versi penuh", "Full-page home view") },
      { src: "/assets/projects/prakerin-artikel.jpg", alt: "Article list", caption: L("Halaman daftar artikel", "Article list page") },
      { src: "/assets/projects/prakerin-artikel-full.jpg", alt: "Reading view", caption: L("Tampilan pembacaan artikel", "Article reading view") },
    ],
  },
  {
    id: "ecommerce",
    title: "Web E-Commerce",
    category: "E-Commerce",
    year: "2022 — 2023",
    role: L("Frontend Developer", "Frontend Developer"),
    summary: L(
      "Tampilan toko online dengan hierarki produk yang jelas dan pengalaman belanja yang intuitif.",
      "Online store interface with clear product hierarchy and an intuitive shopping experience."
    ),
    description: [
      L(
        "Proyek e-commerce ini berfokus pada penyajian katalog produk yang rapi dan mudah dijelajahi.",
        "This e-commerce project focused on presenting a tidy, easy-to-browse product catalog."
      ),
      L(
        "Saya menangani struktur halaman, komposisi visual, serta memastikan tampilan tetap nyaman di berbagai ukuran layar.",
        "I handled page structure, visual composition, and made sure the layout stays comfortable across screen sizes."
      ),
    ],
    tags: ["E-Commerce", "Product UI", "Responsive", "Frontend"],
    cover: "/assets/projects/ecommerce-home.jpg",
    accent: "#7cc6a8",
    gallery: [
      { src: "/assets/projects/ecommerce-home.jpg", alt: "Store home", caption: L("Halaman utama katalog produk", "Home page of the product catalog") },
    ],
  },
];

export const certificates: Certificate[] = [
  {
    id: "ccit",
    title: L("Juara 3 — Lomba Project Competition", "3rd Place — Project Competition"),
    issuer: L("CCIT Festival 2023 · Universitas Indonesia", "CCIT Festival 2023 · Universitas Indonesia"),
    year: "2023",
    type: "pdf",
    file: "/assets/certificates/sertifikat-ccit.pdf",
    credential: "SERT-769/UN2.F4.D2.1.2/PDP.00.07.01/2023",
    description: L(
      "Diraih bersama Tim Frantic dari SMK Budi Luhur lewat proyek Lost & Found dalam Lomba Project Competition yang diselenggarakan CCIT Festival 2023.",
      "Earned with Team Frantic from SMK Budi Luhur for the Lost & Found project at the Project Competition held by CCIT Festival 2023."
    ),
  },
  {
    id: "algoritma",
    title: L("Juara 3 — Lomba Algoritma", "3rd Place — Algorithm Competition"),
    issuer: L("SMK Budi Luhur", "SMK Budi Luhur"),
    year: "2023",
    type: "image",
    file: "/assets/certificates/sertifikat-algoritma.png",
    description: L(
      "Sertifikat pencapaian Juara 3 dalam kompetisi algoritma tingkat sekolah.",
      "Certificate for 3rd place in a school-level algorithm competition."
    ),
  },
  {
    id: "prakerin",
    title: L("Sertifikat Prakerin", "Internship Certificate"),
    issuer: L("Amikom", "Amikom"),
    year: "2023",
    type: "image",
    file: "/assets/certificates/sertifikat-prakerin-1.jpeg",
    gallery: [
      "/assets/certificates/sertifikat-prakerin-1.jpeg",
      "/assets/certificates/sertifikat-prakerin-2.jpeg",
    ],
    description: L(
      "Sertifikat penyelesaian program praktik kerja lapangan di Amikom.",
      "Certificate of completion for the internship program at Amikom."
    ),
  },
];

export const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Web App",
  "E-Commerce",
  "Game",
];
