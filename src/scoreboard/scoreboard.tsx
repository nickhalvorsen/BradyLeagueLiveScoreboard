import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ScoreboardRow from './scoreboardRow';
import { getAllData } from '../store/espnSlice';
import { AppDispatch, RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { ScoreboardRow as ScoreboardRowData } from '../store/espnSlice';

const Scoreboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllData());
        setInterval(() => {
            dispatch(getAllData());
        }, 5000);
    }, []);

    let scoreboardRows: ScoreboardRowData[] = useSelector<RootState>(state => state.espn.scoreboardRows) as ScoreboardRowData[];
    let sorted = scoreboardRows.slice();
    sorted.sort((a,b) => b.projectedPoints - a.projectedPoints);
console.log('sorted',sorted)
    return (
        <div style={styles}>
            <div>TOM BRADY'S BATTLE ROYALE live scoreboard</div>
            <p>🛡️ = immunity</p>
            {/* for some reason, flexDirection: 'column' doesn't work in the style object */}
            <div  style={{...scoreboardContainerStyles , flexDirection:'column'}}>
                {sorted.map((x, index) =>  (
                    <ScoreboardRow 
                        label={`${x.team.location} ${x.team.nickname}`} 
                        points={x.totalPoints.toFixed(1)}
                        projectedPoints={x.projectedPoints.toFixed(1)} 
                        isLast={(index === sorted.length - 1 && !x.team.location.includes('🛡️') || (index === sorted.length - 2 && sorted[sorted.length-1].team.location.includes('🛡️')))} 
                        key={index} 
                        imageUrl={x.team.logo}
                        />
                ))}
            </div>
        </div>
    )
}

const styles = {
    padding: '.5em'
}

const scoreboardContainerStyles = {
    maxWidth: '30em',
    display: 'flex',
}

export default Scoreboard;