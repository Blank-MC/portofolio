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

export const contactVisibility = {
  showEmail: true,
  showWhatsapp: true,
  showCv: true,
  placeholder: "-",
} as const;

export const profile = {
  name: "Rezya Indy Saputra",
  shortName: "Rezya",
  handle: "rezy___a",
  role: "Full Stack Developer",
  location: "Indonesia",
  email: "rezyaindisaputra@gmail.com",
  phone: "+62 821 3542 3599",
  whatsapp: "https://wa.me/6282135423599",
  instagram: "https://www.instagram.com/rezy___a/",
  github: "https://github.com/Blank-MC",
  cv: "/Rezya-Indy-Saputra-CV.pdf",
  bio: L(
    "Saya membangun aplikasi web dari ujung ke ujung, antarmuka yang cepat, logika server yang rapi, sampai database. Detail animasi pun saya perhatikan supaya produk terasa hidup.",
    "I build web applications end to end, fast interfaces, tidy server logic, and solid databases. I care about the animation details too, so a product feels alive."
  ),
  about: [
    L(
      "Saya adalah full stack developer muda yang suka membangun sesuatu dari nol. Fokus saya ada pada kualitas antarmuka, struktur kode yang rapi, dan alur data yang nyambung dari frontend sampai backend.",
      "I'm a young full stack developer who loves building things from scratch. I focus on interface quality, clean code structure, and data flows that connect frontend to backend."
    ),
    L(
      "Perjalanan saya dimulai dari dunia game development, lalu berkembang ke aplikasi web dengan panel admin dan database, sampai kini bereksperimen dengan animasi serta grafis 3D di browser. Saya juga sedang kuliah di Binus jurusan Cybersecurity, yang membuat saya makin peduli pada keamanan dan kualitas sistem yang saya bangun.",
      "My journey started in game development, then grew into web applications with admin panels and databases, and now experimenting with motion and 3D graphics in the browser. I'm also currently studying Cybersecurity at Binus, which makes me care even more about the security and quality of the systems I build."
    ),
  ],
};

export const stats = [
  { value: 8, suffix: "+", label: L("Project selesai", "Projects completed") },
  { value: 4, suffix: "", label: L("Sertifikat diraih", "Certificates earned") },
  { value: 2, suffix: "+", label: L("Tahun pengalaman kerja", "Years of professional experience") },
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
  { name: "Git / GitHub", level: 85, group: "Backend" },
  { name: "Three.js", level: 68, group: "Creative" },
  { name: "Motion", level: 80, group: "Creative" },
  { name: "Figma / UI Design", level: 75, group: "Creative" },
];

