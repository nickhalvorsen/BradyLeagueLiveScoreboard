import React from 'react';
import ScoreboardRow from "./scoreboardRow";

const Scoreboard = ({rows}) => (
    <div style={{ maxWidth: '30em',}}>
        {rows.map((r, index) => (
            <ScoreboardRow 
                label={r.team.name} 
                points={r.totalPoints.toFixed(1)}
                projectedPoints={r.projectedPoints.toFixed(1)}
                isLast={(index === rows.length - 1)} 
                key={r.team.id} 
                imageUrl={r.team.logo}
            />
            ))}
    </div>
);

export default Scoreboard;