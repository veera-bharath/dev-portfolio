import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';

// ── 3D Bee ────────────────────────────────────────────────────────────────────
const StylizedBee = ({ isSleepingRef, justWokeUpRef }) => {
  const beeGroup  = useRef();
  const leftWing  = useRef();
  const rightWing = useRef();
  const eyes      = useRef();
  const wakeTimer = useRef(0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const sleeping = isSleepingRef.current;
    if (!beeGroup.current || !leftWing.current || !rightWing.current || !eyes.current) return;

    if (justWokeUpRef.current) {
      wakeTimer.current += 0.1;
      beeGroup.current.position.y = Math.sin(wakeTimer.current * 20) * 0.3 * Math.exp(-wakeTimer.current * 0.5);
      if (wakeTimer.current > 2) { justWokeUpRef.current = false; wakeTimer.current = 0; }
    } else if (sleeping) {
      beeGroup.current.position.y = Math.sin(t * 0.4) * 0.04;
      beeGroup.current.rotation.z = 0.22;
      beeGroup.current.rotation.y = 0;
      leftWing.current.rotation.z  = 0.5;
      rightWing.current.rotation.z = -0.5;
      eyes.current.scale.y = 0.06;
    } else {
      beeGroup.current.position.y = Math.sin(t * 1.5) * 0.2;
      beeGroup.current.rotation.z = Math.sin(t * 0.8) * 0.1;
      beeGroup.current.rotation.y = Math.sin(t * 0.5) * 0.15;
      const flutter = Math.sin(t * 40) * 0.6;
      leftWing.current.rotation.z  = 0.5 + flutter;
      rightWing.current.rotation.z = -0.5 - flutter;
      const blink = Math.sin(t * 0.2) > 0.98 ? 0.1 : 1;
      eyes.current.scale.y = blink;
      eyes.current.position.x = Math.sin(t * 2) * 0.02;
    }
  });

  return (
    <group ref={beeGroup} scale={1.2} position={[0, 0.4, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.35, 0.4, 32, 32]} />
        <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.15, 32]} />
        <meshStandardMaterial color="#111" roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.15, 32]} />
        <meshStandardMaterial color="#111" roughness={0.2} />
      </mesh>
      <group ref={eyes} position={[0, 0.15, 0.4]}>
        <mesh position={[-0.15, 0, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="#000" roughness={0} />
          <mesh position={[0.03, 0.03, 0.08]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#fff" />
          </mesh>
        </mesh>
        <mesh position={[0.15, 0, 0]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="#000" roughness={0} />
          <mesh position={[0.03, 0.03, 0.08]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#fff" />
          </mesh>
        </mesh>
      </group>
      <mesh position={[0, 0.02, 0.48]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.06, 0.01, 16, 16, Math.PI]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      <group position={[0, 0.4, 0.3]}>
        <mesh position={[-0.1, 0, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2]} />
          <meshStandardMaterial color="#111" />
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
          </mesh>
        </mesh>
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2]} />
          <meshStandardMaterial color="#111" />
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshStandardMaterial color="#915eff" emissive="#915eff" emissiveIntensity={2} />
          </mesh>
        </mesh>
      </group>
      <group ref={leftWing} position={[-0.2, 0.3, 0]}>
        <mesh position={[-0.25, 0, 0]} rotation={[Math.PI / 2, 0, 0.2]}>
          <capsuleGeometry args={[0.12, 0.4, 16, 16]} />
          <meshStandardMaterial color="#00ffff" transparent opacity={0.3} emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>
      </group>
      <group ref={rightWing} position={[0.2, 0.3, 0]}>
        <mesh position={[0.25, 0, 0]} rotation={[Math.PI / 2, 0, -0.2]}>
          <capsuleGeometry args={[0.12, 0.4, 16, 16]} />
          <meshStandardMaterial color="#00ffff" transparent opacity={0.3} emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
};

// ── ZZZ ───────────────────────────────────────────────────────────────────────
const ZzzAnimation = () => (
  <div style={{ position: 'absolute', top: '18px', left: '88px', pointerEvents: 'none', zIndex: 1000002 }}>
    {[0, 1, 2].map(i => (
      <motion.span
        key={i}
        style={{
          position: 'absolute', fontFamily: 'monospace', fontWeight: 'bold',
          fontSize: `${10 + i * 3}px`, color: '#00ffff',
          textShadow: '0 0 8px rgba(0,255,255,0.8)',
        }}
        animate={{ opacity: [0, 1, 1, 0], y: [0, -14, -22, -32], x: [i * 8, i * 8 + 4] }}
        transition={{ duration: 2.2, delay: i * 0.75, repeat: Infinity, ease: 'easeOut' }}
      >
        Z
      </motion.span>
    ))}
  </div>
);

// ── Bubble: Dev in Hero (fixed near profile image) ────────────────────────────
const HeroDevBubble = ({ text, isMobile }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 6 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.85, y: -6 }}
    transition={{ duration: 0.3 }}
    style={{
      position: 'fixed',
      top: isMobile ? '48%' : '22%',
      right: isMobile ? '8%' : '13%',
      background: 'rgba(11,14,20,0.93)',
      border: '1px solid rgba(0,255,255,0.45)',
      borderRadius: '12px',
      padding: '10px 14px',
      maxWidth: '190px',
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#dce4f0',
      lineHeight: '1.5',
      boxShadow: '0 0 18px rgba(0,255,255,0.18)',
      zIndex: 1000001,
      pointerEvents: 'none',
    }}
  >
    {text}
    <div style={{
      position: 'absolute', bottom: '-8px', right: '20px',
      width: 0, height: 0,
      borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
      borderTop: '8px solid rgba(0,255,255,0.45)',
    }} />
  </motion.div>
);

