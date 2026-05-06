import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from '../components/canvas/HeroCanvas';

import profileImg from '../assets/profile.png';

const Hero = ({ scrolled }) => {
  return (
    <section id="hero" className="relative w-full h-screen mx-auto flex items-center justify-center overflow-hidden">

      {/* 3D Background */}
      <div className="absolute inset-0">
        <HeroCanvas />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-left px-6 max-w-7xl w-full mt-[-50px]">
        
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass-card p-6 lg:p-10 rounded-2xl shadow-card backdrop-blur-md border border-white/10"
          style={{ flex: 1.2 }}
        >
          <h1 className="text-[32px] md:text-[42px] lg:text-[60px] font-extrabold text-white leading-tight">
            Hi, I'm <span className="text-gradient">Veera Bharath</span>
          </h1>
          <p className="text-[15px] sm:text-[18px] md:text-[22px] text-[#aaa6c3] mt-6 font-mono">
            .NET + Angular developer focused on C# and modern web UI. I ship enterprise apps by day and AI-powered side projects by night.
          </p>
          <div className="mt-10 flex flex-wrap justify-start">
            <a href="#experience" className="m-3 ml-0 px-8 py-4 bg-[#915eff] text-white font-bold rounded-lg shadow-[0_0_20px_rgba(145,94,255,0.6)] hover:bg-[#a87bff] hover:scale-105 transition-all duration-300">
              View My Work
            </a>
            <a href="#contact" className="m-3 px-8 py-4 bg-transparent border-2 border-[#00ffff] text-[#00ffff] font-bold rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:bg-[#00ffff]/10 hover:scale-105 transition-all duration-300">
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right Side: Profile Image */}
        <div
          className="hidden md:flex justify-center items-center md:mt-0"
          style={{ flex: 1 }}
        >
          {!scrolled && (
            <motion.img
              layoutId="profile-img"
              src={profileImg}
              alt="Veera Bharath"
              className="rounded-full border-4 border-[#00ffff] object-cover shadow-[0_0_30px_rgba(0,255,255,0.4)]"
              style={{ width: 'clamp(180px, 40vw, 300px)', height: 'clamp(180px, 40vw, 300px)' }}
            />
          )}
        </div>

      </div>

      {/* Decorative Scroll Down element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div className="w-[2px] h-12 bg-gradient-to-b from-[#00ffff] to-transparent animate-pulse"></div>
        <p className="text-[12px] font-mono uppercase tracking-widest text-[#00ffff]">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;
