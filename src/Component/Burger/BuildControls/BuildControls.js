import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
];

const buildControls = (props) =>(
    <div className={classes.buildControls}>
        <p><strong>Current Price: {props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (<BuildControl 
        added={() => props.ingredientAdded(ctrl.type)} 
        removed = {() => props.ingredientRemoved(ctrl.type)}
        disabled = {props.disabled[ctrl.type]}
        key={ctrl.label} 
        label={ctrl.label}/>))}
        <button className={classes.OrderButton} onClick={props.ordered} disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;