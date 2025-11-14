# Typeflow

**The Calm Writing Space**

A minimal writing app designed for focus, flow, and fun. No distractions. Just you and your words.

![Typeflow](https://img.shields.io/badge/Typeflow-v0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## Features

### ⌨️ Typewriter Sounds
- Choose from authentic typing sounds to enhance your writing experience
- Options: Classic Typewriter or Silent mode
- Separate sound effects for keypress and carriage return

### ✨ Rich Formatting
- **Text Styles**: Bold, Italic
- **Headings**: H1, H2, H3, and Paragraph formatting
- **Lists**: Bullet lists
- Formatting toolbar appears automatically when you pause typing

### 🌙 Dark Mode
- Seamless dark/light mode toggle
- System theme detection
- Easy on your eyes, day or night

### 💾 Auto-Save
- Your work is automatically saved to localStorage
- Never lose your writing
- Content persists across browser sessions

### 📊 Word Count
- Real-time word count tracking
- Displays at the bottom right of the editor

### 📥 Export
- Download your document as HTML
- Preserve all formatting and structure

### 🎨 Distraction-Free Interface
- Clean, minimal design
- Toolbars auto-hide while typing
- Appear after 2 seconds of inactivity
- Focus on your writing

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Font**: Special Elite (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd code
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```bash
code/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx             # Landing page
│   ├── write/
│   │   └── page.tsx         # Main writing editor
│   └── globals.css          # Global styles
├── components/
│   ├── formatting-toolbar.tsx    # Text formatting controls
│   ├── writing-toolbar.tsx       # Main toolbar (clear, download, theme)
│   ├── typewriter-animation.tsx  # Animated typewriter icon
│   ├── theme-provider.tsx        # Theme context provider
│   └── ui/                       # Reusable UI components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── public/
│   └── sounds/                   # Audio files for typing sounds
└── styles/                       # Additional styles
```

## Usage

1. **Start Writing**: Click "Start Writing" on the landing page
2. **Type**: Begin typing in the editor - toolbars will hide automatically
3. **Format Text**:
   - Pause typing for 2 seconds to reveal the formatting toolbar
   - Select text and apply formatting (bold, italic, headings, lists)
4. **Change Sound**: Click the volume icon to switch between typewriter sounds
5. **Toggle Theme**: Use the sun/moon icon to switch between light and dark modes
6. **Download**: Click the download icon to save your document as HTML
7. **Clear**: Click the reset icon to clear all content

## Keyboard Shortcuts

- **Ctrl/Cmd + B**: Bold
- **Ctrl/Cmd + I**: Italic

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is private and proprietary.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Typeflow** - Where focus meets flow. ✍️
