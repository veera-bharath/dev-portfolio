import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../constants/data';

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    data-bee-id={`service-${index}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15, duration: 0.4 }}
    whileHover={{ scale: 1.07 }}
    className="flex flex-col items-center gap-3 rounded-2xl border border-white/5 transition-all"
    style={{
      width: '100%',
      minHeight: '110px',
      padding: '16px',
      background: '#1a1e26',
      cursor: 'default',
      justifyContent: 'center',
    }}
  >
    <img src={icon} alt={title} className="w-10 h-10 object-contain" />
    <p className="text-white font-semibold text-center" style={{ fontSize: '13px', lineHeight: '1.3' }}>{title}</p>
  </motion.div>
);

// Import removed
const About = () => {
  return (
    <section id="about" className="section-padding">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[18px] text-[#88c0d0] font-mono uppercase tracking-widest">Introduction</p>
            <h2 className="text-[36px] sm:text-[50px] font-bold text-white">Overview.</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 text-[#aaa6c3] text-[17px] max-w-3xl leading-[30px]"
          >
            I don't just write code, I negotiate with bugs 🤝🐛. Bugs are not errors… They're just undocumented features waiting to be understood. Off the keyboard, I'm solving puzzles, mixing colours, and occasionally touching grass 🌱.
            <br /><br />
            <span className="text-[#00ffff] font-mono">⚡ Automating the boring, building the fun, breaking things occasionally.</span>
          </motion.p>
        </div>
      </div>

      <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1.25rem' }}>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default About;
