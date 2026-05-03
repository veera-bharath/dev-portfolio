import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible.');
      setForm({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="section-padding overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row gap-10 overflow-hidden max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-[0.75] bg-[#1a1e26] p-8 rounded-2xl border border-white/5"
        >
          <p className="text-[18px] text-[#88c0d0] font-mono uppercase tracking-widest">Get in touch</p>
          <h3 className="text-[50px] font-bold text-white mb-8">Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2 font-mono">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-[#0b0e14] py-4 px-6 placeholder:text-[#9da5b4] text-white rounded-lg outline-none border border-white/10 focus:border-[#88c0d0] transition-colors font-mono"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2 font-mono">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="bg-[#0b0e14] py-4 px-6 placeholder:text-[#9da5b4] text-white rounded-lg outline-none border border-white/10 focus:border-[#88c0d0] transition-colors font-mono"
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-2 font-mono">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-[#0b0e14] py-4 px-6 placeholder:text-[#9da5b4] text-white rounded-lg outline-none border border-white/10 focus:border-[#88c0d0] transition-colors font-mono resize-none"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-[#88c0d0] py-3 px-8 rounded-xl outline-none w-fit text-[#0b0e14] font-bold shadow-md hover:bg-[#81a1c1] transition-colors flex items-center gap-2"
            >
              {loading ? "Sending..." : "Send"}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px] flex items-center justify-center"
        >
          {/* We can add a 3D Earth or another model here */}
          <div className="w-full h-full glass-card flex flex-col items-center justify-center p-10 text-center">
             <div className="w-32 h-32 rounded-full border-4 border-[#88c0d0]/20 flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-[#88c0d0]/40 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-[#88c0d0] flex items-center justify-center animate-pulse">
                      <Send className="w-8 h-8 text-[#0b0e14]" />
                   </div>
                </div>
             </div>
             <h4 className="text-white text-2xl font-bold mb-2">Let's Build Something Great</h4>
             <p className="text-[#9da5b4] font-mono">I'm currently available for freelance work or full-time opportunities.</p>
          </div>
        </motion.div>
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
