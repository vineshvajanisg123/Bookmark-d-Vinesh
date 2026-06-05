import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen } from "lucide-react";

interface Screen3LoadingProps {
  lovedBook: string;
  onFinished: () => void;
}

export default function Screen3Loading({ lovedBook, onFinished }: Screen3LoadingProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    "Analyzing reading preferences...",
    "Finding patterns...",
    "Understanding learning style...",
    "Building Reading DNA..."
  ];

  useEffect(() => {
    // Progress through the messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(messageInterval);
          return prev;
        }
      });
    }, 1200);

    // Call onFinished after 5.0 seconds
    const redirectTimer = setTimeout(() => {
      onFinished();
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(redirectTimer);
    };
  }, [onFinished]);

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#1E1E1B] flex flex-col items-center justify-between py-16 px-6 relative overflow-hidden" id="loading-screen">
      {/* Cinematic grid / starry background */}
      <div className="absolute inset-0 bg-[radial-gradient(#365947_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <header className="z-10 text-center space-y-1">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#365947] font-semibold block">COGNITIVE COMPILING</span>
        <span className="text-xs font-serif text-brand-muted italic">Bookmarkd Sanctuary System</span>
      </header>

      {/* Main visual constellation space */}
      <div className="relative w-80 h-80 flex items-center justify-center z-10 my-auto">
        {/* Orbit paths */}
        <div className="absolute w-72 h-72 rounded-full border border-[#365947]/5 animate-ping [animation-duration:6s]" />
        <div className="absolute w-56 h-56 rounded-full border border-[#365947]/10 animate-spin [animation-duration:20s]" />
        <div className="absolute w-40 h-40 rounded-full border border-[#365947]/15 animate-spin [animation-duration:10s]" />

        {/* Center Node (The Loved Book) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.05, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-24 h-32 bg-[#365947] rounded-xs shadow-xl border border-white/20 p-3 flex flex-col justify-between align-center text-center z-20"
        >
          <div className="w-4 h-4 bg-white/20 rounded-full mx-auto flex items-center justify-center">
            <BookOpen className="text-white w-2.5 h-2.5" />
          </div>
          <p className="font-serif text-[8.5px] font-medium text-[#F8F6F1] line-clamp-3 leading-tight uppercase tracking-wider">
            {lovedBook || "Loved Book"}
          </p>
          <span className="text-[7px] text-[#F8F6F1]/50 font-mono tracking-widest">CENTER</span>
        </motion.div>

        {/* Sub-nodes connected by lines */}
        {[
          { angle: 0, x: 110, y: -60, tag: "PATTERN" },
          { angle: 72, x: 120, y: 70, tag: "COGNITIVE" },
          { angle: 144, x: -120, y: 90, tag: "THEME" },
          { angle: 216, x: -110, y: -80, tag: "CURIO" },
          { angle: 288, x: 0, y: -130, tag: "ANOMALY" },
        ].map((node, index) => {
          const delay = index * 0.4;
          return (
            <div key={index} className="absolute inset-0 flex items-center justify-center">
              {/* Connecting line */}
              <svg className="absolute w-80 h-80 pointer-events-none stroke-current" style={{ overflow: "visible" }}>
                <line
                  x1="160"
                  y1="160"
                  x2={160 + node.x}
                  y2={160 + node.y}
                  stroke="#365947"
                  strokeOpacity="0.15"
                  strokeWidth="0.75"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Connected tags */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 5 + index, delay }}
                className="absolute bg-[#FCFBF8] border border-[#E8E2D8] px-2 py-1 rounded-full shadow-xs text-[7px] tracking-widest font-mono text-[#365947] font-semibold"
                style={{
                  transform: `translate(${node.x}px, ${node.y}px)`
                }}
              >
                {node.tag}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Narrative Progress Message with Crossfades */}
      <div className="z-10 text-center w-full max-w-sm h-16 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="space-y-1"
          >
            <p className="font-serif italic text-base md:text-lg text-brand-text">
              {loadingMessages[messageIndex]}
            </p>
            <div className="flex justify-center gap-1.5 pt-2">
              {loadingMessages.map((_, dotIdx) => (
                <div
                  key={dotIdx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    dotIdx === messageIndex ? "w-6 bg-[#365947]" : "w-1.5 bg-[#E8E2D8]"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="z-10 text-center">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#5E5A55]/70 block">
          Please wait. The sanctuary is listening.
        </span>
      </footer>
    </div>
  );
}
