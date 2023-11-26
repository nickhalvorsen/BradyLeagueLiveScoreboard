import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { BufferPeriodScoreboard } from './bufferPeriodScoreboard';
import { WeeklyScoreboard } from './weeklyScoreboard';
import { LastUpdated } from './lastUpdated';
import config from '../config.json';
import { useInterval } from './useInterval';
import { getScoreboard } from '../store/espnSlice';

const BradyScoreboards: React.FC = () => {
  const currentWeek = useSelector<RootState>((state) => state.espn.week) as number;
  const loaded = useSelector<RootState>((state) => state.espn.loaded) as boolean;
  const showBufferPeriodScoreboard = currentWeek <= config.bufferPeriodWeeks;

  const dispatch = useDispatch<AppDispatch>();
  useInterval(() => dispatch(getScoreboard()), 5000);

  if (!loaded) return <div>Loading...</div>;

  return (
    <>
      {showBufferPeriodScoreboard ? <BufferPeriodScoreboard /> : <WeeklyScoreboard />}
      {/* <LastUpdated/> */}
    </>
  );
};

export { BradyScoreboards };
