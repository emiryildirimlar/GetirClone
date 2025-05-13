// redux/reducers/cartItems.ts

import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";
import { Product } from "../../models";

type CartItem = {
    product: Product;
    quantity: number;
};

const cartItems = (state: CartItem[] = [], action: any): CartItem[] => {
    switch (action.type) {
        case ADD_TO_CART: {
            const existingItem = state.find(
                (item) => item.product.id === action.payload.product.id
            );

            if (existingItem) {
                return state.map((item) =>
                    item.product.id === action.payload.product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...state, { product: action.payload.product, quantity: action.payload.quantity }];
            }
        }

        case REMOVE_FROM_CART:
            return state
                .map((item) =>
                    item.product.id === action.payload.product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0);

        case CLEAR_CART:
            return [];

        default:
            return state;
    }
};

export default cartItems;
