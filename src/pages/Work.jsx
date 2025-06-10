import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    name: "GhostFreak OS",
    description: "GhostFreak OS is a Linux distribution that is designed to be a lightweight and fast operating system. It is based on Ubuntu and uses the latest and greatest technologies to provide a seamless and user-friendly experience.",
    image: "https://github.com/GhostFreakOS/GhostFreakOS/raw/main/GhostFR%20banner.png?raw=true",
    technologies: ["asm", "Linux", "zensh", "C++"],
    url: "https://github.com/GhostFreakOS"
  },
  {
    id: 2,
    name: "Zenshell(zenshell)",
    description: "Zenshell is a shell that is designed to be a lightweight and fast shell. It is based on the Zsh shell and uses the latest and greatest technologies to provide a seamless and user-friendly experience.",
    image: "https://cdn.discordapp.com/attachments/1363544277510000851/1363544277933887509/file_000000005fd06246a6075eb8afc7f559_conversation_id68051566-dff4-8000-a511-272961c8797bmessage_id4a972eb0-f8be-4e1b-97d4-1eb1dd35a440.png?ex=6849a791&is=68485611&hm=863c58dca70855bfc61e4e1d8c005dc505b44d9e244531b66dfd6116997d3d7c&",
    technologies: ["C++", "Linux", "Lua"],
    url: "https://github.com/GhostFreakk/zenshell"
  },
  {
    id: 3,
    name: "Aracane-Echos ",
    description: "Aracane-Echos is a python adventure game set in a mystical forest where your choices determine your fate. Explore different paths, solve riddles, collect items, and earn achievements in this interactive story-driven experience..",
    image: "https://ghostfreakk.github.io/Aracane-Echos/pixel-art/pixel-chest.svg",
    technologies: ["Python"],
    url: "https://github.com/GhostFreakk/Aracane-Echos"
  }
];

const org = [
  {
    id: 1,
    name: "GhostFR inc.",
    description: "A leading technology company focused on innovative solutions and cutting-edge development.",
    image: "https://avatars.githubusercontent.com/u/215013936?s=400&u=0d81b036720a15566d4dfe5d0516edf3dc5c69db&v=4",
    url: "https://github.com/GhostFreakOS",
    role: "Company",
    team: [
      {
        name: "Aisha",
        url: "https://github.com/aaa1sh4",
        role: "MY BEAUTFUL WIFE AND MY PARTNER IN CRIME",
        image: "https://avatars.githubusercontent.com/u/215178640?v=4"
      },
      {
        name: "Asaad",
        url: "https://github.com/asaadzx", 
        role: "MY BSF and Co-owner",
        image: "https://avatars.githubusercontent.com/u/160162342?v=4"
      }
    ]
  }
];

const ProjectCard = ({ project, isHovered, onHover }) => {
  return (
    <motion.div
      onHoverStart={() => onHover(project.id)}
      onHoverEnd={() => onHover(null)}
      className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden bg-white/10 flex-shrink-0 cursor-pointer"
      onClick={() => window.open(project.url, '_blank')}
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

const OrgCard = ({ org }) => {
  return (
    <motion.div
      className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden bg-white/10 flex-shrink-0"
    >
      <div className="absolute inset-0">
        <img
          src={org.image}
          alt={org.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold mb-2">{org.name}</h3>
        <p className="text-gray-300 mb-4">{org.description}</p>
        <a href={org.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Visit Organization</a>
      </div>
    </motion.div>
  );
};

const TeamCard = ({ member }) => {
  return (
    <motion.div
      className="relative w-[300px] h-[400px] rounded-2xl overflow-hidden bg-white/10 flex-shrink-0"
    >
      <div className="absolute inset-0">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold mb-2">{member.name}</h3>
        <p className="text-gray-300 mb-4">{member.role}</p>
        <a href={member.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Visit Profile</a>
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

        {/* Organization Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Organization</h2>
          <div className="flex gap-8">
            {org.map((orgItem) => (
              <OrgCard key={orgItem.id} org={orgItem} />
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Team</h2>
          <div className="flex gap-8">
            {org[0].team.map((member) => (
              <TeamCard key={member.url} member={member} />
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="relative">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
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