import React from 'react';

interface ScoreboardRowProps {
    label: string;
    value: string;
    isImmune?: boolean;
    isLast?: boolean;
}

const ScoreboardRow = (props: ScoreboardRowProps) => (
    <div style={{...containerStyles, borderColor: props.isImmune ? 'gold' : props.isLast ? ' red': 'grey',}}>
        <div style={labelStyles}>{props.label}</div> <span style={valueStyles}>{props.value}</span>
    </div>
);

const containerStyles = {
    padding: '1em',
    borderWidth: '2px',
    backgroundColor: 'white',
    borderRadius: '2px',
    borderStyle: 'solid',
}

const labelStyles = {
    display: 'inline-block',
}

const valueStyles = {
    fontWeight: 'bold',
    fontSize: '1.5em'
}

export default ScoreboardRow;