// ── Bubble: About-section dev lines — below navbar profile pic ───────────────
const NavDevBubble = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: -6 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.85, y: -6 }}
    transition={{ duration: 0.3 }}
    style={{
      position: 'fixed',
      top: '78px',
      left: '8px',
      background: 'rgba(11,14,20,0.93)',
      border: '1px solid rgba(0,255,255,0.45)',
      borderRadius: '12px',
      padding: '10px 14px',
      maxWidth: '200px',
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#dce4f0',
      lineHeight: '1.5',
      boxShadow: '0 0 18px rgba(0,255,255,0.18)',
      zIndex: 1000001,
      pointerEvents: 'none',
    }}
  >
    {text}
    {/* tail pointing UP toward navbar profile picture */}
    <div style={{
      position: 'absolute', top: '-8px', left: '68px',
      width: 0, height: 0,
      borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
      borderBottom: '8px solid rgba(0,255,255,0.45)',
    }} />
  </motion.div>
);

// ── Bubble: always above bee (absolute, follows bee) ──────────────────────────
const FloatBubble = ({ text, speaker }) => {
  const isBee = speaker === 'bee';
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: 10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.85, x: 10 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        bottom: '148px',
        right: '-12px',
        background: 'rgba(11,14,20,0.93)',
        border: isBee
          ? '1px solid rgba(255,215,0,0.5)'
          : '1px solid rgba(0,255,255,0.45)',
        borderRadius: '12px',
        padding: '10px 13px',
        maxWidth: '185px',
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#dce4f0',
        lineHeight: '1.5',
        boxShadow: isBee
          ? '0 0 16px rgba(255,215,0,0.18)'
          : '0 0 18px rgba(0,255,255,0.18)',
        zIndex: 1000002,
        pointerEvents: 'none',
      }}
    >
      {text}
      <div style={{
        position: 'absolute', bottom: '-8px', right: '28px',
        width: 0, height: 0,
        borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
        borderTop: `8px solid ${isBee ? 'rgba(255,215,0,0.5)' : 'rgba(0,255,255,0.45)'}`,
      }} />
    </motion.div>
  );
};

// ── Scripts ───────────────────────────────────────────────────────────────────
// Hero — dev lines go to HeroDevBubble (fixed), bee lines go to FloatBubble
// Bee wakes at 17200ms (between line 5 and line 6)
const HERO_SCRIPT = [
  { speaker: 'dev', text: "Hey! 👋 I'm Veera Bharath.",                              at: 500   },
  { speaker: 'dev', text: "Full-stack dev… .NET, Angular, and a bit of chaos.",      at: 4000  },
  { speaker: 'dev', text: "Hey Bee, wake up! Need your help — guide the people here.", at: 7500 },
  // bee wakes at 10000ms
  { speaker: 'bee', text: "…What? Where am I? Wait — no. Not again. 😤",            at: 11000 },
  { speaker: 'bee', text: "I'm a bug, not your assistant!",                          at: 15000 },
  { speaker: 'dev', text: "Do you wanna be de-bugged?",                              at: 18500 },
  { speaker: 'bee', text: "...Alright. 😒  Hi. I'm Bee.",                           at: 22000 },
  { speaker: 'bee', text: "I used to be a bug… but I evolved into a feature.",      at: 25500 },
  { speaker: 'bee', text: "He's the dev. I'm the reason things are interesting.",   at: 29000 },
  { speaker: 'dev', text: ":|",                                                      at: 32500 },
  { speaker: 'bee', text: "Alright. Let's explore.",                                 at: 35500 },
];

