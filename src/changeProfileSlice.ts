import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import Swal from "sweetalert2";

const initialState:any = {
    changeProfile: localStorage.getItem('changeProfile') != undefined ?
        JSON.stringify(localStorage.getItem('changeProfile') || '{}') : {},
}

const changeProfileSlice = createSlice({
    name: 'changeProfile',
    initialState,
    reducers: {
        getChangeProfile(state, action) {
            state.changeProfile = action.payload;
            localStorage.setItem('changeProfile', state.changeProfile)
        }, 
    }
})

export const getchangeProfile:any = (firstname: string, lastname: string, gender: string, age: string, city: string, token: string) => async (dispatch: any) => {
    try {

        const { data } = await axios.put(
            "http://kzico.runflare.run/user/change-profile", {
            firstname,
            lastname,
            gender,
            age,
            city,
        }, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }
        );
        dispatch({ type: 'changeProfile/getChangeProfile', payload: data });
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500
        })
    } catch (error:any) {
        console.log(error.response.data.message);
    }
}

export default changeProfileSlice.reducer;