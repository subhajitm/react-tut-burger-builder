import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1.2,
    cheese: 1.2,
    meat: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: newPrice
        });
    }

    deleteIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) return;
        const updatedIngredient = {
            ...this.state.ingredients
        };
        updatedIngredient[type] -= 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredient,
            totalPrice: newPrice
        });
    }
    render () {
        const disabledIngredient = {
            ...this.state.ingredients
        };
        for (let key in disabledIngredient){
            disabledIngredient[key] = disabledIngredient[key] === 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.deleteIngredient}
                    disabled={disabledIngredient}
                    price={this.state.totalPrice}
                    />
            </Aux>
        );
    }
}

export default BurgerBuilder;