import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    order2: localStorage.getItem('order2') != undefined
        ? JSON.parse(localStorage.getItem('order2') || '{}') : [],
}

const orderSlice2 = createSlice({
    name: 'order2',
    initialState,
    reducers: {
        getOrder2(state, action) {
            state.order2 = action.payload;
            localStorage.setItem('order2', JSON.stringify(state.order2))
        },
        clearOrder2(state){
            state.order2 = [];
            localStorage.removeItem('order2')
        }
    }
})

export const {clearOrder2} = orderSlice2.actions;

export const getOrder2:any =(orderItems:any, city:any, address:any, postalCode:any, phone:any, token:any,totalPrice:any) =>
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
            dispatch({ type: "order2/getOrder2", payload: data });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };


export default orderSlice2.reducer;