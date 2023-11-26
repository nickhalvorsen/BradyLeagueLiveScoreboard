import React from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Scoreboard } from './scoreboard';
import { useSortedScoreboardRows } from './useSortedScoreboardRows';

const WeeklyScoreboard: React.FC = () => {
  const weekNumber = useSelector<RootState>((state) => state.espn.week) as number;
  const leagueName = useSelector<RootState>((state) => state.espn.leagueName) as string;
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
