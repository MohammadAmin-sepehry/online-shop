import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:
        localStorage.getItem("user") != undefined
            ? JSON.parse(localStorage.getItem("user") || '{}')
            : [],
    isLoading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state, action) {
            state.user.push(action.payload)
            localStorage.setItem("user", JSON.stringify(state.user));
        },
        userLogout(state) {
            state.user = [];
            localStorage.removeItem("user");
        },
    }
})

export const {userLogin, userLogout } = userSlice.actions;

// export const userLogin: any = (email: string, password: string) => async (dispatch: any) => {
//     try {
//         dispatch({ type: 'user/userLoading', payload: true })
//         const { data } = await axios.post("http://kzico.runflare.run/user/login", {
//             email,
//             password,
//         });
//         dispatch({ type: "user/userLogin", payload: data });
//         console.log(data);
//     } catch (error: any) {
//         console.log(error);
//         dispatch({ type: 'user/userLoading', payload: false })
//     }
// };


export default userSlice.reducer;





















// export const server = createAsyncThunk('user/server',
//     async () => {
//         try {
//             const { data } = await axios.post('https://kzico.runflare.run/user/login', {
//                 email,
//                 password
//             });
//             return data
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )

// // 'https://kzico.runflare.run/user/login'
// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         userLogin(state, action) {
//             state.user.userInfo = action.payload;
//             localStorage.setItem("userInfo", 'user');
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(server.fulfilled, (state, action) => {
//             console.log(state);
//             console.log(action.payload);
//         })
//     }
// })
