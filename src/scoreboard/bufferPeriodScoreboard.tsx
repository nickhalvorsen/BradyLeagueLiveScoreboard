import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Scoreboard } from './scoreboard';
import config from '../config.json';
import { useSortedBufferPeriodScoreboardRows } from './useSortedBufferPeriodScoreboardRows';

const BufferPeriodScoreboard: React.FC = () => {
  const week = useSelector<RootState, number>((state) => state.espn.week);
  const leagueName = useSelector<RootState, string>((state) => state.espn.leagueName);
  const rows = useSortedBufferPeriodScoreboardRows();

  return (
    <div>
      <p>
        {leagueName} live week 1&ndash;{week} scoring totals
      </p>
      <p>({config.bufferPeriodWeeks} week buffer period)</p>
      <div>
        <Scoreboard rows={rows} />
      </div>
    </div>
  );
};

export { BufferPeriodScoreboard };
