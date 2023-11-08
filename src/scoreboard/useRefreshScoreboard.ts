import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getScoreboard } from '../store/espnSlice';
import { AppDispatch } from '../store/store';

const useRefreshScoreboard = (intervalSeconds: number) => {
    const dispatch = useDispatch<AppDispatch>();
    const [scoreboardIntervalToken, setScoreboardIntervalToken] = useState<NodeJS.Timer>();

    const activateRefreshInterval = () => {
        dispatch(getScoreboard());
        
        const intervalMilliseconds = intervalSeconds * 1000;
        const intervalToken = setInterval(() => dispatch(getScoreboard()), intervalMilliseconds);

        setScoreboardIntervalToken(intervalToken);

        return () => {
            clearInterval(scoreboardIntervalToken);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(activateRefreshInterval, []);
}

export default useRefreshScoreboard;