import React from 'react';
import { BufferPeriodScoreboard } from './bufferPeriodScoreboard';
import { WeeklyScoreboard } from './weeklyScoreboard';
import config from '../config.json';
import { useInterval } from './useInterval';
import { useEspnStore } from '../store/espnStore';

const BradyScoreboards: React.FC = () => {
  const currentWeek = useEspnStore((state) => state.week);
  const loaded = useEspnStore((state) => state.loaded);
  const isSeasonActive = useEspnStore((state) => state.isSeasonActive);
  const leagueName = useEspnStore((state) => state.leagueName);
  const showBufferPeriodScoreboard = currentWeek <= config.bufferPeriodWeeks;

  const getScoreboard = useEspnStore((state) => state.getScoreboard);
  useInterval(() => getScoreboard(), 5000);

  if (!loaded) return <div>Loading...</div>;
  if (!isSeasonActive) return <div>{leagueName} season is over, thanks for playing!</div>;

  return showBufferPeriodScoreboard ? <BufferPeriodScoreboard /> : <WeeklyScoreboard />;
};

export { BradyScoreboards };
