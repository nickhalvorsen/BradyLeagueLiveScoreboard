import React from 'react';
import { useSelector } from "react-redux";
import useRefreshScoreboard from "./useRefreshScoreboard";
import { RootState } from '../store/store';
import BufferPeriodScoreboard from "./bufferPeriodScoreboard";
import WeeklyScoreboard from "./weeklyScoreboard";
import LastUpdated from './lastUpdated';

const config = require('../config.json');

const BradyScoreboards = () => {
    const week = useSelector<RootState>(state => state.espn.week) as number;
    const showBufferPeriodScoreboard = week <= config.bufferPeriodWeeks;

    useRefreshScoreboard();

  return (
    <div>
        {showBufferPeriodScoreboard 
            ? <BufferPeriodScoreboard/> 
            : <WeeklyScoreboard/>}
        {/* <LastUpdated/> */}
    </div>
  )
}

export default BradyScoreboards;