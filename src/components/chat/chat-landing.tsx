'use client';

import { motion } from 'framer-motion';
import React from 'react';

const ChatLanding: React.FC = () => {
  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
     
    </motion.div>
  );
};

export default ChatLanding;
