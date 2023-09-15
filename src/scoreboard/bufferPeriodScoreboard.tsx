import React from 'react';
import { ScoreboardRow as ScoreboardRowData } from '../store/espnSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Scoreboard from './scoreboard';

const config = require('../config.json');

const BufferPeriodScoreboard = () => {
    const rows: ScoreboardRowData[] = useSelector<RootState>(state => state.espn.bufferPeriodScoreboardRows) as ScoreboardRowData[];
    const sortedRows = rows.slice().sort((a,b) => b.projectedPoints - a.projectedPoints);
    const week = useSelector<RootState>(state => state.espn.week) as number;

    return (
        <div>
                <p>TOM BRADY'S BATTLE ROYALE live week 1&ndash;{week} scoring totals</p>
                <p>({config.bufferPeriodWeeks} week buffer period)</p>
                <div>
                    <Scoreboard rows={sortedRows} />
                </div>
            </div>
    )
    
}

export default BufferPeriodScoreboard;