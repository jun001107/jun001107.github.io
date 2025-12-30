import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

// Define outside to ensure stability across renders
const MESSAGES = ["Hello", "Welcome", "This is Junghoon"];
const STEP_DURATION = 1500; // 1.5 seconds per message
const TOTAL_DURATION = STEP_DURATION * MESSAGES.length; // 4.5 seconds

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    // 1.5s timer for each text step
    const timer = setTimeout(() => {
      if (textIndex < MESSAGES.length - 1) {
        setTextIndex((prev) => prev + 1);
      } else {
        onComplete();
      }
    }, STEP_DURATION);

    return () => clearTimeout(timer);
  }, [textIndex, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center cursor-none select-none"
      exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
    >
      {/* Centered Text Animation */}
      <div className="flex-1 flex items-center justify-center w-full max-w-2xl px-8 relative">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={textIndex}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-center absolute w-full"
          >
            <h1 className={`font-medium tracking-tight ${textIndex === 2 ? 'text-2xl sm:text-3xl text-gray-200' : 'text-4xl sm:text-6xl font-bold'}`}>
              {MESSAGES[textIndex]}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Progress Bar */}
      <div className="pb-24 w-64 sm:w-80 relative z-10">
        <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: TOTAL_DURATION / 1000, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;