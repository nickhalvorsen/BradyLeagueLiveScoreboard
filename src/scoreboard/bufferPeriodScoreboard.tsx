import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Scoreboard } from './scoreboard';
import config from '../config.json';
import { useSortedBufferPeriodScoreboardRows } from './useSortedBufferPeriodScoreboardRows';

const BufferPeriodScoreboard: React.FC = () => {
  const week = useSelector<RootState>((state) => state.espn.week) as number;
  const leagueName = useSelector<RootState>((state) => state.espn.leagueName) as string;
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
