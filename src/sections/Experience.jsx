import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../constants/data';

const ExperienceCard = ({ experience }) => {
  return (
    <div className="relative pl-8 pb-12 border-l border-[#88c0d0]/20 last:pb-0">
      <div className="absolute left-[-9px] top-0 w-4 h-4 bg-[#88c0d0] rounded-full border-4 border-[#0b0e14]"></div>

      <div className="glass-card p-6 hover:border-[#88c0d0]/50 transition-all duration-300">
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p className="text-[#88c0d0] text-[16px] font-semibold" style={{ margin: 0 }}>
          {experience.company_name}
        </p>
        <p className="text-[#9da5b4] text-[14px] font-mono mt-1">{experience.date}</p>

        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-[#d8dee9] text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="section-padding bg-[#0b0e14]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[18px] text-[#88c0d0] font-mono uppercase tracking-widest text-center">What I have done so far</p>
        <h2 className="text-[50px] font-bold text-white text-center">Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col max-w-4xl mx-auto">
        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;
