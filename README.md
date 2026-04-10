# zemichael-portfolio-website

A modern, high-performance personal portfolio website built with React, TypeScript, and Tailwind CSS. This project showcases professional experience, education, volunteering, and a curated list of projects with a focus on clean design and smooth user experience.

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations/UX**: [Lenis](https://github.com/darkroomengineering/lenis) (Smooth Scrolling)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Backend**: Serverless functions (Vercel/Node.js) using [Nodemailer](https://nodemailer.com/) for contact forms.

## ✨ Features

- **Interactive Timeline**: A filtered timeline showcasing work experience, education, and volunteering history.
- **Project Showcase**: A spotlight section for featured projects with detailed views.
- **Contact System**: A fully functional contact form integrated with a serverless API to send emails.
- **Multi-page Architecture**: Optimized entry points for the main landing page and a dedicated projects page.
- **Responsive Design**: Fully responsive layout that works across mobile, tablet, and desktop devices.
- **Smooth Scrolling**: Integrated Lenis for a premium, fluid scrolling experience.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [pnpm](https://pnpm.io/) (Preferred package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zemichael-portfolio-website.git
   cd zemichael-portfolio-website
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

To start the development server with Tailwind CSS watching for changes:

```bash
pnpm run dev
```

The site will be available at `http://localhost:5173`.

### Building for Production

To generate a production-ready build:

```bash
pnpm run build
```

The output will be generated in the `dist` directory.

## 📁 Project Structure

```text
.
├── api/                # Serverless functions (e.g., contact form handler)
├── src/
│   ├── assets/         # Static assets (images, icons)
│   ├── data/           # Project and experience data
│   ├── pages/          # Page components
│   ├── utils/          # Helper functions and global styles
│   ├── main.tsx        # Application entry point
│   └── page.tsx        # Main page layout and logic
├── index.html          # Main entry HTML
├── projects.html       # Projects page entry HTML
├── tailwind.input.css  # Tailwind source CSS
└── vite.config.ts      # Vite configuration
```

## 📜 Available Scripts

- `pnpm run dev`: Starts the development environment (Vite + Tailwind watch).
- `pnpm run build`: Builds the project for production.
- `pnpm run lint`: Runs ESLint to check for code quality issues.
- `pnpm run typecheck`: Runs TypeScript compiler to verify type safety.
- `pnpm run preview`: Previews the production build locally.

## 📧 Contact Integration

The contact form sends data to the `/api/contact` endpoint. To make this functional in your own environment, ensure you have the necessary environment variables configured for `nodemailer` (e.g., SMTP credentials) in your hosting provider (Vercel).