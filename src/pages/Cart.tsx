import { useDispatch, useSelector } from "react-redux";
import { decreaseItemQuantity, deleteItem, increaseItemQuantity } from "../cartSlice";
import { Link } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import axios from "axios";
import {useState,useEffect} from 'react'

type CartTypes = {
    productId:string,
    name:string,
    image:string,
    countInStock:number,
    price:number,
    quantity:number,
    totalPrice:number
}


function Cart() {
    const [profile, setProfile] = useState(null);
    console.log(profile);

    const token = JSON.parse(localStorage.getItem('user')||'{}')[0]?.user?.token;

    const getProfile = async () => {
        try {
            const { data } = await axios.get('http://kzico.runflare.run/user/profile',
                {
                    headers: {
                        authorization:
                            `Bearer ${token}`
                    },
                })
            setProfile(data.user);
        } catch (error: any) {
          localStorage.removeItem("user")
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    const cart = useSelector((state: { cart: { cart: CartTypes[] } }) => state.cart.cart);

    const totalCartQuantity = cart.reduce((sum: number, item: CartTypes) => sum + item.quantity, 0);
    const totalCartPrice = cart.reduce((sum: number, item: CartTypes) => sum + item.totalPrice, 0);
    const dispatch = useDispatch()

    const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode);

    const isUser = useSelector((state:any)=>state?.user?.user[0]?.success);
    const isLoading = useSelector((state: { cart: { isLoading: boolean } }) => state.cart.isLoading)

    

    return (
        <div className={`${isDarkMode ? "dark dark:pb-56 dark:h-[100vh]" : "pb-56"}`}>
            {isLoading ?
                <div className="flex justify-center w-screen h-screen items-center">
                    <RotateLoader color="#fb41ff" />
                </div>
                : cart.map((item: {
                    productId: string, name: string, quantity: number, price: number,
                    totalPrice: number, image: string
                }, index: number) => {
                    return <div key={index} className="flex items-center my-10 mx-10 justify-between
                py-4 border-b-2">
                        <div className="flex items-center gap-10 ">
                            <img src={item.image} className="w-24 h-24 object-contain mix-blend-multiply brightness-125" />
                            <p className="dark:text-white">{item.name}</p>
                            <p className="dark:text-white mr-4">{item.price}$</p>
                        </div>
                        <div className="flex w-32 justify-between items-center">
                            <svg onClick={() => dispatch(decreaseItemQuantity(item.productId))}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="violet"
                                className="w-6 h-6 cursor-pointer">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365
                             9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75
                              0 000-1.5H9a.75.75 0 000 1.5h6z" clipRule="evenodd" />
                            </svg>
                            <p className="dark:text-white">{item.quantity}</p>
                            <svg onClick={() => {dispatch(increaseItemQuantity(item.productId))}}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="violet"
                                className="w-6 h-6 cursor-pointer ">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 
                            9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75
                             9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5
                              0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
                            </svg>
                            <svg onClick={() => dispatch(deleteItem(item.productId))}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red"
                                className="w-6 h-6 hover:stroke-red-700 cursor-pointer dark:stroke-red-100">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75
                             0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0
                              01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567
                               0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369
                                0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273
                                 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6
                                  0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75
                                   0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75
                                    0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                })}
            {cart.length > 0 ? <div>
                <div className="flex font-sans justify-center gap-10 text-2xl font-bold mt-40">
                    <p className="dark:text-white">Total Products : {totalCartQuantity}</p>
                    <p className="dark:text-white">Total Price : {totalCartPrice} $</p>
                </div>
                <Link to={isUser ? '/address' : '/signin'} className="flex justify-center mt-40
            w-fit mx-auto py-2 px-8 rounded-md text-xl dark:bg-violet-500 dark:shadow-lg
            dark:shadow-slate-500 dark:hover:bg-violet-600 dark:transition-all bg-violet-800
            hover:bg-violet-900 transition-all text-white ">Continue Shopping</Link>
            </div> :
                <div className={`${isDarkMode ? "dark" : ""}`}>
                    <div className="flex flex-col gap-24 justify-center
             h-[100vh] items-center"><p className="text-6xl font-bold dark:text-slate-100">cart is empty 😐</p>
                        <Link to='/' className="bg-violet-500 py-2 px-8 rounded-lg hover:bg-violet-600
            transition-all text-white">Back to products</Link>
                    </div>
                </div>}
        </div>
    )
}

export default Cart