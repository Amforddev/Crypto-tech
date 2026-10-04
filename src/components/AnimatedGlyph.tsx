import React from 'react';
import { Icon } from '@iconify/react';
import { motion, TargetAndTransition } from 'motion/react';

interface AnimatedGlyphProps {
  icon: string;
  size?: number | string;
  className?: string;
  iconClassName?: string;
  glow?: boolean;
  glowColor?: string;
  animate?: boolean;
  variant?: 'float' | 'pulse' | 'shimmer' | 'bounce' | 'rotate-subtle';
}

export const AnimatedGlyph: React.FC<AnimatedGlyphProps> = ({
  icon,
  size = 24,
  className = '',
  iconClassName = '',
  glow = false,
  glowColor = 'rgba(214, 255, 63, 0.25)',
  animate = true,
  variant = 'float',
}) => {
  const getAnimationVariants = (): TargetAndTransition => {
    switch (variant) {
      case 'pulse':
        return {
          scale: [1, 1.08, 1],
          transition: {
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };
      case 'bounce':
        return {
          y: [0, -3, 0],
          transition: {
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };
      case 'rotate-subtle':
        return {
          rotate: [0, 4, -4, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };
      case 'float':
      default:
        return {
          y: [0, -4, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };
    }
  };

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      animate={animate ? getAnimationVariants() : undefined}
      whileHover={{ scale: 1.12, rotate: [0, -2, 2, 0] }}
      transition={{ type: 'spring', stiffness: 350, damping: 18 }}
    >
      {glow && (
        <span
          className="absolute -inset-1 rounded-full blur-md opacity-75 pointer-events-none transition-opacity duration-300"
          style={{ background: glowColor }}
        />
      )}
      <Icon
        icon={icon}
        width={size}
        height={size}
        className={`relative z-10 transition-transform duration-200 ${iconClassName}`}
      />
    </motion.div>
  );
};

export default AnimatedGlyph;
