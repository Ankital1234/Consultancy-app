import { motion } from 'framer-motion';

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedGradient = ({ className = '', children }: AnimatedGradientProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedGradient;

