import React from 'react';
import { Scoreboard } from './scoreboard';
import { useSortedScoreboardRows } from './useSortedScoreboardRows';
import { useEspnStore } from '../store/espnStore';

const WeeklyScoreboard: React.FC = () => {
  const weekNumber = useEspnStore((state) => state.week);
  const leagueName = useEspnStore((state) => state.leagueName);
  const rows = useSortedScoreboardRows();

  return (
    <div>
      <div>
        {leagueName} live scoreboard &mdash; week {weekNumber}
      </div>
      <p>🛡️ = immunity</p>
      <div>
        <Scoreboard rows={rows} />
      </div>
    </div>
  );
};

export { WeeklyScoreboard };
