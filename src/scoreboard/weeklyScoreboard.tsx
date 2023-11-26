import React from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { Scoreboard } from './scoreboard';
import { useSortedScoreboardRows } from './useSortedScoreboardRows';

const WeeklyScoreboard: React.FC = () => {
  const weekNumber = useSelector<RootState, number>((state) => state.espn.week);
  const leagueName = useSelector<RootState, string>((state) => state.espn.leagueName);
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
