import React from 'react';
import { ScoreboardRow } from './scoreboardRow';
import { ScoreboardRow as ScoreboardRowData } from '../store/espnSlice';
import classes from './scoreboard.module.scss';

interface Props {
  rows: ScoreboardRowData[];
}

const Scoreboard: React.FC<Props> = (props) => (
  <div className={classes.scoreboard}>
    {props.rows.map((r, index) => (
      <ScoreboardRow
        label={r.team.name}
        points={r.totalPoints.toFixed(1)}
        projectedPoints={r.projectedPoints.toFixed(1)}
        isLast={index === props.rows.length - 1}
        key={r.team.id}
        imageUrl={r.team.logo}
      />
    ))}
  </div>
);

export { Scoreboard };
