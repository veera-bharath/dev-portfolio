import React from 'react';
import { motion } from 'framer-motion';
import { technologies } from '../constants/data';

const row1 = technologies.slice(0, 10);
const row2 = technologies.slice(10);

const TechCard = ({ tech }) => (
  <div
    className="flex-shrink-0 w-28 h-28 flex flex-col items-center justify-center glass-card p-4 group cursor-pointer hover:scale-110 transition-transform duration-300"
    style={{ margin: '0 12px' }}
  >
    <img
      src={tech.icon}
      alt={tech.name}
      className="w-12 h-12 object-contain transition-all duration-300"
    />
    <p className="text-[12px] mt-2 font-mono text-[#9da5b4] group-hover:text-white text-center leading-tight">
      {tech.name}
    </p>
  </div>
);

const MarqueeRow = ({ items, reverse = false }) => {
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        data-bee-marquee="true"
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `${reverse ? 'marquee-rtl' : 'marquee-ltr'} 30s linear infinite`,
        }}
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {doubled.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
};

const Tech = () => (
  <section id="tech" className="section-padding overflow-hidden">
    <style>{`
      @keyframes marquee-ltr {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes marquee-rtl {
        0%   { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
    `}</style>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-20"
    >
      <p className="text-[18px] text-[#88c0d0] font-mono uppercase tracking-widest">My Toolbox</p>
      <h2 className="text-[50px] font-bold text-white">Technologies.</h2>
    </motion.div>

    <div className="flex flex-col gap-8">
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reverse />
    </div>
  </section>
);

export default Tech;
