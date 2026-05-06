import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../constants/data';
import { Code2, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15, duration: 0.4 }}
      className="glass-card overflow-hidden group flex-shrink-0"
      style={{ width: '320px' }}
    >
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt="project_image"
          className="w-full h-full object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 flex justify-end m-3 gap-2">
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className="w-10 h-10 rounded-full bg-[#050816]/80 flex justify-center items-center cursor-pointer hover:bg-[#915eff] transition-colors duration-300 shadow-[0_0_10px_rgba(145,94,255,0.3)]"
          >
            <Code2 className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-[#9da5b4] text-[14px] leading-relaxed">{description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[12px] font-mono px-2 py-1 rounded bg-[#1a1e26] border border-white/5 ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ScrollBtn = ({ onClick, visible, children, side }) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      [side]: '-20px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 10,
      width: '40px', height: '40px', borderRadius: '50%',
      background: 'rgba(26,30,38,0.9)',
      border: '1px solid rgba(255,255,255,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', color: '#88c0d0',
      boxShadow: '0 0 12px rgba(0,255,255,0.15)',
      transition: 'opacity 0.2s, border-color 0.2s, box-shadow 0.2s',
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,255,0.5)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(0,255,255,0.3)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(0,255,255,0.15)'; }}
  >
    {children}
  </button>
);

const Projects = () => {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // threshold of 32px avoids false-positives from sub-pixel rounding / tiny overflows
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 32);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // ResizeObserver fires after Framer Motion animations settle the card layout
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    el.addEventListener('scroll', checkScroll, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[18px] text-[#88c0d0] font-mono uppercase tracking-widest">My work</p>
        <h2 className="text-[36px] sm:text-[50px] font-bold text-white">Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3 text-[#d8dee9] text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through real-world examples of my work. 
          Each project is briefly described with links to code repositories and live demos. 
          It reflects my ability to solve complex problems and work with different technologies.
        </motion.p>
      </div>

      <div className="mt-20 relative" style={{ padding: '0 24px' }}>
        <ScrollBtn onClick={() => scroll(-1)} visible={canLeft} side="left">
          <ChevronLeft size={18} />
        </ScrollBtn>

        <div
          ref={scrollRef}
          className="flex flex-row gap-6 overflow-x-auto pb-4 projects-scroll"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>

        <ScrollBtn onClick={() => scroll(1)} visible={canRight} side="right">
          <ChevronRight size={18} />
        </ScrollBtn>
      </div>
    </section>
  );
};

export default Projects;
