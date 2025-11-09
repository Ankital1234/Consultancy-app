import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MobileMenuItem {
  id: string;
  label: string;
  icon?: any;
  badge?: number;
  children?: MobileMenuItem[];
  onClick?: () => void;
}

interface MobileMenuProps {
  items: MobileMenuItem[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  items,
  isOpen,
  onClose,
  className = ''
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: MobileMenuItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else if (item.onClick) {
      item.onClick();
      onClose();
    }
  };

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: '-100%',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const renderItem = (item: MobileMenuItem, level: number = 0) => {
    const Icon = item.icon;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="w-full">
        <Button
          variant="ghost"
          className={`w-full justify-start h-12 px-4 mb-1 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800`}
          onClick={() => handleItemClick(item)}
          style={{ paddingLeft: `${16 + level * 16}px` }}
        >
          {Icon && <Icon className="w-5 h-5 mr-3 flex-shrink-0" />}
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant="destructive" className="ml-auto mr-2 h-5 text-xs">
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          )}
        </Button>

        {/* Sub-items */}
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {item.children?.map((child) => renderItem(child, level + 1))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 left-0 w-80 h-full bg-white dark:bg-slate-900 shadow-xl z-50 lg:hidden ${className}`}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Menu
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-1">
                {items.map((item) => renderItem(item))}
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
