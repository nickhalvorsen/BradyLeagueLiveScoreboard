import React from 'react';
import classes from './scoreboardRow.module.scss';

interface Props {
    label: string;
    value?: string;
    points?: string | number;
    projectedPoints?: string | number;
    isImmune?: boolean;
    isLast?: boolean;
    imageUrl?: string;
}

const ScoreboardRow: React.FC<Props> = (props: Props) => (
    <div className={`${classes.container} ${props.isLast ? classes.isLast : ''}`}>
        <div className={classes.nameContainer}>
            <img className={classes.icon} src={props.imageUrl} width="24" alt="team logo"/>
            <div className={classes.label}>{props.label}</div> 
        </div>
        <div className={classes.scoreContainer}>
            <span className={classes.descriptor}>proj. </span>
            <span className={classes.value}>{props.projectedPoints}</span>
            <span className={`${classes.descriptor} ${classes.currentTotal}`}>(current: {props.points})</span>
        </div>
    </div>
);

export { ScoreboardRow };