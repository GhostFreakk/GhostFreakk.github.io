import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    name: "Project One",
    description: "A beautiful web application built with React and Node.js. Features include real-time updates, user authentication, and a modern UI design.",
    image: "/project1.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"]
  },
  {
    id: 2,
    name: "Project Two",
    description: "An innovative mobile app that helps users track their daily activities and achieve their goals. Built with React Native and Firebase.",
    image: "/project2.jpg",
    technologies: ["React Native", "Firebase", "Redux", "TypeScript"]
  }
];

const ProjectCard = ({ project, isHovered, onHover }) => {
  return (
    <motion.div
      onHoverStart={() => onHover(project.id)}
      onHoverEnd={() => onHover(null)}
      className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden bg-white/10 flex-shrink-0"
    >
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/20 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-12">My Work</h1>
        
        <div className="relative">
          <div className="overflow-x-auto pb-8">
            <div className="flex gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isHovered={hoveredProject === project.id}
                  onHover={setHoveredProject}
                />
              ))}
            </div>
          </div>
          
          {/* Gradient fade effect */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
};

export default Work; 