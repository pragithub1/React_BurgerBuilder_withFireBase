import React from 'react';
import Button from '../../UI/Button/Button';
import Auxiliary from  '../../../hoc/Auxiliary/Auxiliary';

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igkey => {
        return(<li key={igkey}>
            <span style={{textTransform:"capitalize"}}> {igkey} </span> : {props.ingredients[igkey]}
            </li>);
    });

    return(
        <Auxiliary>
            <h1>Your Order</h1>
            <p>Delicious Burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to CheckOut?</p>
            <Button btnType="Danger" clicked = {props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </Auxiliary>
    );
};

export default orderSummary;