import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function TextAnimate({ children, animation = "slideUp", by = "word", className = "", delay = 0 }) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    if (by === "word") {
      setWords(children.split(" "));
    } else {
      setWords(children.split(""));
    }
  }, [children, by]);

  const getAnimation = () => {
    switch (animation) {
      case "slideUp":
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        };
      case "fadeIn":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5 }
        };
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 }
        };
    }
  };

  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          {...getAnimation()}
          transition={{
            ...getAnimation().transition,
            delay: delay + index * 0.1
          }}
          className="mr-1"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
} 