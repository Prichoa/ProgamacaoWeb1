import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swords, Coins, Dice5, ChevronRight } from 'lucide-react';

const games = [
  {  id: 'dice',
    title: 'DADOS',
    subtitle: 'Role os Dados',
    description: 'Aposte no resultado e role os dados!',
    icon: Dice5,
    path: '/dados',
    color: 'green',
    glowClass: 'neon-box-green',
    textColor: 'text-neon-green',
    bgColor: 'bg-neon-green/10',
    borderColor: 'border-neon-green/30',
    gradient: 'from-neon-green/20 to-transparent',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function GameMenu() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="font-orbitron text-3xl md:text-4xl font-bold mb-2">
          <span className="text-neon-purple">SELECIONE</span>{' '}
          <span className="text-neon-teal">UM JOGO</span>
        </h1>
        <div className="w-32 h-0.5 mx-auto bg-gradient-to-r from-neon-purple via-neon-teal to-neon-green rounded-full" />
      </motion.div>

      {/* Game Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full"
      >
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <motion.div key={game.id} variants={cardVariants}>
              <Link
                to={game.path}
                className={`group block relative overflow-hidden rounded-2xl border ${game.borderColor} ${game.bgColor} backdrop-blur-sm p-6 transition-all duration-500 hover:scale-105 ${game.glowClass}`}
              >
                {/* Gradient overlay */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${game.gradient} opacity-50`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${game.bgColor} border ${game.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${game.textColor}`} />
                  </div>

                  {/* Text */}
                  <h2 className={`font-orbitron text-xl font-bold ${game.textColor} mb-1`}>
                    {game.title}
                  </h2>
                  <p className="font-rajdhani text-sm text-muted-foreground font-semibold mb-2">
                    {game.subtitle}
                  </p>
                  <p className="font-rajdhani text-sm text-muted-foreground/70 mb-4">
                    {game.description}
                  </p>

                  {/* Play button */}
                  <div className={`flex items-center gap-2 ${game.textColor} font-orbitron text-xs font-bold group-hover:gap-3 transition-all`}>
                    JOGAR
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}