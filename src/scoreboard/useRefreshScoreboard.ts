import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getScoreboard } from '../store/espnSlice';
import { getCustomPlayers } from '../store/customPlayersSlice';
import { AppDispatch } from '../store/store';

const useRefreshScoreboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [scoreboardIntervalToken, setScoreboardIntervalToken] = useState<NodeJS.Timer>();

    useEffect(() => {
        dispatch(getScoreboard());
        dispatch(getCustomPlayers());
        
        const t = setInterval(() => {
            dispatch(getScoreboard());
        }, 5000);

        setScoreboardIntervalToken(t);

        return () => {
            clearInterval(scoreboardIntervalToken);
        }
    }, []);
}

export default useRefreshScoreboard;