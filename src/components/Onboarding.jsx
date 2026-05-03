import React from 'react';
import { motion } from 'framer-motion';

const Onboarding = ({ onSelect }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000000] flex items-center justify-center bg-[#050816]/95 backdrop-blur-xl px-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-md w-full glass-card p-10 text-center border-[#00ffff]/20"
      >
        <h2 className="text-[32px] font-extrabold text-white mb-4">
          Welcome to <span className="text-gradient">Veera's Space</span>
        </h2>
        <p className="text-[#aaa6c3] text-[16px] mb-10 leading-relaxed">
          How would you like to explore my journey? I have a little helper if you're new around here.
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => onSelect(true)}
            className="w-full py-4 bg-[#915eff] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(145,94,255,0.4)] hover:scale-105 transition-all group"
          >
            Guide Me 🐝
            <span className="block text-[10px] opacity-70 font-normal mt-1">Active mascot will tour you around</span>
          </button>
          
          <button 
            onClick={() => onSelect(false)}
            className="w-full py-4 bg-transparent border border-white/10 text-[#aaa6c3] font-bold rounded-xl hover:bg-white/5 hover:text-white transition-all"
          >
            Explore Alone 🚀
            <span className="block text-[10px] opacity-70 font-normal mt-1">I know my way around</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Onboarding;
