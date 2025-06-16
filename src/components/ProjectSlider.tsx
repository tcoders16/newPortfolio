
import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import type { Project } from '../shared/data';

interface ProjectSliderProps {
  projects: Project[];
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects }) => {
  return (
    <div className="relative w-full bg-black text-white py-20 px-6 overflow-hidden">
      <motion.h2
        className="text-sm md:text-base uppercase tracking-widest text-gray-400 mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Projects
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
          >
            <Tilt
              glareEnable={true}
              glareMaxOpacity={0.12}
              tiltMaxAngleX={6}
              tiltMaxAngleY={6}
              scale={1.02}
              transitionSpeed={2500}
              className="w-full"
            >
              <div className="rounded-3xl p-4 bg-white/5 backdrop-blur-md border border-white/10 
                  shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-300 
                  hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.03] hover:brightness-125">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-60 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.subtitle}</p>
              </div>
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProjectSlider;