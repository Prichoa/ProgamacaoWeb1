import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';

export default function SplashScreen() {
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    navigate('/menu');
  }, [navigate]);

  useEffect(() => {
    const handler = (e) => {
      handleStart();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleStart]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden grid-bg cursor-pointer"
      onClick={handleStart}
    >
      <ParticleBackground />

      {/* Radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]" />

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
        className="relative z-10 mb-8"
      >
        <div className="relative">
          <Gamepad2 className="w-24 h-24 md:w-32 md:h-32 text-neon-purple animate-float" />
          <div className="absolute inset-0 blur-2xl bg-neon-purple/30 rounded-full" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black text-center relative z-10 mb-4"
      >
        <span className="text-neon-purple neon-purple-glow">NEXUS</span>
        <br />
        <span className="text-neon-teal neon-teal-glow">GAME</span>{' '}
        <span className="text-neon-green neon-green-glow">HUB</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-muted-foreground font-rajdhani text-lg md:text-xl mb-12 relative z-10"
      >
        Sua arena de jogos definitiva
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="relative z-10"
      >
        <motion.button
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="px-8 py-4 rounded-xl font-orbitron text-sm md:text-base font-bold text-neon-purple border-2 border-neon-purple/50 bg-neon-purple/10 hover:bg-neon-purple/20 transition-all duration-300 neon-box-purple animate-pulse-neon"
          onClick={handleStart}
        >
         PRESSIONE QUALQUER TECLA PARA INICIAR!
        </motion.button>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-0.5 bg-gradient-to-r from-transparent via-neon-purple to-transparent z-10"
      />
    </div>
  );
}