import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';

const CURSOR_VARIANTS = {
  default: { innerSize: 8, outerSize: 40, outerBorder: 'border-blue-500/50', outerBg: 'bg-blue-500/5', label: '' },
  link: { innerSize: 10, outerSize: 52, outerBorder: 'border-cyan-400/60', outerBg: 'bg-cyan-400/10', label: 'OPEN' },
  button: { innerSize: 10, outerSize: 58, outerBorder: 'border-blue-400/60', outerBg: 'bg-blue-400/10', label: 'GO' },
  card: { innerSize: 12, outerSize: 72, outerBorder: 'border-fuchsia-400/60', outerBg: 'bg-fuchsia-400/10', label: 'VIEW' },
  media: { innerSize: 12, outerSize: 78, outerBorder: 'border-emerald-400/60', outerBg: 'bg-emerald-400/10', label: 'ZOOM' },
};

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const screenQuery = window.matchMedia('(min-width: 1024px)');

    if (!mediaQuery.matches || !screenQuery.matches) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (event) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        setCursorVariant('default');
        return;
      }

      const markedTarget = target.closest('[data-cursor]');

      if (markedTarget instanceof HTMLElement) {
        setCursorVariant(markedTarget.dataset.cursor || 'default');
        return;
      }

      if (target.closest('button')) {
        setCursorVariant('button');
        return;
      }

      if (target.closest('a')) {
        setCursorVariant('link');
        return;
      }

      setCursorVariant('default');
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);

  const activeCursor = CURSOR_VARIANTS[cursorVariant] ?? CURSOR_VARIANTS.default;
  const innerOffset = activeCursor.innerSize / 2;
  const outerOffset = activeCursor.outerSize / 2;

  return (
    <>
      <Motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-blue-500 mix-blend-screen"
        animate={{
          x: mousePosition.x - innerOffset,
          y: mousePosition.y - innerOffset,
          opacity: isVisible ? 1 : 0,
          width: activeCursor.innerSize,
          height: activeCursor.innerSize,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.1 }}
      />
      <Motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border text-[10px] font-black tracking-[0.25em] text-white/90 backdrop-blur-[1px] ${activeCursor.outerBorder} ${activeCursor.outerBg}`}
        animate={{
          x: mousePosition.x - outerOffset,
          y: mousePosition.y - outerOffset,
          opacity: isVisible ? 1 : 0,
          width: activeCursor.outerSize,
          height: activeCursor.outerSize,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100, mass: 0.5 }}
      >
        <span className="select-none">{activeCursor.label}</span>
      </Motion.div>
    </>
  );
}
