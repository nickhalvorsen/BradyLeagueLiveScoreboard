import React from 'react';
import classes from './scoreboardRow.module.scss';

interface ScoreboardRowProps {
    label: string;
    value?: string;
    points?: string | number;
    projectedPoints?: string | number;
    isImmune?: boolean;
    isLast?: boolean;
    imageUrl?: string;
}

const ScoreboardRow = (props: ScoreboardRowProps) => (
    <div className={classes.container} style={{ backgroundColor: props.isLast ? '#f7d2d5' : 'white'}}>
        <img className={classes.icon} src={props.imageUrl} width="20" alt="team logo"/>
        <div className={classes.label}>{props.label}</div> 
        <div>
            <span className={classes.descriptor}>proj. </span>
            <span className={classes.value}>{props.projectedPoints}</span>
            <span className={`${classes.descriptor} ${classes.currentTotal}`}>(current: {props.points})</span>
        </div>
    </div>
);

export default ScoreboardRow;