export const experience = [
  {
    period: L("2022 - 2025", "2022 - 2025"),
    title: "SMK Budi Luhur",
    subtitle: L("Rekayasa Perangkat Lunak (RPL)", "Software Engineering (RPL)"),
    description: L(
      "Masa sekolah tempat saya mencari ilmu dasar pengembangan perangkat lunak, basis data, dan kerja tim. Dari sini proyek web dan game pertama saya lahir.",
      "The years where I built my foundation in software development, databases, and teamwork, and where my first web and game projects were born."
    ),
    icon: "education" as const,
  },
  {
    period: L("2024 & 2025 · 6 bulan", "2024 & 2025 · 6 months"),
    title: "Full Stack Web Intern",
    subtitle: L("PT. Tjatra Yasa Indonesia · PKL", "PT. Tjatra Yasa Indonesia · Internship"),
    description: L(
      "Praktik kerja lapangan total enam bulan di PT. Tjatra Yasa Indonesia saat kelas 11 dan 12 SMK. Saya mengerjakan Portal Berita dan revamp website company profile, berkolaborasi dengan UI/UX designer, serta mengelola database dan logika backend.",
      "A six-month internship at PT. Tjatra Yasa Indonesia during grades 11 and 12. I worked on a news portal and a company profile revamp, collaborated with UI/UX designers, and handled the database and backend logic."
    ),
    icon: "code" as const,
  },
  {
    period: L("2024", "2024"),
    title: "EasyCome · Proyek Freelance",
    subtitle: L("Klien mahasiswa kampus Malaysia", "Client: student from a university in Malaysia"),
    description: L(
      "Sistem reservasi venue yang saya kerjakan pada 2024 dari tawaran orang yang saya kenal saat masih PKL, bukan atas nama PT tempat magang. Dibangun dengan Laravel dan MySQL dalam waktu sekitar satu bulan, dengan kolaborasi kode lewat GitLab.",
      "A venue booking system I worked on in 2024 through an acquaintance while interning, not under the company I interned at. Built with Laravel and MySQL in about a month, with code collaboration via GitLab."
    ),
    icon: "briefcase" as const,
  },
  {
    period: L("Juni 2025 - Sekarang", "June 2025 - Present"),
    title: "Freelance Full Stack Developer",
    subtitle: L("Istana Komputer · Proyek web klien", "Istana Komputer · Client web projects"),
    description: L(
      "Sejak Juni 2025 saya freelance lewat Istana Komputer, awalnya maintenance website, lalu pengembangan fitur dan debugging. Saya juga mengambil proyek web lain secara freelance sampai sekarang.",
      "Since June 2025 I've freelanced through Istana Komputer, starting with website maintenance, then new features and debugging. I've also taken on other freelance web projects along the way."
    ),
    icon: "briefcase" as const,
  },
  {
    period: L("Sep 2025 - Sekarang", "Sep 2025 - Present"),
    title: "Binus University",
    subtitle: L(
      "Cybersecurity · Sarjana Teknik Informatika · Semester 3",
      "Cybersecurity · Bachelor of Informatics · Semester 3"
    ),
    description: L(
      "Mulai 23 September 2025 dan saat ini memasuki semester 3. Fokus belajar di bidang keamanan siber, jaringan, dan praktik keamanan modern, sambil terus membangun aplikasi web end-to-end.",
      "Started on 23 September 2025 and currently in semester 3. Focusing on cybersecurity, networks, and modern security practices, while continuing to build end-to-end web applications."
    ),
    icon: "education" as const,
  },
];

