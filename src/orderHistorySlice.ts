import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    orderHistory: localStorage.getItem('orderHistory') != undefined
        ? JSON.parse(localStorage.getItem('orderHistory') || '{}') : []
}

const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState,
    reducers: {
        getOrderHistory(state, action) {
            state.orderHistory = action.payload;
            localStorage.setItem('orderHistory', JSON.stringify(state.orderHistory))
        },
        clearOrderHistory(state){
            state.orderHistory = [];
            localStorage.removeItem('orderHistory')
        }
    }
})

export const {clearOrderHistory} = orderHistorySlice.actions;

export const getOrderHistory:any =(orderItems:any, city:any, address:any, postalCode:any, phone:any, token:any,totalPrice:any) =>
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
            dispatch({ type: "orderHistory/getOrderHistory", payload: data });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };


export default orderHistorySlice.reducer;