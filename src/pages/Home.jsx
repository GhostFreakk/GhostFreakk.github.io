import { useState, useEffect } from 'react';

const quotes = [
  "Talk is cheap. Show me the code. – Linus Torvalds",
  "Programs must be written for people to read, and only incidentally for machines to execute. – Harold Abelson",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
  "In order to be irreplaceable, one must always be different. – Coco Chanel",
  "Java is to JavaScript what car is to Carpet. – Chris Heilmann",
  "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code. – Dan Salomon",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. – Martin Fowler",
  "Simplicity is the soul of efficiency. – Austin Freeman",
  "Before software can be reusable it first has to be usable. – Ralph Johnson",
  "Make it work, make it right, make it fast. – Kent Beck",
  "The best error message is the one that never shows up. – Thomas Fuchs",
  "The most disastrous thing that you can ever learn is your first programming language. – Alan Kay",
  "The only way to learn a new programming language is by writing programs in it. – Dennis Ritchie",
  "If debugging is the process of removing software bugs, then programming must be the process of putting them in. – Edsger Dijkstra"
];

const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];

const Home = ({ onReveal, isRevealed }) => {
  const [currentQuote, setCurrentQuote] = useState(getRandomQuote());

  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  const handleReveal = () => {
    if (!isRevealed) {
      onReveal();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center justify-center w-full">
        <div 
          className="relative flex flex-col items-center justify-center select-none cursor-pointer"
          style={{ minHeight: '320px' }}
          onClick={handleReveal}
        >
          <h1
            className={`text-[8vw] md:text-[7vw] lg:text-[6vw] font-extrabold tracking-tight text-center metallic-gradient-text transition-all duration-1000 ${isRevealed ? 'shine-glow' : 'dimmed'} ${isRevealed ? 'scale-105' : ''}`}
            style={{
              lineHeight: 1.1,
              letterSpacing: '-0.05em',
              cursor: isRevealed ? 'default' : 'pointer',
              userSelect: 'none',
            }}
          >
            GHOST
          </h1>
          {isRevealed && (
            <p className="mt-6 text-2xl md:text-3xl text-gray-400 max-w-2xl mx-auto text-center mb-0 dim-quote animate-fade-in">
              {currentQuote}
            </p>
          )}
        </div>
      </div>
      <style>{`
        .metallic-gradient-text {
          background: linear-gradient(120deg, #e0e0e0 10%, #b0b0b0 30%, #f5f5f5 50%, #a3a3a3 70%, #e0e0e0 100%);
          background-size: 200% 200%;
          background-position: left center;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          animation: metallic-gradient-move 4s linear infinite;
        }
        @keyframes metallic-gradient-move {
          0%, 100% {
            background-position: left center;
          }
          50% {
            background-position: right center;
          }
        }
        .shine-glow {
          filter: drop-shadow(0 0 32px #fff) drop-shadow(0 0 64px #b0b0b0) drop-shadow(0 0 8px #fff8);
          opacity: 1;
          transition: filter 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .dimmed {
          filter: none;
          opacity: 0.4;
          transition: filter 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .dim-quote {
          opacity: 0.7;
        }
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;