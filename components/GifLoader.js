"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const SLoader = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1000); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 flex items-center justify-center bg-[#fff] z-[9999]"
        >
          <img
            src="https://res.cloudinary.com/duln5xyix/image/upload/v1760965077/vivica__visual_identity_page-0003-removebg-preview_1_gibque.png"
            alt="S Loader"
            width={400}
            height={400}
            className="w-72 h-72 object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SLoader;