const SECTION_SCRIPTS = {
  about: [
    { speaker: 'bee', text: "He is very humble. 😌",                          at: 2500  },
    { speaker: 'dev', text: "I'm a guy who just likes to build things.",      at: 6500  },
    { speaker: 'bee', text: "This is where he pretends it's all under control.", at: 11000 },
    { speaker: 'dev', text: "It IS under control. 🙃",                        at: 15500 },
    { speaker: 'bee', text: "Sure it is. Now let's see his tech stack! 🔧",   at: 20000 },
  ],
  tech: [
    { speaker: 'bee', text: "He primarily speaks C#, JavaScript, SQL...",     at: 1500  },
    { speaker: 'bee', text: "Not sure he knows the remaining ones. 🤔",       at: 4500  },
    { speaker: 'dev', text: "I know the other things as well!",               at: 7500  },
    { speaker: 'bee', text: "Yeah. It breaks. You Google.",                   at: 10500 },
    { speaker: 'dev', text: "That's called being resourceful.",               at: 13500 },
    { speaker: 'bee', text: "Sure, whatever helps you sleep at night.",       at: 16500 },
    { speaker: 'bee', text: "Onto his work experience!",                      at: 19500 },
  ],
  experience: [
    { speaker: 'bee', text: "This is his work experience.",                   at: 1500  },
    { speaker: 'bee', text: "SPOILER ALERT: He survived. 🎉",                 at: 4500  },
    { speaker: 'dev', text: "I build systems that scale across borders.",     at: 7500  },
    { speaker: 'bee', text: "Yeah. He builds. Then it breaks in production.", at: 10500 },
    { speaker: 'dev', text: "Not all — I also debug production issues.",      at: 13500 },
    { speaker: 'bee', text: "With coffee. Lots of it. ☕",                    at: 16500 },
    { speaker: 'bee', text: "Now let's see his personal projects! 🛠️",       at: 19500 },
  ],
  projects: [
    { speaker: 'bee', text: "These are his projects. Some are stable...",     at: 500   },
    { speaker: 'dev', text: "ALL are stable.",                                at: 3000  },
    { speaker: 'bee', text: "...in development environments. 😅",            at: 5500  },
  ],
  contact: [
    { speaker: 'bee', text: "If you're impressed — hire him. 💼",            at: 500   },
    { speaker: 'dev', text: "Or collaborate! 🤝",                             at: 3000  },
    { speaker: 'bee', text: "Reach him through the options below.",           at: 5500  },
    { speaker: 'dev', text: "Okay Bee, thanks! Now shoo! 👋",                at: 8000  },
    { speaker: 'bee', text: "HEY! I will NOT tolerate this! 😡",             at: 10500 },
    { speaker: 'bee', text: "I might delete this site from existence. 💥",   at: 13000 },
  ],
};

const STING_MSGS = [
  "OW! That's MY sting! 😡",
  "BUZZ OFF! 😤",
  "I will haunt your dreams! 🌙",
  "Back. Off. Human. 🐛",
  "That was NOT the button! 😱",
  "You poked the wrong bug! 🎯",
];

const SECTION_ORDER = ['hero', 'about', 'experience', 'tech', 'projects', 'contact'];

