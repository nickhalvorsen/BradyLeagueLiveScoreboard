import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ScoreboardRow from './scoreboardRow';
import { getScoreboard } from '../store/espnSlice';
import { getCustomPlayers } from '../store/customPlayersSlice';
import { AppDispatch, RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { ScoreboardRow as ScoreboardRowData } from '../store/espnSlice';

const Scoreboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getScoreboard());
        dispatch(getCustomPlayers());
        setInterval(() => {
            dispatch(getScoreboard());
        }, 5000);
    }, []);

    const scoreboardRows: ScoreboardRowData[] = useSelector<RootState>(state => state.espn.scoreboardRows) as ScoreboardRowData[];
    const week = useSelector<RootState>(state => state.espn.week) as number;
    let sorted = scoreboardRows.filter(x => !x.team.isEliminated).slice();
    sorted.sort((a,b) => b.projectedPoints - a.projectedPoints);
    return (
        <div>
            <div>TOM BRADY'S BATTLE ROYALE live scoreboard &mdash; week {week}</div>
            <p>🛡️ = immunity</p>
            {/* for some reason, flexDirection: 'column' doesn't work in the style object */}
            <div style={{...scoreboardContainerStyles , flexDirection:'column'}}>
                {sorted.map((x, index) => (
                    <ScoreboardRow 
                        label={`${x.team.name}`} 
                        points={x.totalPoints.toFixed(1)}
                        projectedPoints={x.projectedPoints.toFixed(1)} 
                        isLast={((index === sorted.length - 1 && !x.team.isImmune) || (index === sorted.length - 2 && sorted[sorted.length-1].team.isImmune))} 
                        key={x.team.id} 
                        imageUrl={x.team.logo}
                        />
                ))}
            </div>
        </div>
    )
}

const scoreboardContainerStyles = {
    maxWidth: '30em',
    display: 'flex',
}

export default Scoreboard;