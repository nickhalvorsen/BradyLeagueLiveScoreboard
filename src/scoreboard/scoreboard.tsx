import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ScoreboardRow from './scoreboardRow.tsx';
import { getAllData } from '../store/espnSlice.ts';

const Scoreboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllData());
    }, [])

    return (
        <div style={styles}>
            <div>Tom Brady's score board</div>
            <p>gold = immunity, red = last place, oh no!</p>
            <ScoreboardRow label={"brandon"} value={"155"} isImmune={true} />
            <ScoreboardRow label={"connor"} value={"125"} isImmune={false} />
            <ScoreboardRow label={"johnnie"} value={"123"} isImmune={false} />
            <ScoreboardRow label={"paul"} value={"199"} isLast/>
        </div>
    )
}

const styles = {
    maxWidth: '25em',
    padding: '.5em'
}

export default Scoreboard;