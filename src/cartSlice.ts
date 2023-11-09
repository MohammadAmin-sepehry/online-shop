import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart:
        localStorage.getItem("cart") != undefined
            ? JSON.parse(localStorage.getItem("cart") || '{}')
            : [],
    isLoading: false
}

type ItemTypes = {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
    image: string;
    countInStock: number
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cart.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        deleteItem(state, action) {
            state.cart = state.cart.filter((item: ItemTypes) => item.productId !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },
        increaseItemQuantity(state, action) {
            const item = state.cart.find((item: ItemTypes) => item.productId === action.payload);
            if (item.countInStock > item.quantity) item.quantity++;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            item.totalPrice = item.quantity * item.price
        },
        decreaseItemQuantity(state, action) {
            const item = state.cart.find((item: ItemTypes) => item.productId === action.payload)
            item.quantity--;
            localStorage.setItem("cart", JSON.stringify(state.cart));
            item.totalPrice = item.quantity * item.price;
            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
        },
        clearCart(state) {
            state.cart = []
        },
        cartLoading(state,action){
            state.isLoading = action.payload;
        }
    }
})

export const { cartLoading,addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;