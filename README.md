# Rezya Indy Saputra — Portfolio

Portfolio web interaktif untuk Rezya Indy Saputra — web developer yang suka membangun pengalaman yang cepat, rapi, dan punya karakter.

Interactive portfolio built with **Next.js**, **TypeScript**, **Tailwind CSS**, and a draggable **React Bits 3D lanyard**. Tersedia dalam Bahasa Indonesia dan English.

[![Live on Vercel](https://img.shields.io/badge/live-portofolio--blank17.vercel.app-000000?logo=vercel&logoColor=white)](https://portofolio-blank17.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-16.4.6-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

**Live demo:** https://portofolio-blank17.vercel.app  
**Repository:** https://github.com/Blank-MC/portofolio

---

## ✨ Highlights

- **Bilingual content** — Bahasa Indonesia / English toggle, tersimpan di `localStorage`.
- **3D lanyard** — kartu bisa digeser, dilempar, dan diklik untuk flip. Menggunakan komponen React Bits dengan Three.js.
- **Two experience modes** — `full` untuk efek glass, blur, grid, cursor, dan particle; `performance` otomatis dipakai saat `prefers-reduced-motion` atau perangkat rendah daya.
- **Projects & certificates** — gallery gambar, detail project, dan tautan sertifikat lewat modal.
- **Live GitHub repos** — daftar repository diambil dari GitHub API dan di-cache 30 menit di browser.
- **Responsive dark-gold theme** — palet obsidian, gold, gold-soft, teal, dan ivory.

---

## 🛠 Tech stack

| Area | Stack |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4, CSS custom properties |
| Motion | Motion, React Spring, Lenis |
| 3D | Three.js (React Bits Lanyard) |
| Icons | React Icons |
| Deploy | Vercel (auto-deploy dari branch `main`) |

---

## 🚀 Getting started

Butuh **Node.js 20.9+**.

```bash
git clone https://github.com/Blank-MC/portofolio.git
cd portofolio
npm install
npm run dev
```

Buka http://localhost:3000.

Script lain:

```bash
npm run build   # production build
npm start       # jalankan hasil build
```

---

## 📁 Structure

```text
app/
├── components/
│   ├── Lanyard/          # React Bits 3D lanyard + CSS
│   ├── layout/           # Navbar, Footer
│   ├── providers/        # Experience / mode provider
│   ├── sections/         # Hero, About, Skills, Projects, dll.
│   └── ui/               # Modal, Reveal, SectionHeading, effects
├── data/
│   └── portfolio.ts      # profile, project, certificate, skill, contact flags
├── lib/                  # i18n, locale, motion helpers
├── globals.css           # theme + efek global
├── layout.tsx
└── page.tsx

public/
├── assets/
│   ├── certificates/
│   ├── lanyard/          # aset lanyard lama (cadangan)
│   └── projects/
├── card-front.png        # placeholder gambar kartu depan
├── card-back.png         # placeholder gambar kartu belakang
└── band.png              # placeholder tekstur tali
```

---

## ⚙️ Customization

Semua konten utama ada di `app/data/portfolio.ts`:

- `profile` — identitas, bio, dan tautan.
- `projects` — kartu project + gallery.
- `certificates` — daftar sertifikat.
- `skills`, `stats`, `experience` — konten section terkait.
- `contactVisibility` — flag untuk menampilkan/menyembunyikan email, WhatsApp, dan CV.

```ts
export const contactVisibility = {
  showEmail: false,
  showWhatsapp: false,
  showCv: false,
  placeholder: "-",
};
```

Ganti `false` menjadi `true` setelah kontak profesional dan CV baru siap.

Gambar lanyard sementara masih memakai placeholder. Tinggal overwrite:

- `public/card-front.png` — portrait 800×1120
- `public/card-back.png` — portrait 800×1120
- `public/band.png` — tekstur tali, di-repeat

---

## 🌐 Deployment

Project sudah terhubung ke Vercel lewat repo GitHub.

- Production branch: `main`
- Setiap push ke `main` otomatis membuat deployment production.
- URL produksi: https://portofolio-blank17.vercel.app

Deploy manual juga bisa:

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 📝 Notes

- Email, WhatsApp, dan unduh CV sengaja disembunyikan sementara dengan `-` sampai versi profesionalnya siap.
- CV lama tidak ikut dimasukkan ke repo/deploy.
- Repository GitHub public untuk portofolio ini dibuat dengan tujuan showcasing kode dan proses belajar.

---

## 🔗 Links

- GitHub: https://github.com/Blank-MC
- Portfolio: https://portofolio-blank17.vercel.app
