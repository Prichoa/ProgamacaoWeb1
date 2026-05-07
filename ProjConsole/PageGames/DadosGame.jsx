import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScoreDisplay from '../components/ScoreDisplay';

const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function DiceGame() {
  const [playerDice, setPlayerDice] = useState(null);
  const [cpuDice, setCpuDice] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
  const [lastResult, setLastResult] = useState(null);
  const [rollKey, setRollKey] = useState(0);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setPlayerDice(null);
    setCpuDice(null);
    setRollKey((k) => k + 1);

    setTimeout(() => {
      const pDice = Math.floor(Math.random() * 6) + 1;
      const cDice = Math.floor(Math.random() * 6) + 1;
      setPlayerDice(pDice);
      setCpuDice(cDice);

      const gameResult = pDice > cDice ? 'win' : pDice < cDice ? 'loss' : 'draw';
      setLastResult(gameResult);
      setScore((prev) => ({
        wins: prev.wins + (gameResult === 'win' ? 1 : 0),
        losses: prev.losses + (gameResult === 'loss' ? 1 : 0),
        draws: prev.draws + (gameResult === 'draw' ? 1 : 0),
      }));
      setIsRolling(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 gap-8">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-neon-green neon-green-glow mb-2">
          DADOS
        </h1>
        <p className="font-rajdhani text-muted-foreground">Role os dados e vença a CPU!</p>
      </motion.div>

      {/* Dice Arena */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-card/50 backdrop-blur-sm border border-neon-green/20 rounded-2xl p-6"
      >
        <div className="flex items-center justify-around mb-6">
          {/* Player Dice */}
          <div className="text-center">
            <p className="font-orbitron text-xs text-neon-teal mb-3">VOCÊ</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={`player-${rollKey}-${playerDice}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={
                  isRolling
                    ? { scale: 1, rotate: [0, 90, 180, 270, 360], transition: { rotate: { repeat: Infinity, duration: 0.3 } } }
                    : { scale: 1, rotate: 0 }
                }
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-neon-green/10 border-2 border-neon-green/30 flex items-center justify-center text-5xl md:text-6xl"
                style={playerDice ? { boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)' } : {}}
              >
                {isRolling ? '🎲' : playerDice ? diceEmojis[playerDice - 1] : '🎲'}
              </motion.div>
            </AnimatePresence>
            {playerDice && !isRolling && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-orbitron text-xl text-neon-green mt-2"
              >
                {playerDice}
              </motion.p>
            )}
          </div>

          {/* VS */}
          <div className="font-orbitron text-2xl font-black text-muted-foreground">VS</div>

          {/* CPU Dice */}
          <div className="text-center">
            <p className="font-orbitron text-xs text-red-400 mb-3">CPU</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={`cpu-${rollKey}-${cpuDice}`}
                initial={{ scale: 0, rotate: 180 }}
                animate={
                  isRolling
                    ? { scale: 1, rotate: [0, -90, -180, -270, -360], transition: { rotate: { repeat: Infinity, duration: 0.3 } } }
                    : { scale: 1, rotate: 0 }
                }
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center text-5xl md:text-6xl"
                style={cpuDice ? { boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)' } : {}}
              >
                {isRolling ? '🎲' : cpuDice ? diceEmojis[cpuDice - 1] : '🎲'}
              </motion.div>
            </AnimatePresence>
            {cpuDice && !isRolling && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-orbitron text-xl text-red-400 mt-2"
              >
                {cpuDice}
              </motion.p>
            )}
          </div>
        </div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {playerDice && cpuDice && !isRolling && (
            <motion.div
              key={`result-${rollKey}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`text-center font-orbitron text-lg py-2 rounded-lg mb-4 ${
                playerDice > cpuDice
                  ? 'text-neon-green bg-neon-green/10'
                  : playerDice < cpuDice
                  ? 'text-red-400 bg-red-500/10'
                  : 'text-neon-teal bg-neon-teal/10'
              }`}
            >
              {playerDice > cpuDice
                ? '🎉 VOCÊ GANHOU!'
                : playerDice < cpuDice
                ? '💀 VOCÊ PERDEU!'
                : '🤝 EMPATE!'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Roll Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={rollDice}
          disabled={isRolling}
          className={`w-full py-4 rounded-xl font-orbitron font-bold text-lg transition-all duration-300 ${
            isRolling
              ? 'opacity-50 cursor-not-allowed bg-muted border border-muted text-muted-foreground'
              : 'bg-neon-green/10 border-2 border-neon-green/50 text-neon-green hover:bg-neon-green/20 neon-box-green cursor-pointer'
          }`}
        >
          {isRolling ? '🎲 ROLANDO...' : '🎲 ROLAR DADOS'}
        </motion.button>
      </motion.div>

      {/* Score */}
      <ScoreDisplay wins={score.wins} losses={score.losses} draws={score.draws} lastResult={lastResult} />
    </div>
  );
}