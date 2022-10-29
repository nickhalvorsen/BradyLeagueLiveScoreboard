import React from 'react';

interface ScoreboardRowProps {
    label: string;
    value: string | number;
    valueNote?: string;
    isImmune?: boolean;
    isLast?: boolean;
}

const ScoreboardRow = (props: ScoreboardRowProps) => (
    <div style={{...containerStyles, borderColor: props.isImmune ? 'gold' : props.isLast ? ' red': 'grey',}}>
        <div style={labelStyles}>{props.label}</div> 
        <br/>
        <div style={valueContainerStyles}>
            <span>{props.valueNote}</span>
            <span style={valueStyles}>{props.value}</span>    
        </div>
        
    </div>
);

const containerStyles = {
    padding: '1em',
    borderWidth: '2px',
    backgroundColor: 'white',
    borderRadius: '2px',
    borderStyle: 'solid',
    display: 'flex',
}

const labelStyles = {
    display: 'inline-block',
    width: '40%'
}

const valueContainerStyles = {

}

const valueStyles = {
    fontWeight: 'bold',
    fontSize: '1.5em'
}

export default ScoreboardRow;