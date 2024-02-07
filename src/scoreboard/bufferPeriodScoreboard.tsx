import React from 'react';
import { Scoreboard } from './scoreboard';
import config from '../config.json';
import { useSortedBufferPeriodScoreboardRows } from './useSortedBufferPeriodScoreboardRows';
import { useEspnStore } from '../store/espnStore';

const BufferPeriodScoreboard: React.FC = () => {
  const currentWeek = useEspnStore((state) => state.week);
  const leagueName = useEspnStore((state) => state.leagueName);
  const rows = useSortedBufferPeriodScoreboardRows();

  return (
    <div>
      <p>
        {leagueName} live week 1&ndash;{currentWeek} scoring totals
      </p>
      <p>({config.bufferPeriodWeeks} week buffer period)</p>
      <div>
        <Scoreboard rows={rows} />
      </div>
    </div>
  );
};

export { BufferPeriodScoreboard };
