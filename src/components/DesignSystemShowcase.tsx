import { motion } from 'framer-motion';

/**
 * Design System Showcase Component
 * Visual reference for the premium design system
 * Can be used in documentation or style guides
 */
const DesignSystemShowcase = () => {
  const colors = [
    { name: 'Blue Primary', class: 'bg-blue-500', hex: '#3B82F6' },
    { name: 'Blue Dark', class: 'bg-blue-600', hex: '#2563EB' },
    { name: 'Purple Accent', class: 'bg-purple-500', hex: '#A855F7' },
    { name: 'Purple Dark', class: 'bg-purple-600', hex: '#9333EA' },
    { name: 'Teal Secondary', class: 'bg-teal-500', hex: '#14B8A6' },
    { name: 'Teal Dark', class: 'bg-teal-600', hex: '#0D9488' },
    { name: 'Rose Gold', class: 'bg-rose-500', hex: '#FB7185' },
    { name: 'Rose Dark', class: 'bg-rose-600', hex: '#F43F5E' },
    { name: 'Gold', class: 'bg-yellow-400', hex: '#FBBF24' },
    { name: 'Gold Dark', class: 'bg-yellow-500', hex: '#F59E0B' },
  ];

  const gradients = [
    { name: 'Blue → Purple', class: 'bg-gradient-to-r from-blue-500 to-purple-500' },
    { name: 'Purple → Teal', class: 'bg-gradient-to-r from-purple-500 to-teal-500' },
    { name: 'Blue → Teal', class: 'bg-gradient-to-r from-blue-500 to-teal-500' },
    { name: 'Rose → Gold', class: 'bg-gradient-to-r from-rose-500 to-yellow-500' },
    { name: 'Blue → Purple → Teal', class: 'bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400' },
  ];

  const glassMorphicExamples = [
    { name: 'Light Glass', class: 'bg-white/5 backdrop-blur-sm border border-white/10' },
    { name: 'Medium Glass', class: 'bg-white/10 backdrop-blur-md border border-white/20' },
    { name: 'Strong Glass', class: 'bg-white/20 backdrop-blur-lg border border-white/30' },
  ];

  const shadows = [
    { name: 'Small', class: 'shadow-lg shadow-blue-500/25' },
    { name: 'Medium', class: 'shadow-xl shadow-purple-500/30' },
    { name: 'Large', class: 'shadow-2xl shadow-blue-500/40' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
            Premium Design System
          </h1>
          <p className="text-slate-400 text-lg">
            Visual reference for colors, gradients, and effects
          </p>
        </motion.div>

        {/* Color Palette */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors.map((color, index) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="space-y-3"
              >
                <div className={`${color.class} h-24 rounded-xl shadow-lg`} />
                <div className="text-center">
                  <p className="text-sm font-medium text-white">{color.name}</p>
                  <p className="text-xs text-slate-400">{color.hex}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Gradients */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Gradient Combinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gradients.map((gradient, index) => (
              <motion.div
                key={gradient.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="space-y-3"
              >
                <div className={`${gradient.class} h-32 rounded-xl shadow-lg`} />
                <p className="text-sm font-medium text-white text-center">{gradient.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Glassmorphic Effects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Glassmorphic Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {glassMorphicExamples.map((example, index) => (
              <motion.div
                key={example.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`${example.class} p-8 rounded-2xl`}
              >
                <h3 className="text-xl font-semibold text-white mb-2">{example.name}</h3>
                <p className="text-sm text-slate-400">
                  Semi-transparent background with backdrop blur effect
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Shadow Effects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Shadow Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shadows.map((shadow, index) => (
              <motion.div
                key={shadow.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`${shadow.class} bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl`}
              >
                <h3 className="text-xl font-semibold text-white mb-2">{shadow.name} Shadow</h3>
                <p className="text-sm text-slate-200">
                  Colored shadow with varying intensity
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Typography Scale */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Typography Scale</h2>
          <div className="space-y-4 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <div className="text-6xl font-bold text-white">Heading 1</div>
            <div className="text-5xl font-bold text-white">Heading 2</div>
            <div className="text-4xl font-bold text-white">Heading 3</div>
            <div className="text-3xl font-semibold text-white">Heading 4</div>
            <div className="text-2xl font-semibold text-white">Heading 5</div>
            <div className="text-xl font-medium text-white">Heading 6</div>
            <div className="text-lg text-slate-300">Body Large</div>
            <div className="text-base text-slate-300">Body Regular</div>
            <div className="text-sm text-slate-400">Body Small</div>
            <div className="text-xs text-slate-500">Caption</div>
          </div>
        </motion.section>

        {/* Spacing Scale */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Spacing Scale</h2>
          <div className="space-y-4 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            {[1, 2, 3, 4, 6, 8, 12, 16, 24, 32].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <div className={`h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded`} style={{ width: `${size * 4}px` }} />
                <span className="text-sm text-slate-300 font-mono">{size * 4}px ({size}rem)</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Border Radius */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Small', class: 'rounded-lg' },
              { name: 'Medium', class: 'rounded-xl' },
              { name: 'Large', class: 'rounded-2xl' },
              { name: 'Full', class: 'rounded-full' },
            ].map((radius, index) => (
              <motion.div
                key={radius.name}
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ rotate: 5 }}
                className="space-y-3"
              >
                <div className={`${radius.class} bg-gradient-to-br from-teal-500 to-blue-500 h-32 w-full`} />
                <p className="text-sm font-medium text-white text-center">{radius.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interactive States */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Interactive States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              Hover Me
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 text-white rounded-lg font-medium transition-all duration-300"
            >
              Glassmorphic Button
            </motion.button>
            <motion.div
              whileHover={{ y: -5 }}
              className="relative group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
            >
              <p className="text-white">Hover to lift</p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl rounded-xl" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <p className="text-white font-medium">Scale on hover</p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default DesignSystemShowcase;
