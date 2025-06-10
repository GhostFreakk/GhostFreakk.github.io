import { motion } from 'framer-motion';
import * as Progress from '@radix-ui/react-progress';
//import myPhoto from '../assets/myphoto.jpg';
import myGif from '../assets/ghost.gif';

const skills = [
  { name: 'C++', value: 95 },
  { name: 'ASM', value: 96 },
  { name: 'RUST', value: 100 },
  { name: 'Node.js', value: 75 },
  { name: 'UI/UX Development', value: 100 },
  { name: 'CSS/Tailwind', value: 90 },
];

const About = () => {
  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <div className="aspect-square rounded-2xl overflow-hidden bg-white/10">
            <img
              src={myGif}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Ahmed Shafiq</h1>
            <p className="text-xl text-gray-400">Age: 16</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-gray-400 leading-relaxed">
            Hey, I'm Ghosty — a 16-year-old engineer, gamer, and student deeply into Linux, cybersecurity, and low-level programming. I love exploring tech, customizing systems, and learning everything from OS internals to spiritual growth in marriage. Always curious, always building, always evolving.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Skills</h2>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.value}%</span>
                  </div>
                  <Progress.Root
                    className="relative overflow-hidden bg-white/10 rounded-full w-full h-2"
                    value={skill.value}
                  >
                    <Progress.Indicator
                      className="bg-white w-full h-full transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${100 - skill.value}%)` }}
                    />
                  </Progress.Root>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 