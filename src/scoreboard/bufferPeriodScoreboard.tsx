import React from 'react';
import BufferScoreboardRow from './bufferScoreboardRow';
import { Team } from '../store/espnSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const BufferPeriodScoreboard = () => {
    const teams: Team[] = useSelector<RootState>(state => state.espn.teams) as Team[];
    const sortedTeams = teams.slice().sort((a,b) => b.bufferPeriodTotalPoints - a.bufferPeriodTotalPoints);
    const week = useSelector<RootState>(state => state.espn.week) as number;

    if (week >= 4)
        return null;

    return (
        <div>
                <p>Weeks 1&ndash;3 scoring totals (w/o projections)</p>
                <div>
                    {sortedTeams.map(t => (
                        <BufferScoreboardRow 
                            label={`${t.name}`} 
                            points={t.bufferPeriodTotalPoints.toFixed(1)}
                            //isLast={(index === teams.length - 1 && !t.isImmune || (index === teams.length - 2 && sorted[sorted.length-1].team.isImmune))} 
                            key={t.id} 
                            imageUrl={t.logo}
                        />
                        ))}
                </div>
            </div>
    )
    
}

export default BufferPeriodScoreboard;