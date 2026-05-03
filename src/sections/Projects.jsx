import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../constants/data';
import { Code2, ExternalLink } from 'lucide-react';

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="glass-card overflow-hidden group"
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

const Projects = () => {
  return (
    <section id="projects" className="section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[18px] text-[#88c0d0] font-mono uppercase tracking-widest">My work</p>
        <h2 className="text-[50px] font-bold text-white">Projects.</h2>
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

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
