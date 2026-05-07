import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Swords, Coins, Dice5, Medal, Crown, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

const gameInfo = {
  jokenpo: { label: 'Jokenpô', icon: Swords, color: 'text-neon-purple', bgColor: 'bg-neon-purple/10', borderColor: 'border-neon-purple/30' },
  coin_flip: { label: 'Cara ou Coroa', icon: Coins, color: 'text-neon-teal', bgColor: 'bg-neon-teal/10', borderColor: 'border-neon-teal/30' },
  dice: { label: 'Dados', icon: Dice5, color: 'text-neon-green', bgColor: 'bg-neon-green/10', borderColor: 'border-neon-green/30' },
};

const rankIcons = [
  <Crown className="w-5 h-5 text-yellow-400" />,
  <Medal className="w-5 h-5 text-gray-300" />,
  <Award className="w-5 h-5 text-amber-600" />,
];

function LeaderboardTable({ game, scores }) {
  const info = gameInfo[game];
  const Icon = info.icon;

  const sorted = [...scores]
    .filter((s) => s.game === game)
    .sort((a, b) => (b.wins || 0) - (a.wins || 0))
    .slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card/50 backdrop-blur-sm border ${info.borderColor} rounded-2xl overflow-hidden`}
    >
      {/* Header */}
      <div className={`${info.bgColor} p-4 flex items-center gap-3 border-b ${info.borderColor}`}>
        <Icon className={`w-6 h-6 ${info.color}`} />
        <h3 className={`font-orbitron font-bold ${info.color}`}>{info.label}</h3>
      </div>

      {/* Table */}
      <div className="p-4">
        {sorted.length === 0 ? (
          <p className="text-center text-muted-foreground font-rajdhani py-8">
            Nenhum jogador ainda. Seja o primeiro!
          </p>
        ) : (
          <div className="space-y-2">
            {/* Table header */}
            <div className="grid grid-cols-5 gap-2 text-xs font-orbitron text-muted-foreground px-3 py-1">
              <span>#</span>
              <span>Jogador</span>
              <span className="text-center">V</span>
              <span className="text-center">D</span>
              <span className="text-center">%</span>
            </div>

            {sorted.map((s, i) => {
              const total = (s.wins || 0) + (s.losses || 0) + (s.draws || 0);
              const winRate = total > 0 ? Math.round(((s.wins || 0) / total) * 100) : 0;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid grid-cols-5 gap-2 items-center px-3 py-2 rounded-lg text-sm font-rajdhani ${
                    i === 0 ? `${info.bgColor} border ${info.borderColor}` : 'hover:bg-muted/30'
                  }`}
                >
                  <span className="flex items-center">
                    {i < 3 ? rankIcons[i] : <span className="text-muted-foreground ml-1">{i + 1}</span>}
                  </span>
                  <span className="font-semibold text-foreground truncate">
                    {s.player_name || 'Anônimo'}
                  </span>
                  <span className="text-center text-neon-green font-semibold">{s.wins || 0}</span>
                  <span className="text-center text-red-400 font-semibold">{s.losses || 0}</span>
                  <span className={`text-center font-semibold ${info.color}`}>{winRate}%</span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Leaderboard() {
  const { data: scores = [], isLoading } = useQuery({
    queryKey: ['game-scores'],
    queryFn: () => base44.entities.GameScore.list('-wins', 50),
  });

  return (
    <div className="min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="w-8 h-8 text-neon-purple" />
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold">
              <span className="text-neon-purple">PLACAR</span>{' '}
              <span className="text-neon-teal">DE</span>{' '}
              <span className="text-neon-green">CLASSIFICAÇÃO</span>
            </h1>
            <Trophy className="w-8 h-8 text-neon-green" />
          </div>
          <div className="w-48 h-0.5 mx-auto bg-gradient-to-r from-neon-purple via-neon-teal to-neon-green rounded-full" />
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <LeaderboardTable game="jokenpo" scores={scores} />
            <LeaderboardTable game="coin_flip" scores={scores} />
            <LeaderboardTable game="dice" scores={scores} />
          </div>
        )}
      </div>
    </div>
  );
}