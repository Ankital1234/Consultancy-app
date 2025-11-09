import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  yOffset?: number;
  className?: string;
}

const FloatingElement = ({ 
  children, 
  duration = 3, 
  yOffset = 10,
  className = '' 
}: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;