export const projects: Project[] = [
  {
    id: "easycome",
    title: "EasyCome",
    category: "Web App",
    year: "2024",
    role: L("Full Stack Developer", "Full Stack Developer"),
    summary: L(
      "Platform pemesanan venue untuk mahasiswa dari kampus di Malaysia, datang dari tawaran orang yang saya kenal saat masa PKL.",
      "Venue booking platform for a student from a university in Malaysia, from an offer through an acquaintance during my internship period."
    ),
    description: [
      L(
        "EasyCome adalah aplikasi web untuk memesan tempat atau venue. Proyek ini saya dapat pada 2024 dari tawaran orang yang saya kenal, kliennya mahasiswa dari kampus di Malaysia, saat saya masih menjalani PKL. Jadi bukan pekerjaan atas nama PT tempat magang saya.",
        "EasyCome is a web app for booking venues. I got this project in 2024 through someone I know, the client was a student from a university in Malaysia, while I was doing my internship. So it wasn't work under the company I interned at."
      ),
      L(
        "Saya membangun alur lengkap mulai dari pencarian venue, formulir pemesanan, hingga status booking yang bisa disetujui atau dibatalkan admin.",
        "I built the full flow from browsing venues and submitting bookings to statuses that admins can approve or cancel."
      ),
      L(
        "Fokus utamanya adalah membuat status pemesanan mudah dipahami pengguna, sekaligus memberi panel admin yang ringkas untuk mengelola seluruh transaksi.",
        "The main focus was making booking statuses easy to understand while giving admins a compact panel to manage every transaction."
      ),
      L(
        "Proyek freelance ini saya selesaikan dalam waktu sekitar satu bulan dengan Laravel dan MySQL. Kolaborasi kode serta integrasi antar anggota tim memakai GitLab.",
        "This freelance project was delivered in about a month with Laravel and MySQL. Code collaboration and integration between teammates used GitLab."
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
    year: "2022 - 2023",
    role: L("Game Developer", "Game Developer"),
    summary: L(
      "Prototipe game pertama saya saat kelas 10, petualangan seorang anak yang tersesat, lalu jadi cikal bakal Frantic.",
      "My first game prototype in 10th grade, an adventure about a lost child that later became the seed for Frantic."
    ),
    description: [
      L(
        "The Lost Boy dibuat sebagai proyek game saat saya masih kelas 10 di SMK Budi Luhur. Eksperimen ini fokus pada mekanik dasar, level sederhana, dan karakter utama yang sedang mencari jalan pulang.",
        "The Lost Boy was built as a school game project when I was in 10th grade at SMK Budi Luhur. The experiment focused on core mechanics, simple levels, and a main character trying to find his way home."
      ),
      L(
        "Ide dan asetnya kemudian saya bawa ke proyek kelas 11, Frantic, yang dikembangkan bersama Tim Frantic dan meraih Juara 3 CCIT Festival 2023.",
        "I later carried the ideas and assets into my 11th-grade project, Frantic, developed with Team Frantic and awarded 3rd place at CCIT Festival 2023."
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
    id: "frantic",
    title: "Frantic",
    category: "Game",
    year: "2023",
    role: L("Game Developer", "Game Developer"),
    summary: L(
      "Game puzzle petualangan yang dikembangkan dengan Construct 3 bersama Tim Frantic dan meraih Juara 3 CCIT Festival 2023.",
      "An adventure puzzle game built with Construct 3 alongside Team Frantic, winning 3rd place at CCIT Festival 2023."
    ),
    description: [
      L(
        "Frantic adalah game petualangan berbasis teka-teki yang dikembangkan dari ide dan aset The Lost Boy. Pemain menjelajahi lingkungan, mengumpulkan petunjuk, dan memecahkan rangkaian teka-teki untuk maju.",
        "Frantic is an adventure puzzle game developed from the ideas and assets of The Lost Boy. Players explore the environment, collect clues, and solve a chain of puzzles to progress."
      ),
      L(
        "Proyek ini dibuat bersama Tim Frantic dari SMK Budi Luhur untuk Lomba Project Competition CCIT Festival 2023 dan membawa pulang Juara 3.",
        "This project was built with Team Frantic from SMK Budi Luhur for the CCIT Festival 2023 Project Competition and took home 3rd place."
      ),
    ],
    tags: ["Game", "Puzzle", "Construct 3", "Team Project"],
    cover: "/assets/projects/frantic-cover.jpg",
    accent: "#d8b87c",
    gallery: [
      { src: "/assets/projects/frantic-cover.jpg", alt: "Frantic gameplay", caption: L("Tampilan utama game Frantic", "Main view of Frantic") },
      { src: "/assets/projects/frantic-puzzle.jpg", alt: "Frantic puzzle", caption: L("Salah satu teka-teki dan catatan petunjuk dalam game", "One of the puzzles and clue notes in the game") },
    ],
  },
  {
    id: "lost-found",
    title: "Lost & Found",
    category: "Web App",
    year: "2023",
    role: L("Full Stack Developer", "Full Stack Developer"),
    summary: L(
      "Aplikasi pelaporan barang hilang dan ditemukan untuk lingkungan sekolah, lengkap dengan panel admin, chat, dan riwayat.",
      "A lost-and-found reporting app for a school environment, complete with an admin panel, chat, and history."
    ),
    description: [
      L(
        "Lost & Found membantu pengguna melaporkan barang yang hilang atau ditemukan. Antarmukanya dirancang untuk ponsel sehingga proses pelaporan bisa dilakukan dengan cepat, lengkap dengan riwayat dan ruang chat.",
        "Lost & Found helps users report lost or found items. The mobile-first interface makes reporting quick, with history and a chat room built in."
      ),
      L(
        "Saya membangun alur pelaporan, panel admin untuk data kehilangan dan penemuan, serta halaman FAQ. Antarmukanya dibuat mobile-first supaya laporan bisa dikirim dengan cepat.",
        "I built the reporting flow, an admin panel for lost and found data, and an FAQ page. The interface is mobile-first so reports can be submitted quickly."
      ),
      L(
        "Aplikasi web ini berdiri sendiri dan berbeda dari Frantic, game kompetisi yang juga dikembangkan Tim Frantic.",
        "This web app stands on its own and is separate from Frantic, the competition game also developed by Team Frantic."
      ),
    ],
    tags: ["Web App", "Mobile UI", "Admin Panel", "Chat"],
    cover: "/assets/projects/lost-found-cover.jpg",
    accent: "#e0a96d",
    featured: true,
    gallery: [
      { src: "/assets/projects/lost-found-cover.jpg", alt: "Lost & Found app screens", caption: L("Tampilan aplikasi Lost & Found", "App screens of Lost & Found") },
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
    role: L("Full Stack Developer", "Full Stack Developer"),
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
    role: L("Full Stack Developer", "Full Stack Developer"),
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
    role: L("Full Stack Developer", "Full Stack Developer"),
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
    year: "2022 - 2023",
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
    title: L("Juara 3: Lomba Project Competition", "3rd Place: Project Competition"),
    issuer: L("CCIT Festival 2023 · Universitas Indonesia", "CCIT Festival 2023 · Universitas Indonesia"),
    year: "2023",
    type: "image",
    file: "/assets/certificates/sertifikat-ccit.webp",
    credential: "SERT-769/UN2.F4.D2.1.2/PDP.00.07.01/2023",
    description: L(
      "Diraih bersama Tim Frantic dari SMK Budi Luhur lewat game Frantic dalam Lomba Project Competition yang diselenggarakan CCIT Festival 2023.",
      "Earned with Team Frantic from SMK Budi Luhur for the Frantic game at the Project Competition held by CCIT Festival 2023."
    ),
  },
  {
    id: "mage",
    title: L("Juara 1: Game Development Competition MAGE X", "1st Place: Game Development Competition MAGE X"),
    issuer: L("HIMATEKKOM · MAGE X 2024", "HIMATEKKOM · MAGE X 2024"),
    year: "2024",
    type: "image",
    file: "/assets/certificates/sertifikat-mage.webp",
    credential: "507/MAGEX/HIMATEKKOM/XII/2024",
    description: L(
      "Juara 1 bersama Tim Kleponism dalam Game Development Competition MAGE X kategori siswa tingkat nasional pada 23 November 2024.",
      "1st place with Team Kleponism in the MAGE X Game Development Competition, national student category, on 23 November 2024."
    ),
  },
  {
    id: "algoritma",
    title: L("Juara 3: Lomba Algoritma", "3rd Place: Algorithm Competition"),
    issuer: L("HIMTI · Universitas Budi Luhur", "HIMTI · Budi Luhur University"),
    year: "2023",
    type: "image",
    file: "/assets/certificates/sertifikat-algoritma.png",
    credential: "F/UBL/FT1/000/076/11/23",
    description: L(
      "Sertifikat pencapaian Juara 3 dalam ALGHORITHM COMPETITION PEMATIK ke-11 yang diselenggarakan HIMTI Universitas Budi Luhur.",
      "Certificate for 3rd place in the 11th PEMATIK Algorithm Competition organized by HIMTI at Budi Luhur University."
    ),
  },
  {
    id: "prakerin",
    title: L("Sertifikat Prakerin", "Internship Certificate"),
    issuer: L("Amikom · PT. GIT Solution Yogyakarta", "Amikom · PT. GIT Solution Yogyakarta"),
    year: "2024",
    type: "image",
    file: "/assets/certificates/sertifikat-prakerin-1.jpeg",
    gallery: [
      "/assets/certificates/sertifikat-prakerin-1.jpeg",
      "/assets/certificates/sertifikat-prakerin-2.jpeg",
    ],
    description: L(
      "Sertifikat penyelesaian praktik kerja industri di PT. GIT Solution Yogyakarta pada 20–21 Februari 2024, dengan fokus pada pengembangan web dan Laravel.",
      "Certificate of completion for industrial internship at PT. GIT Solution Yogyakarta on 20–21 February 2024, focused on web development and Laravel."
    ),
  },
];

export const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Web App",
  "E-Commerce",
  "Game",
];
