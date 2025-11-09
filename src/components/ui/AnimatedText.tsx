import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  variant?: 'fade' | 'slide' | 'typewriter' | 'wave' | 'gradient';
  delay?: number;
  duration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  variant = 'fade',
  delay = 0,
  duration = 0.6
}) => {
  const getTextVariants = () => {
    switch (variant) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        };
      case 'slide':
        return {
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        };
      case 'typewriter':
        return {
          hidden: { width: 0 },
          visible: {
            width: 'auto',
            transition: {
              duration: duration * 2,
              delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          },
        };
      case 'wave':
        return {
          hidden: { y: 20 },
          visible: {
            y: 0,
            transition: {
              duration: duration / 2,
              delay,
              type: "spring",
              stiffness: 100,
            },
          },
        };
      case 'gradient':
        return {
          hidden: { backgroundPosition: '0% 50%' },
          visible: {
            backgroundPosition: '100% 50%',
            transition: {
              duration: duration * 3,
              delay,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            },
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              duration,
              delay,
            },
          },
        };
    }
  };

  const textVariants = getTextVariants();

  if (variant === 'gradient') {
    return (
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className={`bg-gradient-to-r from-brand-blue-600 via-brand-purple-600 to-brand-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === 'wave' && typeof children === 'string') {
    return (
      <div className={className}>
        {children.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{
              duration: duration / 2,
              delay: delay + index * 0.05,
              type: "spring",
              stiffness: 100,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={textVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedText;
