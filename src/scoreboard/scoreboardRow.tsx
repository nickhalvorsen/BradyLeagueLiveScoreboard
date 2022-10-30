import React from 'react';

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
    <div style={outerContainerStyles}>
        <div style={{...containerStyles, borderColor: props.isImmune ? 'gold' : 'black', backgroundColor: props.isLast ? '#f7d2d5' : 'white'}}>
            <img src={props.imageUrl} width="20"/>
            &nbsp;
            <div style={labelStyles}>{props.label}</div> 
            <br/>
            <div style={valueContainerStyles}>
                
                <span style={descriptorStyles}>proj. </span>
                <span style={valueStyles}>{props.projectedPoints}</span>
                
                {/* <span style={descriptorStyles}>current </span> */}
                <span style={{}}> (current: {props.points})</span>
                {/* <span style={valueStyles}>{props.points}</span>     */}
            </div>
        </div>
        {/* <div style={afterContainerStyles}>
            proj. {props.projectedPoints}
        </div> */}
    </div>
);

const outerContainerStyles = {
    display: 'flex'
}

const containerStyles = {
    padding: '1em',
    minWidth: '30em',
    borderWidth: '1px',
    // backgroundColor: 'white',
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

const afterContainerStyles = {
    //display: 'inline-block'
}

const descriptorStyles = {
    fontSize: '.8em',
}

export default ScoreboardRow;