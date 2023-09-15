import React from 'react';
import classes from './bufferScoreboardRow.module.scss';

interface BufferScoreboardRowProps {
    label: string;
    value?: string;
    points?: string | number;
    //isImmune?: boolean;
    isLast?: boolean;
    imageUrl?: string;
}

const ScoreboardRow = (props: BufferScoreboardRowProps) => (
    <div className={classes.rowContainer} /*style={{ backgroundColor: props.isLast ? '#f7d2d5' : 'white'}}*/>
        <img className={classes.icon} src={props.imageUrl} width="20"/>
        <div className={classes.label}>{props.label}</div> 
        <div>
            <span className={classes.value}>{props.points}</span>
        </div>
    </div>
);

export default ScoreboardRow;