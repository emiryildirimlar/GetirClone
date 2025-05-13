// redux/actions/cartActions.ts

import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";
import { Product } from "../../models";

export const addToCart = (product: Product, quantity: number = 1) => {
    return {
        type: ADD_TO_CART,
        payload: { product, quantity },
    };
};

export const removeFromCart = (product: Product) => {
    return {
        type: REMOVE_FROM_CART,
        payload: { product },
    };
};

export const clearCart = () => {
    return {
        type: CLEAR_CART,
    };
};
