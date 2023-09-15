import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ScoreboardRow from './scoreboardRow';
import { getScoreboard } from '../store/espnSlice';
import { getCustomPlayers } from '../store/customPlayersSlice';
import { AppDispatch, RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { ScoreboardRow as ScoreboardRowData } from '../store/espnSlice';
import Scoreboard from './scoreboard';

const WeeklyScoreboard = () => {
    const scoreboardRows: ScoreboardRowData[] = useSelector<RootState>(state => state.espn.scoreboardRows) as ScoreboardRowData[];
    const week = useSelector<RootState>(state => state.espn.week) as number;
    let sorted = scoreboardRows.filter(x => !x.team.isEliminated).slice();
    sorted.sort((a,b) => b.projectedPoints - a.projectedPoints);

    return (
        <div>
            <div>TOM BRADY'S BATTLE ROYALE live scoreboard &mdash; week {week}</div>
            <p>🛡️ = immunity</p>
            <div>
                <Scoreboard rows={sorted}/>
            </div>
        </div>
    )
}

export default WeeklyScoreboard;