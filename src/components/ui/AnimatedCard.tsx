import { motion } from 'framer-motion';
import { Card, CardContent } from './card';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  variant?: 'default' | 'lift' | 'scale' | 'glow';
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  delay = 0,
  hover = true,
  variant = 'default'
}) => {
  const getHoverProps = () => {
    if (!hover) return {};

    switch (variant) {
      case 'lift':
        return {
          whileHover: { y: -8, scale: 1.02 },
          transition: { type: "spring", stiffness: 300, damping: 20 }
        };
      case 'scale':
        return {
          whileHover: { scale: 1.05 },
          transition: { type: "spring", stiffness: 400, damping: 25 }
        };
      case 'glow':
        return {
          whileHover: { 
            boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)",
            scale: 1.02
          },
          transition: { duration: 0.3 }
        };
      default:
        return {
          whileHover: { y: -4 },
          transition: { duration: 0.2 }
        };
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...getHoverProps()}
    >
      <Card className={`${className} transition-all duration-300`}>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
