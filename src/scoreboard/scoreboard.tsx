import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ScoreboardRow from './scoreboardRow';
import { getAllData } from '../store/espnSlice';
import { AppDispatch, RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { ScoreboardRow as ScoreboardRowData } from '../store/espnSlice';

const Scoreboard = () => {
    const [isHintVisible, setIsHintVisible] = useState(false);
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
    //sorted.sort((a,b) => b.totalPoints - a.totalPoints);

    return (
        <div style={styles}>
            <div>Tom Brady's score board</div>
            <p>🛡️ = immunity</p>
            {sorted.map((x, index) =>  (
                <ScoreboardRow 
                    label={`${x.team.location} ${x.team.nickname}`} 
                    //value={`${x.totalPoints.toFixed(1)} / ${x.projectedPoints.toFixed(1)}`}
                    points={x.totalPoints.toFixed(2)}
                    projectedPoints={x.projectedPoints.toFixed(2)} 
                    isLast={(index === sorted.length - 1 && !x.team.location.includes('🛡️') || (index === sorted.length - 2 && sorted[sorted.length-1].team.location.includes('🛡️')))} 
                    key={index} 
                    imageUrl={x.team.logo}
                    />
            ))}
            {}
        </div>
    )
}

const styles = {
    maxWidth: '25em',
    padding: '.5em'
}

export default Scoreboard;