import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../constants/data';
import { Menu, X, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import profileImg from '../assets/profile.png';

const GuideSwitch = ({ isGuided, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label="Toggle guide mode"
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: 44,
      height: 24,
      borderRadius: 12,
      border: isGuided ? '1px solid #00ffff' : '1px solid rgba(255,255,255,0.2)',
      background: isGuided ? 'rgba(0,255,255,0.15)' : 'rgba(255,255,255,0.08)',
      cursor: 'pointer',
      transition: 'background 0.25s, border-color 0.25s',
      flexShrink: 0,
      outline: 'none',
      padding: 0,
    }}
  >
    <span
      style={{
        position: 'absolute',
        top: 3,
        left: 3,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: isGuided ? '#00ffff' : 'rgba(255,255,255,0.35)',
        transform: isGuided ? 'translateX(20px)' : 'translateX(0)',
        transition: 'transform 0.25s, background 0.25s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 10,
        lineHeight: 1,
      }}
    />
  </button>
);

const Navbar = ({ scrolled, isGuided, onToggleGuide }) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={`w-full flex items-center py-5 fixed top-0 z-20 transition-all duration-300 ${scrolled ? 'bg-[#0b0e14]/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-6">
        <Link
          to="/"
          className="flex items-center gap-4"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {scrolled ? (
            <motion.img 
              layoutId="profile-img"
              src={profileImg} 
              alt="Veera Bharath" 
              className="w-10 h-10 rounded-full border-2 border-[#00ffff] object-cover"
            />
          ) : (
            <Code2 className="w-8 h-8 text-[#88c0d0]" />
          )}
          <p className="text-white text-[18px] font-bold cursor-pointer flex font-mono">
            DevPortfolio &nbsp;
            <span className="sm:block hidden text-[#88c0d0]">| .NET Engineer</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-10 items-center">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-[#88c0d0]" : "text-[#d8dee9]"
              } hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-200`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <li className="flex items-center gap-2">
            <span className="text-[13px] font-mono text-[#d8dee9] select-none">🐝 Guide</span>
            <GuideSwitch isGuided={isGuided} onToggle={onToggleGuide} />
          </li>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <div onClick={() => setToggle(!toggle)} className="cursor-pointer">
            {toggle ? <X className="text-white" /> : <Menu className="text-white" />}
          </div>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-[#1a1e26] absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl border border-white/10`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-[#d8dee9]"
                  } font-mono text-[16px] cursor-pointer`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              <li className="flex items-center gap-2 pt-1 border-t border-white/10 w-full">
                <span className="text-[13px] font-mono text-[#d8dee9] select-none">🐝 Guide</span>
                <GuideSwitch isGuided={isGuided} onToggle={onToggleGuide} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
