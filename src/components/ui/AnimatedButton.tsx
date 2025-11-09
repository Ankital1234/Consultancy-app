import { motion } from 'framer-motion';
import { Button, ButtonProps } from './button';
import { ReactNode } from 'react';

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  variant?: 'default' | 'slide' | 'bounce' | 'pulse' | 'glow';
  delay?: number;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  variant = 'default',
  delay = 0,
  className = '',
  ...props
}) => {
  const getAnimationProps = () => {
    switch (variant) {
      case 'slide':
        return {
          whileHover: { x: 5 },
          whileTap: { scale: 0.95 },
          transition: { type: "spring", stiffness: 400, damping: 25 }
        };
      case 'bounce':
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: "spring", stiffness: 600, damping: 20 }
        };
      case 'pulse':
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { duration: 0.2 }
        };
      case 'glow':
        return {
          whileHover: { 
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            scale: 1.02
          },
          whileTap: { scale: 0.98 },
          transition: { duration: 0.3 }
        };
      default:
        return {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
          transition: { duration: 0.2 }
        };
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      {...getAnimationProps()}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
