import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = { default: 1, md: 2, lg: 3 },
  gap = { default: 4, md: 6, lg: 8 }
}) => {
  const getGridClass = () => {
    const gridCols = Object.entries(cols)
      .map(([breakpoint, value]) => {
        if (breakpoint === 'default') {
          return `grid-cols-${value}`;
        }
        return `${breakpoint}:grid-cols-${value}`;
      })
      .join(' ');

    const gridGap = Object.entries(gap)
      .map(([breakpoint, value]) => {
        if (breakpoint === 'default') {
          return `gap-${value}`;
        }
        return `${breakpoint}:gap-${value}`;
      })
      .join(' ');

    return cn('grid', gridCols, gridGap, className);
  };

  return (
    <div className={getGridClass()}>
      {children}
    </div>
  );
};

export default ResponsiveGrid;
