import { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Camera,
  Code2,
  Cpu,
  Download,
  Eye,
  ExternalLink,
  GitBranch,
  Globe,
  Link,
  Mail,
  MapPin,
  MessageSquare,
  MoonStar,
  Phone,
  Printer,
  Server,
  SunMedium,
  Video,
  Wifi,
  X,
} from 'lucide-react';
import CustomCursor from './components/CustomCursor';

const SECTION_REVEAL = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const TECH_STACK = [
  { label: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { label: 'PHP', icon: 'https://cdn.simpleicons.org/php/777BB4' },
  { label: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20' },
  { label: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { label: 'Flutter', icon: 'https://cdn.simpleicons.org/flutter/02569B' },
  { label: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
  { label: 'Linux', icon: 'https://cdn.simpleicons.org/linux/FCC624' },
  { label: 'IoT', icon: 'https://cdn.simpleicons.org/arduino/00979D' },
];

const SKILL_GROUPS = [
  {
    title: 'Frontend Development',
    icon: Code2,
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    skills: ['React', 'Vite', 'Tailwind CSS', 'Responsive UI', 'JavaScript'],
  },
  {
    title: 'Backend & Databases',
    icon: Server,
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30',
    skills: ['PHP', 'Laravel', 'MySQL', 'REST APIs', 'Authentication'],
  },
  {
    title: 'Networking & Support',
    icon: Wifi,
    accent: 'text-blue-400',
    border: 'border-blue-500/30',
    skills: ['LAN Setup', 'Troubleshooting', 'System Support', 'Hardware Maintenance', 'Linux'],
  },
  {
    title: 'IoT & Systems',
    icon: Cpu,
    accent: 'text-fuchsia-400',
    border: 'border-fuchsia-500/30',
    skills: ['Arduino', 'Sensors', 'Automation', 'Monitoring Systems', 'Prototyping'],
  },
];

const PROJECTS = [
  {
    id: 'inventory-web',
    title: 'Inventory Web',
    summary:
      'Inventory management web application with a live Vercel deployment for tracking stock and streamlining day-to-day inventory workflows.',
    details:
      'Built as a practical stock management system, this project focuses on organizing items, reducing manual overhead, and giving users a cleaner workflow for inventory updates and reporting.',
    tags: ['Inventory', 'Web App', 'Vercel'],
    githubUrl: 'https://github.com/dutchjohn80-rgb/inventory-web',
    liveUrl: 'https://inventory-web-five-sooty.vercel.app/',
    icon: Camera,
    screenshots: [
      { src: '/dutch_hub.png', alt: 'Inventory dashboard preview', caption: 'Dashboard-style overview for inventory workflows' },
      { src: '/dutch_hub2.png', alt: 'Inventory module preview', caption: 'Additional interface state for product and stock flow' },
    ],
    highlights: [
      'Focused on practical inventory tracking and item organization',
      'Structured for real-world business workflow improvements',
      'Deployed live on Vercel for easy sharing and testing',
    ],
  },
  {
    id: 'smart-agriculture',
    title: 'Smart Agriculture System',
    summary:
      'IoT monitoring system for small to large scale precision farming with a focus on sensor-based awareness and smarter field decisions.',
    details:
      'This concept highlights your IoT direction by combining environmental sensing, data visibility, and agricultural problem-solving into a single system idea suitable for modern farming.',
    tags: ['IoT', 'Sensors', 'Monitoring'],
    githubUrl: 'https://github.com/dutch5242',
    liveUrl: '',
    icon: Cpu,
    screenshots: [
      { src: '/dutch_hub2.png', alt: 'Smart agriculture concept', caption: 'Monitoring-focused interface concept for agricultural data' },
      { src: '/dutch hub.png', alt: 'Agriculture system poster', caption: 'Visual presentation material for the smart farming concept' },
    ],
    highlights: [
      'Designed around precision farming and sensor-based monitoring',
      'Suitable for future dashboard, alerting, and analytics expansion',
      'Shows crossover between software development and IoT systems',
    ],
  },
];

const GALLERY_ITEMS = [
  { src: '/dutch_hub.png', alt: 'Dutch Hub Project', label: 'DUTCH HUB UI DESIGN', accent: 'text-blue-400', border: 'hover:border-blue-500/50' },
  { src: '/dutch_hub2.png', alt: 'System Flyer Design', label: 'PROMO FLYER CONCEPT', accent: 'text-cyan-400', border: 'hover:border-cyan-500/50' },
  { src: '/dutch hub.png', alt: 'Brand Poster Layout', label: 'BRAND POSTER LAYOUT', accent: 'text-emerald-400', border: 'hover:border-emerald-500/50' },
  { src: '/dutch_hub.png', alt: 'Dashboard Preview', label: 'DASHBOARD PREVIEW', accent: 'text-fuchsia-400', border: 'hover:border-fuchsia-500/50' },
];

const TESTIMONIALS = [
  {
    quote:
      'John is dependable, fast to learn, and brings real commitment to software and IT tasks. He consistently approached technical work with discipline and curiosity.',
    author: 'Academic Mentor',
    role: 'Information Technology Department',
  },
  {
    quote:
      'He handled support work with patience and professionalism while still showing strong interest in building better systems. That balance is rare and valuable.',
    author: 'Workplace Supervisor',
    role: 'Technical Operations',
  },
];

function ModalShell({ title, onClose, children, isLight }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <Motion.div
      className="fixed inset-0 z-[10020] flex items-center justify-center bg-slate-950/85 px-4 py-8 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Motion.div
        className={`relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[28px] border p-5 shadow-2xl sm:p-8 ${
          isLight
            ? 'border-slate-200 bg-white/95 shadow-slate-300/40'
            : 'border-white/10 bg-slate-900/95 shadow-black/40'
        }`}
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">Showcase</p>
            <h3 className={`mt-2 text-2xl font-bold sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'}`}>{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full border p-2 transition ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </Motion.div>
    </Motion.div>
  );
}

export default function Portfolio() {
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const mobileNavRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) emailjs.init(EMAILJS_PUBLIC_KEY);

    const sections = ['home', 'about', 'skills', 'projects', 'gallery', 'contact'];
    const elements = sections.map((id) => document.getElementById(id)).filter(Boolean);
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {
        rootMargin: isMobile ? '-18% 0px -70% 0px' : '-35% 0px -45% 0px',
        threshold: isMobile ? 0.05 : 0.15,
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [EMAILJS_PUBLIC_KEY]);

  useEffect(() => {
    const mobileNav = mobileNavRef.current;

    if (!mobileNav) {
      return;
    }

    const activeLink = mobileNav.querySelector(`[data-nav-id="${activeSection}"]`);

    if (activeLink instanceof HTMLElement) {
      activeLink.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeSection]);

  const handleInputChange = (event) => {
    setSubmitStatus({ type: '', message: '' });
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    setIsSending(true);
    setSubmitStatus({ type: '', message: '' });

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setSubmitStatus({ type: 'error', message: 'Email service haijakamilika. Tafadhali weka EmailJS variables kwenye .env.' });
      setIsSending(false);
      return;
    }

    const templateParams = {
      name: formData.name,
      from_name: formData.name,
      email: formData.email,
      reply_to: formData.email,
      from_email: formData.email,
      message: formData.message,
      subject: `Portfolio inquiry from ${formData.name}`,
      title: 'New Portfolio Message',
      to_name: 'John Ezebius Dutch',
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus({ type: 'success', message: 'Asante John, nimepokea ujumbe wako!' });
      })
      .catch((error) => {
        console.error('EmailJS send error:', error);
        const errorText = typeof error?.text === 'string' && error.text.trim() ? error.text : 'Kuna tatizo kidogo, jaribu tena baadaye.';
        setSubmitStatus({ type: 'error', message: errorText });
      })
      .finally(() => setIsSending(false));
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const isLight = theme === 'light';
  const pageClass = isLight
    ? 'min-h-screen w-full bg-slate-100 text-slate-900 font-sans'
    : 'min-h-screen w-full bg-slate-950 text-slate-100 font-sans';
  const headerClass = isLight
    ? 'sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl'
    : 'sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl';
  const cardClass = isLight
    ? 'border-slate-200 bg-white/85 text-slate-900'
    : 'border-slate-800 bg-slate-900/50 text-slate-100';
  const mutedTextClass = isLight ? 'text-slate-600' : 'text-slate-400';
  const softTextClass = isLight ? 'text-slate-500' : 'text-slate-500';
  const chipClass = isLight ? 'border-slate-200 bg-slate-100 text-slate-700' : 'border-white/10 bg-white/5 text-slate-200';
  const footerClass = isLight
    ? 'border-t border-slate-200 bg-white py-14 text-slate-700'
    : 'border-t border-slate-800 bg-slate-950 py-14 text-slate-300';
  const sectionTitleClass = isLight ? 'text-slate-900' : 'text-white';
  const navShellClass = isLight ? 'border-slate-200 bg-slate-100/90' : 'border-white/10 bg-white/5';
  const navIdleClass = isLight ? 'text-slate-600 hover:bg-white hover:text-slate-900' : 'text-slate-300 hover:bg-white/10 hover:text-white';
  const outlineButtonClass = isLight
    ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
    : 'border-white/20 text-white hover:bg-white/10';
  const secondaryButtonClass = isLight
    ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
    : 'border-slate-700 bg-slate-800 text-white hover:bg-slate-700';
  const modalMutedTextClass = isLight ? 'text-slate-600' : 'text-slate-300';
  const modalCardClass = isLight ? 'border-slate-200 bg-slate-50 text-slate-800' : 'border-white/10 bg-slate-800 text-slate-300';

  return (
    <div className={pageClass}>
      <CustomCursor />
      {submitStatus.message ? (
        <div className="pointer-events-none fixed inset-x-0 top-24 z-[10000] flex justify-center px-4">
          <div
            className={`pointer-events-auto w-full max-w-md rounded-2xl border px-4 py-4 shadow-2xl backdrop-blur-xl transition-all ${
              submitStatus.type === 'success'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
                : 'border-rose-500/40 bg-rose-500/10 text-rose-100'
            }`}
          >
            <p className="text-sm font-semibold">
              {submitStatus.type === 'success' ? 'Message Sent' : 'Message Error'}
            </p>
            <p className="mt-1 text-sm opacity-90">{submitStatus.message}</p>
          </div>
        </div>
      ) : null}

      <header className={headerClass}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <a href="#home" data-cursor="link" className={`shrink-0 text-xs font-black tracking-[0.28em] sm:text-sm sm:tracking-[0.35em] ${isLight ? 'text-slate-900' : 'text-white'}`}>
            DUTCH
          </a>
          <nav className={`hidden items-center gap-2 rounded-full border p-1 md:flex ${navShellClass}`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  data-cursor="link"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                      : navIdleClass
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <button
            type="button"
            data-cursor="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            className={`ml-1 inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition sm:ml-3 sm:px-4 sm:text-sm ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {isLight ? <MoonStar size={16} /> : <SunMedium size={16} />}
            {isLight ? 'Dark' : 'Light'}
          </button>
        </div>
        <div className="scrollbar-none overflow-x-auto px-4 pb-4 md:hidden">
          <nav ref={mobileNavRef} className="flex min-w-max items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={`${link.id}-mobile`}
                  data-nav-id={link.id}
                  data-cursor="link"
                  href={`#${link.id}`}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'border-blue-500/50 bg-blue-600 text-white'
                      : isLight
                        ? 'border-slate-200 bg-white text-slate-600'
                        : 'border-white/10 bg-white/5 text-slate-300'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <section
        id="home"
        className={`relative flex flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:py-24 md:py-32 ${
          isLight ? 'bg-gradient-to-b from-blue-100 to-slate-100' : 'bg-gradient-to-b from-blue-900/20 to-slate-950'
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="z-10 mx-auto flex w-full max-w-3xl flex-col items-center overflow-x-clip">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400 sm:px-4 sm:py-1.5 sm:text-sm">
            Available for Opportunities
          </span>
          <h1 className={`mt-5 bg-clip-text text-3xl font-bold leading-[1.1] text-transparent sm:mt-6 sm:text-5xl md:text-7xl ${isLight ? 'bg-gradient-to-r from-slate-900 via-blue-700 to-blue-500' : 'bg-gradient-to-r from-white via-blue-100 to-blue-500'}`}>
            John Ezebius Dutch
          </h1>
          <p className={`mx-auto mt-4 max-w-xl px-2 text-sm leading-7 sm:px-0 sm:text-lg md:max-w-2xl md:text-xl ${mutedTextClass}`}>
            IT Professional specializing in Networking, Software Development, and IoT solutions.
          </p>

          <div className="mt-8 grid w-full max-w-sm grid-cols-1 gap-3 sm:flex sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <a
              href="/CURRICULUM_VITAE.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="button"
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-500/30 px-5 py-3 text-sm font-bold transition-all hover:border-blue-400/60 sm:px-6 sm:text-base ${
                isLight
                  ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  : 'bg-blue-500/10 text-blue-100 hover:bg-blue-500/20'
              }`}
            >
              <Eye size={18} />
              View CV
            </a>
            <a
              href="/CURRICULUM_VITAE.pdf"
              download
              data-cursor="button"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-blue-500 sm:px-6 sm:text-base"
            >
              <Download size={18} />
              Download CV
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              data-cursor="button"
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition-all sm:px-6 sm:text-base ${outlineButtonClass}`}
            >
              <Printer size={18} />
              Print Page
            </button>
            <a
              href="#contact"
              data-cursor="button"
              className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-all sm:px-6 sm:text-base ${secondaryButtonClass}`}
            >
              <MessageSquare size={20} />
              Get In Touch
            </a>
          </div>
        </div>
      </section>

      <div className={`pause-on-hover overflow-hidden border-y py-8 sm:py-10 ${isLight ? 'border-slate-200 bg-slate-200/60' : 'border-white/5 bg-white/5'}`}>
        <div className="animate-scroll flex items-center gap-10 sm:gap-16 md:gap-20">
          {[...TECH_STACK, ...TECH_STACK].map((tech, index) => (
            <div key={`${tech.label}-${index}`} className="flex min-w-[180px] items-center gap-3 sm:min-w-[220px] sm:gap-4">
              <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
              <img
                src={tech.icon}
                alt={`${tech.label} icon`}
                className="h-6 w-6 object-contain opacity-90 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <span className={`cursor-default text-lg font-black transition-colors sm:text-2xl ${isLight ? 'text-slate-500 hover:text-slate-900' : 'text-gray-500 hover:text-white'}`}>
                {tech.label.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Motion.section {...SECTION_REVEAL} id="about" className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className={`flex items-center gap-4 rounded-2xl border p-6 backdrop-blur-md ${cardClass}`}>
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500"><BookOpen size={24} /></div>
            <div>
              <p className={`text-sm ${softTextClass}`}>Education</p>
              <p className="text-lg font-semibold">BSc in IT (ATC)</p>
            </div>
          </div>
          <div className={`flex items-center gap-4 rounded-2xl border p-6 backdrop-blur-md ${cardClass}`}>
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-500"><Cpu size={24} /></div>
            <div>
              <p className={`text-sm ${softTextClass}`}>Focus</p>
              <p className="text-lg font-semibold">Web & IoT Dev</p>
            </div>
          </div>
          <div className={`flex items-center gap-4 rounded-2xl border p-6 backdrop-blur-md ${cardClass}`}>
            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-500"><Globe size={24} /></div>
            <div>
              <p className={`text-sm ${softTextClass}`}>Location</p>
              <p className="text-lg font-semibold">Arusha, Tanzania</p>
            </div>
          </div>
        </div>
      </Motion.section>

      <Motion.section {...SECTION_REVEAL} className="mx-auto max-w-5xl px-6 py-20">
        <h2 className={`mb-12 text-center text-3xl font-bold ${sectionTitleClass}`}>Professional Experience</h2>
        <div className="space-y-8">
          <div className="relative border-l-2 border-cyan-500/30 pl-8">
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
            <span className="font-mono text-sm text-cyan-400">Current Role - Arusha, Tanzania</span>
            <h3 className="mt-1 text-xl font-bold">Software Development - Computing Centre</h3>
            <p className={`mt-2 ${mutedTextClass}`}>
              Building and improving software solutions while supporting ongoing development work at the Computing Centre in Arusha.
            </p>
          </div>
          <div className="relative border-l-2 border-blue-500/30 pl-8">
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            <span className="font-mono text-sm text-blue-400">June 2024 - Oct 2024</span>
            <h3 className="mt-1 text-xl font-bold">ICT Intern - Silla College</h3>
            <p className={`mt-2 ${mutedTextClass}`}>Troubleshooting hardware/software and maintaining campus network infrastructure.</p>
          </div>
          <div className="relative border-l-2 border-purple-500/30 pl-8">
            <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
            <span className="font-mono text-sm text-purple-400">Previous Experience</span>
            <h3 className="mt-1 text-xl font-bold">ICT Support - Mount Meru Hospital</h3>
            <p className={`mt-2 ${mutedTextClass}`}>Systems maintenance and technical user support in a high-traffic healthcare environment.</p>
          </div>
        </div>
      </Motion.section>

      <Motion.section {...SECTION_REVEAL} id="skills" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${sectionTitleClass}`}>Skills By Category</h2>
          <p className={`mt-2 ${softTextClass}`}>A clearer view of the tools and domains I work with most.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILL_GROUPS.map((group) => {
            const Icon = group.icon;

            return (
              <div key={group.title} className={`rounded-3xl border p-6 backdrop-blur-xl ${isLight ? 'border-slate-200 bg-white/90' : `${group.border} bg-slate-900/60`}`}>
                <div className="flex items-center gap-4">
                  <div className={`rounded-2xl border p-3 ${isLight ? 'border-slate-200 bg-slate-100' : 'border-white/10 bg-white/5'} ${group.accent}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{group.title}</h3>
                    <p className={`text-sm ${softTextClass}`}>Focused tools and strengths</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span key={skill} className={`rounded-full border px-4 py-2 text-sm font-medium ${chipClass}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Motion.section>

      <Motion.section {...SECTION_REVEAL} id="projects" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${sectionTitleClass}`}>Featured Projects</h2>
          <p className={`mt-2 ${softTextClass}`}>Systems I have designed and deployed</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {PROJECTS.map((project) => {
            const Icon = project.icon;

            return (
              <div key={project.id} data-cursor="card" className={`group overflow-hidden rounded-2xl border transition-all ${isLight ? 'border-slate-200 bg-white hover:border-slate-300' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}>
                <div className={`flex h-48 items-center justify-center ${isLight ? 'bg-slate-100 text-slate-400' : 'bg-slate-800 text-slate-600'}`}>
                  <Icon size={40} className="transition-transform group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className={`mt-2 text-sm ${mutedTextClass}`}>{project.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className={`rounded-full px-3 py-1 text-xs ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" data-cursor="link" className={`flex items-center gap-1 text-sm transition ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'}`}>
                      <GitBranch size={16} /> GitHub
                    </a>
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" data-cursor="link" className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-400">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      data-cursor="button"
                      className={`flex items-center gap-2 text-sm font-medium transition ${isLight ? 'text-slate-800 hover:text-blue-600' : 'text-white hover:text-blue-300'}`}
                    >
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Motion.section>

      <Motion.section {...SECTION_REVEAL} id="gallery" className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${sectionTitleClass}`}>Media & Design Gallery</h2>
          <p className={`mt-2 ${softTextClass}`}>Click any visual to open it in a full showcase lightbox.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {GALLERY_ITEMS.map((item) => (
            <button
              key={`${item.label}-${item.src}`}
              type="button"
              onClick={() => setSelectedGalleryItem(item)}
              data-cursor="media"
              className={`group relative aspect-square overflow-hidden rounded-2xl border text-left transition-all duration-300 ${isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-slate-800'} ${item.border}`}
            >
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <p className={`text-xs font-bold tracking-[0.2em] ${item.accent}`}>{item.label}</p>
              </div>
            </button>
          ))}
        </div>
      </Motion.section>

      <Motion.section {...SECTION_REVEAL} className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${sectionTitleClass}`}>Testimonials</h2>
          <p className={`mt-2 ${softTextClass}`}>Short recommendations that speak to reliability, growth, and technical professionalism.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((item) => (
            <div key={item.author} className={`rounded-3xl border p-6 backdrop-blur-xl ${cardClass}`}>
              <p className="text-5xl leading-none text-blue-400">"</p>
              <p className={`mt-4 text-base leading-8 ${mutedTextClass}`}>{item.quote}</p>
              <div className={`mt-6 border-t pt-5 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <p className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.author}</p>
                <p className={`text-sm ${softTextClass}`}>{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Motion.section>

      <Motion.section {...SECTION_REVEAL} id="contact" className="mx-auto mb-20 max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <h2 className={`text-3xl font-bold ${sectionTitleClass}`}>Let's Work Together</h2>
            <p className={`mt-4 ${mutedTextClass}`}>Have a project in mind or want to subscribe to updates? Drop me a message!</p>
            <div className="mt-8 space-y-4">
              <div className={`flex min-w-0 items-start gap-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}><Mail className="mt-1 shrink-0 text-blue-500" /> <span className="min-w-0 break-all">dutch5242@gmail.com</span></div>
              <div className={`flex min-w-0 items-start gap-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}><Phone className="mt-1 shrink-0 text-blue-500" /> <span className="min-w-0">+255 744 853 054</span></div>
              <div className={`flex min-w-0 items-start gap-4 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}><MapPin className="mt-1 shrink-0 text-blue-500" /> <span className="min-w-0">Arusha, Tanzania</span></div>
            </div>
            <div className="mt-8">
              <p className={`mb-3 text-sm ${softTextClass}`}>Subscribe to my Tutorials:</p>
              <a
                href="http://www.youtube.com/@dutchtech-k7l"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-red-600/20 transition-all hover:bg-red-500 sm:w-auto"
              >
                <Video size={20} />
                YouTube: Dutch Tech Studio
              </a>
            </div>
          </div>

          <div className={`rounded-2xl border p-8 backdrop-blur-md ${cardClass}`}>
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className={`text-sm font-medium ${softTextClass}`}>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`mt-1 w-full rounded-xl border px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none ${isLight ? 'border-slate-200 bg-slate-50 text-slate-900' : 'border-slate-700 bg-slate-800 text-white'}`} placeholder="Your Name" required />
              </div>
              <div>
                <label className={`text-sm font-medium ${softTextClass}`}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`mt-1 w-full rounded-xl border px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none ${isLight ? 'border-slate-200 bg-slate-50 text-slate-900' : 'border-slate-700 bg-slate-800 text-white'}`} placeholder="you@example.com" required />
              </div>
              <div>
                <label className={`text-sm font-medium ${softTextClass}`}>Message / Suggestions</label>
                <textarea rows="4" name="message" value={formData.message} onChange={handleInputChange} className={`mt-1 w-full rounded-xl border px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none ${isLight ? 'border-slate-200 bg-slate-50 text-slate-900' : 'border-slate-700 bg-slate-800 text-white'}`} placeholder="Write your suggestions here..." required></textarea>
              </div>
              <button type="submit" disabled={isSending} data-cursor="button" className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70">
                {isSending ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-white"></span>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
              {submitStatus.message ? (
                <p className={`text-sm ${submitStatus.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {submitStatus.message}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </Motion.section>

      <footer className={footerClass}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:grid-cols-4">
          <div>
            <p className="text-sm font-black tracking-[0.35em]">DUTCH</p>
            <p className={`mt-4 max-w-xs text-sm leading-7 ${mutedTextClass}`}>
              Dutch Tech Studio builds thoughtful software, practical IT systems, and digital experiences with a clean, modern feel.
            </p>
          </div>
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-[0.2em] ${isLight ? 'text-slate-900' : 'text-white'}`}>Quick Links</h3>
            <div className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <a key={`footer-${link.id}`} href={`#${link.id}`} data-cursor="link" className={`block text-sm transition hover:text-blue-400 ${mutedTextClass}`}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-[0.2em] ${isLight ? 'text-slate-900' : 'text-white'}`}>Socials</h3>
            <div className="mt-4 space-y-3">
              <a href="https://github.com/dutchjohn80-rgb" target="_blank" rel="noreferrer" data-cursor="link" className={`flex min-w-0 items-center gap-2 text-sm transition hover:text-blue-400 ${mutedTextClass}`}>
                <GitBranch size={16} />
                <span className="min-w-0 break-words">GitHub</span>
              </a>
              <a href="http://www.youtube.com/@dutchtech-k7l" target="_blank" rel="noreferrer" data-cursor="link" className={`flex min-w-0 items-center gap-2 text-sm transition hover:text-blue-400 ${mutedTextClass}`}>
                <Video size={16} />
                <span className="min-w-0 break-words">YouTube</span>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" data-cursor="link" className={`flex min-w-0 items-center gap-2 text-sm transition hover:text-blue-400 ${mutedTextClass}`}>
                <Link size={16} />
                <span className="min-w-0 break-words">LinkedIn</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-[0.2em] ${isLight ? 'text-slate-900' : 'text-white'}`}>Contact</h3>
            <div className={`mt-4 space-y-3 text-sm ${mutedTextClass}`}>
              <p className="break-all">dutch5242@gmail.com</p>
              <p>+255 744 853 054</p>
              <p>Arusha, Tanzania</p>
            </div>
          </div>
        </div>
        <div className={`mx-auto mt-10 flex max-w-6xl flex-col gap-3 border-t px-4 pt-6 text-sm md:flex-row md:items-center md:justify-between ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-500'}`}>
          <p>&copy; 2026 Dutch Tech Studio. All rights reserved.</p>
          <p>Crafted with focus on software, systems, and modern digital presentation.</p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedGalleryItem ? (
          <ModalShell title={selectedGalleryItem.label} onClose={() => setSelectedGalleryItem(null)} isLight={isLight}>
            <img src={selectedGalleryItem.src} alt={selectedGalleryItem.alt} className="max-h-[70vh] w-full rounded-2xl object-contain" />
            <p className={`mt-4 text-sm ${modalMutedTextClass}`}>{selectedGalleryItem.alt}</p>
          </ModalShell>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject ? (
          <ModalShell title={selectedProject.title} onClose={() => setSelectedProject(null)} isLight={isLight}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {selectedProject.screenshots.map((shot) => (
                    <button key={shot.caption} type="button" onClick={() => setSelectedGalleryItem({ src: shot.src, alt: shot.alt, label: shot.caption })} data-cursor="media" className={`group overflow-hidden rounded-2xl border text-left ${modalCardClass}`}>
                      <img src={shot.src} alt={shot.alt} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="p-4">
                        <p className={`text-sm ${modalMutedTextClass}`}>{shot.caption}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className={`text-sm leading-7 ${modalMutedTextClass}`}>{selectedProject.details}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className={`rounded-full border px-3 py-1 text-xs ${chipClass}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {selectedProject.highlights.map((highlight) => (
                    <div key={highlight} className={`flex items-start gap-3 text-sm ${modalMutedTextClass}`}>
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                      <p>{highlight}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" data-cursor="link" className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition ${isLight ? 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200' : 'border-white/10 bg-white/5 text-white hover:bg-white/10'}`}>
                    <GitBranch size={16} />
                    View Repository
                  </a>
                  {selectedProject.liveUrl ? (
                    <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" data-cursor="link" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500">
                      <ExternalLink size={16} />
                      Open Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </ModalShell>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
