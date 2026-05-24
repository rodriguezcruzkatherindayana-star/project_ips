import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScreenTransitionProps {
  children: ReactNode;
}

export const ScreenTransition: React.FC<ScreenTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};