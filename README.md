<div align="center">

# ☁️ AWS Student Builder Group — Website

**The official web presence for the AWS Student Builder Group at Tula's Institute, Dehradun.**

A community of student builders learning cloud, AI, and software through hands-on projects, workshops, and mentorship.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-EF008F?logo=framer&logoColor=white)](https://www.framer.com/motion/)

</div>

---

## About

This is the marketing and community site for **AWS SBG** — built to showcase what the group does, spotlight the team, list events, and give members a hub for AWS learning resources. It's a Next.js 15 App Router project styled with a dark, purple-accented "cloud/infrastructure" aesthetic instead of a generic SaaS template look.

## ✨ Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero + scroll-reveal tagline |
| `/about` | About | What the group is, mission, how it works |
| `/events` | Events | Upcoming and past workshops, hackathons, build days |
| `/team` | Team | Core team, organisers, and mentors |
| `/learning-hub` | Learning Hub | AWS certifications, Skill Builder links, starter kits |
| `/gallery` | Gallery | Photos from past events |
| `/demo` | Demo | Standalone shader/animation experiment (Celestial Bloom) |

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS with a custom design-token system, `shadcn/ui` primitives
- **Animation:** Framer Motion, [`lightswind`](https://www.npmjs.com/package/lightswind) (Scroll Reveal, Team Carousel), `three` / `ogl` for shader/3D visuals
- **Icons:** Lucide React, Tabler Icons

## 🎨 Design System

A dark, purple-forward palette meant to read as "cloud infrastructure," not another startup landing page. All tokens live in `tailwind.config.ts` — never hardcode a hex value in a component.

| Token | Value | | Token | Value |
|---|---|---|---|---|
| `primary` | `#7C3AED` | | `bg` | `#09090B` |
| `primary-hover` | `#6D28D9` | | `bg-surface` | `#111827` |
| `primary-light` | `#A78BFA` | | `bg-elevated` | `#1F2937` |
| `primary-soft` | `#EDE9FE` | | `bg-card` | `#18181B` |
| `accent` | `#C084FC` | | `border` | `#27272A` |
| `secondary` | `#8B5CF6` | | `muted` | `#71717A` |

- **Display font:** Space Grotesk (`font-display`) — headings
- **Body font:** Poppins (`font-body`) — everything else
- **Max content width:** `1280px` via the `max-w-content` utility

## 📁 Project Structure

```
app/
├── layout.tsx          # Root layout — fonts, SEO metadata, Navbar/Footer shell
├── page.tsx             # Home (Hero + ScrollRevealSection)
├── globals.css           # Design tokens, base styles, reduced-motion handling
├── about/page.tsx
├── events/page.tsx
├── team/page.tsx
├── learning-hub/page.tsx
├── gallery/page.tsx
└── demo/page.tsx          # Shader experiment

components/
├── layout/
│   ├── Navbar.tsx         # Responsive nav (desktop + mobile menu)
│   └── Footer.tsx
├── sections/
│   ├── Hero.tsx            # Signature floating node-network visual
│   ├── About.tsx
│   ├── Events.tsx
│   ├── Team.tsx
│   ├── Gallery.tsx
│   ├── LearningHub.tsx
│   ├── Statistics.tsx
│   ├── TrustedBy.tsx
│   └── ScrollRevealSection.tsx
├── lightswind/
│   └── scroll-reveal.tsx   # Lightswind ScrollReveal integration
└── ui/
    ├── Button.tsx
    ├── resizable-navbar.tsx
    ├── ProfileCard.tsx/.css
    ├── LightRays.jsx/.css
    ├── celestial-bloom-shader.tsx
    └── flip-text.tsx

lib/
└── utils.ts               # cn() class-merge helper

public/
├── logos/                 # AWS, SBG, Tula's Institute logos
└── Members/                # Team member photos
```

## 🚀 Getting Started

**Prerequisites:** Node.js 18.18+ and npm

```bash
# Clone the repo
git clone https://github.com/Piyush-codez0/AWS-SBG-Website.git
cd AWS-SBG-Website

# Install dependencies
npm install

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Serve the production build
npm run lint    # Lint the codebase
```

## ♿ Accessibility & Performance Notes

- Visible focus rings (`:focus-visible`) throughout
- `prefers-reduced-motion` respected globally in `globals.css`
- Semantic `<nav>` / `<section>` structure with `aria-label` / `aria-expanded` on the mobile menu toggle
- Per-page SEO metadata (title templates, Open Graph, Twitter cards) via the Next.js Metadata API

## 🤝 Contributing

This project is maintained by the AWS Student Builder Group core team at Tula's Institute. Issues and pull requests from members are welcome — please keep new sections self-contained (one component per section) and follow the existing token-based styling approach rather than hardcoded values.

## 📄 License

This project currently has no explicit license. Contact the maintainer before reusing code outside the AWS SBG community.

---

<div align="center">

Built with ☕ and Next.js by the **AWS Student Builder Group**, Tula's Institute, Dehradun.

</div>
