import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../Component/Burger/Burger';
import Modal from '../../Component/UI/Modal/Modal';
import Backdrop from '../../Component/UI/Backdrop/Backdrop';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../Component/UI/Spinner/Spinner';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.7,
    meat:1.3,
    bacon:0.8
};

class BurgerBuilder extends Component{
    state = {
        ingredients :null,
        totalPrice :4,
        purchasable :false,
        purchasing : false,
        loading : false,
        error: false
    }

    componentDidMount(){
        axios.get("https://react-my-burger-1bed6.firebaseio.com/ingredients.json")
        .then(response=>{
            this.setState({ingredients:response.data});
        })
        .catch(error=>{this.setState({error:true})})
    }

    updatePurchasable = (ingredients) =>
    {
        const sum = Object.keys(ingredients).map(
            igKey => {return ingredients[igKey]})
            .reduce((sum,el)=>{return sum + el;},0);
        
            this.setState({purchasable:sum>0});
        
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    closePurchaseHandler = () =>{
        this.setState({purchasing:false});
    }

    continueHandler = () =>{
       // alert("Purchasing Continued");
       this.setState({loading:true});
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer: {
                name: 'Max',
                address:{
                    street:'bangalore-road',
                    zipCode:'960090',
                    country:'India'
                },
                email:'max@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post("/orders.json",order)
        .then(response => {this.setState({loading:false, purchasing:false})}
        )
        .catch(error => {this.setState({loading:false, purchasing:false}
            ,alert("Some Error Occured"))}
        );
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceAddition =   INGREDIENT_PRICES[type];
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredient});
        this.updatePurchasable(updatedIngredient);
    }

    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0)
        {return;}
        const updatedCount = oldCount - 1;
        const updatedIngredient = {...this.state.ingredients};
        updatedIngredient[type] = updatedCount;
        const oldPrice = this.state.totalPrice;
        const priceDeduction = INGREDIENT_PRICES[type];
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients:updatedIngredient,
            totalPrice:newPrice
        });
        this.updatePurchasable(updatedIngredient);
    }

    render()
    {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary=null;

        let burger = this.state.error ? <p>Ingredients cant be loaded!</p> : <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disabledInfo}
                price = {this.state.totalPrice}
                purchasable = {this.state.purchasable}
                ordered = {this.purchaseHandler}/>
                </Auxiliary>
            );

            orderSummary = <OrderSummary ingredients = {this.state.ingredients} 
            cancelled={this.closePurchaseHandler} 
            price = {this.state.totalPrice}
            continued={this.continueHandler}/>; 
        }

        if(this.state.loading)
        { 
            orderSummary = <Spinner/>;
        }

        return(
            <Auxiliary>
                <Backdrop show = {this.state.purchasing} clicked = {this.closePurchaseHandler}/>
                <Modal show = {this.state.purchasing} loading={this.state.loading}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default WithErrorHandler(BurgerBuilder,axios);