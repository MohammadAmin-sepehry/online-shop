import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    order: localStorage.getItem('order') != undefined
        ? JSON.parse(localStorage.getItem('order') || '{}') : [],
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        getOrder(state, action) {
            state.order = action.payload;
            localStorage.setItem('order', JSON.stringify(state.order))
        },
        clearOrder(state){
            state.order = [];
            localStorage.removeItem('order')
        }
    }
})

export const {clearOrder} = orderSlice.actions;

export const getOrder:any =(orderItems:any, city:any, address:any, postalCode:any, phone:any, token:any,totalPrice:any) =>
async(dispatch:any) => {
        try {
            const { data } = await axios.post(
                "http://kzico.runflare.run/order/submit", {
                    orderItems,
                    shippingAddress: {
                        address,
                        city,
                        postalCode,
                        phone,
                    },
                    paymentMethod: "ship",
                    shippingPrice: "5",
                    totalPrice,
                }, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            dispatch({ type: "order/getOrder", payload: data });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };


export default orderSlice.reducer;