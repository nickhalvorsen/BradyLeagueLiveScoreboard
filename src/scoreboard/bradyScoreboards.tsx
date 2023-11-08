import React from 'react';
import { useSelector } from "react-redux";
import useRefreshScoreboard from "./useRefreshScoreboard";
import { RootState } from '../store/store';
import BufferPeriodScoreboard from "./bufferPeriodScoreboard";
import WeeklyScoreboard from "./weeklyScoreboard";
import LastUpdated from './lastUpdated';
import config from '../config.json';

const BradyScoreboards: React.FC = () => {
    const currentWeek = useSelector<RootState>(state => state.espn.week) as number;
    const showBufferPeriodScoreboard = currentWeek <= config.bufferPeriodWeeks;

    useRefreshScoreboard(5);

  return (
    <>
        {showBufferPeriodScoreboard 
            ? <BufferPeriodScoreboard/> 
            : <WeeklyScoreboard/>}
        {/* <LastUpdated/> */}
    </>
  )
}

export default BradyScoreboards;