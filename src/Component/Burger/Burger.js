import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{
    let modIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return[...Array(props.ingredients[igKey])].map((_,i)=>{
            return(<BurgerIngredient key={i+igKey} type={igKey}/>);
        }

        );
    }).reduce((arr,el) => {return arr.concat(el)}, []);

    if(modIngredients.length === 0)
    {
        modIngredients = <p>Please, add ingredients.</p>;
    }

    return(
        <div className={classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                {modIngredients}
                <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}



export default burger;