// ── Main ──────────────────────────────────────────────────────────────────────
const BeeGuide = ({ enabled = true }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isSleeping, setIsSleeping]       = useState(true);
  const [isStinging, setIsStinging]       = useState(false);

  // Hero dev bubble (fixed near profile image)
  const [heroDevBubble, setHeroDevBubble] = useState({ show: false, text: '' });
  // Float bubble above bee (all sections)
  const [floatBubble, setFloatBubble]     = useState({ show: false, text: '', speaker: 'bee' });
  // About-section dev bubble (below navbar profile pic)
  const [navBubble, setNavBubble]         = useState({ show: false, text: '' });

  const activeSectionRef  = useRef('hero');
  const isSleepingRef     = useRef(true);
  const justWokeUpRef     = useRef(false);
  const heroTimers        = useRef([]);
  const sectionTimers     = useRef([]);
  const autoScrollRaf     = useRef(null);
  const autoScrollActive  = useRef(false);

  useEffect(() => { isSleepingRef.current = isSleeping; }, [isSleeping]);

  const updateSection = useCallback((section) => {
    activeSectionRef.current = section;
    setActiveSection(section);
    if (section !== 'hero') {
      heroTimers.current.forEach(clearTimeout);
      heroTimers.current = [];
      setHeroDevBubble({ show: false, text: '' });
      setFloatBubble(s => ({ ...s, show: false }));
      if (isSleepingRef.current) {
        isSleepingRef.current = false;
        justWokeUpRef.current = true;
        setIsSleeping(false);
      }
    }
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRaf.current) cancelAnimationFrame(autoScrollRaf.current);
    autoScrollRaf.current  = null;
    autoScrollActive.current = false;
  }, []);

  // Slowly scrolls through sectionId if it's taller than the viewport
  const startAutoScroll = useCallback((sectionId) => {
    stopAutoScroll();
    const el = document.getElementById(sectionId);
    if (!el || el.offsetHeight <= window.innerHeight * 1.05) return;

    autoScrollActive.current = true;
    const tick = () => {
      if (!autoScrollActive.current) return;
      if (activeSectionRef.current !== sectionId) { stopAutoScroll(); return; }
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
      if (atBottom) { stopAutoScroll(); return; }
      window.scrollBy(0, 1);
      autoScrollRaf.current = requestAnimationFrame(tick);
    };
    autoScrollRaf.current = requestAnimationFrame(tick);
  }, [stopAutoScroll]);

  // Cancel auto-scroll on any manual input
  useEffect(() => {
    if (!enabled) return;
    const cancel = () => stopAutoScroll();
    window.addEventListener('wheel',      cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    window.addEventListener('keydown',    cancel);
    return () => {
      window.removeEventListener('wheel',      cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown',    cancel);
    };
  }, [enabled, stopAutoScroll]);

  // ── Hero script (runs once) ────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;

    const T = (fn, ms) => { const t = setTimeout(fn, ms); heroTimers.current.push(t); };

    // Wake bee before first bee line
    T(() => {
      if (activeSectionRef.current !== 'hero') return;
      isSleepingRef.current = false;
      justWokeUpRef.current = true;
      setIsSleeping(false);
    }, 10000);

    HERO_SCRIPT.forEach(({ speaker, text, at }) => {
      T(() => {
        if (activeSectionRef.current !== 'hero') return;
        if (speaker === 'dev') {
          setHeroDevBubble({ show: true, text });
          setFloatBubble(s => ({ ...s, show: false }));
        } else {
          setFloatBubble({ show: true, text, speaker: 'bee' });
          setHeroDevBubble(s => ({ ...s, show: false }));
        }
      }, at);
    });

    // Hide all after last hero line, then scroll to about
    const lastAt = HERO_SCRIPT.at(-1).at;
    T(() => {
      setHeroDevBubble(s => ({ ...s, show: false }));
      setFloatBubble(s => ({ ...s, show: false }));
    }, lastAt + 2500);
    T(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }, lastAt + 3000);

    return () => heroTimers.current.forEach(clearTimeout);
  }, [enabled]);

  // ── Section scripts (re-runs on section change) ────────────────────────────
  useEffect(() => {
    if (!enabled || isSleeping || activeSection === 'hero') return;

    const script = SECTION_SCRIPTS[activeSection];
    if (!script) return;

    sectionTimers.current.forEach(clearTimeout);
    sectionTimers.current = [];
    stopAutoScroll(); // cancel any scroll from previous section
    const T = (fn, ms) => { const t = setTimeout(fn, ms); sectionTimers.current.push(t); };

    setHeroDevBubble(s => ({ ...s, show: false }));

    script.forEach(({ speaker, text, at }) => {
      T(() => {
        // Dev lines go near the navbar profile picture in all sections
        if (speaker === 'dev') {
          setNavBubble({ show: true, text });
          setFloatBubble(s => ({ ...s, show: false }));
        } else {
          setNavBubble(s => ({ ...s, show: false }));
          setFloatBubble({ show: true, text, speaker });
        }
      }, at);
    });

    const lastAt = script.at(-1).at;
    T(() => {
      setFloatBubble(s => ({ ...s, show: false }));
      setNavBubble(s => ({ ...s, show: false }));
    }, lastAt + 2500);

    const nextSection = SECTION_ORDER[SECTION_ORDER.indexOf(activeSection) + 1];
    if (nextSection) {
      T(() => {
        document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
      }, lastAt + 3000);
    }

    return () => sectionTimers.current.forEach(clearTimeout);
  }, [activeSection, isSleeping, enabled, stopAutoScroll, startAutoScroll]);

  // ── Scroll tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!enabled) return;
    const handleScroll = () => {
      let current = 'hero';
      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) current = id;
      }
      if (current !== activeSectionRef.current) updateSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled, updateSection]);

  // ── Sting click ───────────────────────────────────────────────────────────
  const handleBeeClick = useCallback(() => {
    if (isSleeping || isStinging) return;
    const msg = STING_MSGS[Math.floor(Math.random() * STING_MSGS.length)];
    setIsStinging(true);
    setFloatBubble({ show: true, text: msg, speaker: 'bee' });
    setTimeout(() => {
      setIsStinging(false);
      setFloatBubble(s => ({ ...s, show: false }));
    }, 2500);
  }, [isSleeping, isStinging]);

  const getPos = () => {
    const mobile = window.innerWidth < 768;
    switch (activeSection) {
      case 'hero':       return { top: '78%', left: mobile ? '60%' : '84%' };
      case 'about':      return { top: '45%', left: mobile ? '55%' : '80%' };
      case 'experience': return { top: '42%', left: mobile ? '55%' : '80%' };
      case 'tech':       return { top: '40%', left: '5%'                   };
      case 'projects':   return { top: '38%', left: mobile ? '55%' : '78%' };
      case 'contact':    return { top: '72%', left: mobile ? '55%' : '78%' };
      default:           return { top: '78%', left: mobile ? '60%' : '84%' };
    }
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (!enabled) return null;

  return (
    <>
      {/* Dev bubble in hero — fixed near profile image */}
      <AnimatePresence>
        {heroDevBubble.show && activeSection === 'hero' && (
          <HeroDevBubble key={heroDevBubble.text} text={heroDevBubble.text} isMobile={isMobile} />
        )}
      </AnimatePresence>

      {/* Dev bubble — fixed below navbar profile pic for all sections */}
      <AnimatePresence>
        {navBubble.show && (
          <NavDevBubble key={navBubble.text} text={navBubble.text} />
        )}
      </AnimatePresence>

      {/* Bee — float bubble is absolute child so it always tracks the bee */}
      <motion.div
        className="fixed z-[1000000] w-[150px] h-[150px] overflow-visible"
        style={{ cursor: isSleeping ? 'default' : 'pointer' }}
        animate={getPos()}
        initial={false}
        transition={{ type: 'spring', stiffness: 35, damping: 15 }}
        onClick={handleBeeClick}
      >
        <AnimatePresence>
          {isSleeping && <ZzzAnimation key="zzz" />}
        </AnimatePresence>

        <AnimatePresence>
          {floatBubble.show && (
            <FloatBubble key={floatBubble.text} text={floatBubble.text} speaker={floatBubble.speaker} />
          )}
        </AnimatePresence>

        {/* Sting jitter wrapper */}
        <motion.div
          animate={isStinging
            ? { x: [0, -10, 12, -8, 8, -5, 0], y: [0, -8, 4, -4, 0], scale: [1, 1.2, 0.9, 1.05, 1] }
            : {}}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ width: '100%', height: '100%' }}
        >
          <Canvas
            style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            shadows
            camera={{ position: [0, 0, 5], fov: 40 }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.8} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
              <pointLight position={[-10, -5, -10]} intensity={1} color="#915eff" />
              <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" />
              <StylizedBee isSleepingRef={isSleepingRef} justWokeUpRef={justWokeUpRef} />
            </Suspense>
          </Canvas>
        </motion.div>
      </motion.div>
    </>
  );
};

export default BeeGuide;
