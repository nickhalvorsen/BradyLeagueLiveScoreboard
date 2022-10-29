import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ScoreboardRow from './scoreboardRow';
import { getAllData } from '../store/espnSlice';
import { AppDispatch, RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { ScoreboardRow as ScoreboardRowData } from '../store/espnSlice';

// cheap workaround for now
const immunityTeam = 'shouldnt';

const Scoreboard = () => {
    const [isHintVisible, setIsHintVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getAllData());
    }, [])

    let scoreboardRows: ScoreboardRowData[] = useSelector<RootState>(state => state.espn.scoreboardRows) as ScoreboardRowData[];
    let sorted = scoreboardRows.slice();
    sorted.sort((a,b) => b.projectedPoints - a.projectedPoints);

    return (
        <div style={styles}>
            <div>Tom Brady's score board</div>
            <p>gold = immunity, red = last place, oh no!<br/>background fill: how much of their team has played already</p>
            {sorted.map((x, index) =>  (
                <ScoreboardRow 
                    label={`${x.team.location} ${x.team.nickname}`} 
                    value={`${x.projectedPoints.toFixed(2)}`} 
                    valueNote=' proj.'
                    isImmune={`${x.team.location} ${x.team.nickname}`.includes(immunityTeam)} 
                    isLast={index === sorted.length - 1} key={index} />
            ))}
        </div>
    )
}

const styles = {
    maxWidth: '25em',
    padding: '.5em'
}

export default Scoreboard;