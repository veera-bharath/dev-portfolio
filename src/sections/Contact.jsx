import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const LinkedInIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'veerabharath1029@gmail.com',
    href: 'mailto:veerabharath1029@gmail.com',
  },
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'veera-bharath-durgam',
    href: 'https://www.linkedin.com/in/veera-bharath-durgam',
  },
  {
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@veera_bharath_007',
    href: 'https://instagram.com/veera_bharath_007',
  },
  {
    icon: Phone,
    label: 'Mobile',
    value: '+91 7989966984',
    href: 'tel:+917989966984',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[18px] text-[#88c0d0] font-mono uppercase tracking-widest">Get in touch</p>
          <h3 className="text-[50px] font-bold text-white mb-12">Contact.</h3>
        </motion.div>

        <div className="flex flex-col gap-5 max-w-xl">
          {contacts.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-5 bg-[#1a1e26] border border-white/5 rounded-2xl p-6 hover:border-[#88c0d0]/40 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0b0e14] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#88c0d0]/40 transition-colors">
                <Icon className="w-5 h-5 text-[#88c0d0]" />
              </div>
              <div>
                <p className="text-[#9da5b4] font-mono text-xs uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white font-mono text-[15px]">{value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <footer className="mt-20 text-center py-10 border-t border-white/5">
        <p className="text-[#9da5b4] font-mono text-sm">
          © {new Date().getFullYear()} Bharath. Built with .NET precision and Angular focus.
        </p>
      </footer>
    </section>
  );
};

export default Contact;
