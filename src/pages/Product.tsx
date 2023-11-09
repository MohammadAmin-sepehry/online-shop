import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../cartSlice';
import Swal from 'sweetalert2';


type PrtoductTypes = {
    _id: string;
    name: string;
    color: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    brand: string;
    countInStock: number;
    image: string
}

function Product() {
    const [profile, setProfile] = useState(null)

    const token = JSON.parse(localStorage.getItem('user')||'{}')[0]?.user?.token;
    console.log(token);

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


    const [loading, setLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<string>('');

    const { id } = useParams();
    const [product, setProduct] = useState<PrtoductTypes>()

    const getProduct = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://kzico.runflare.run/product/${id}`)
            setProduct(data);
            setLoading(false);
        } catch (error) {
            if (
                typeof error === "object" && error &&
                "message" in error &&
                typeof error.message === "string"
            ) {
                setIsError(error.message);
            }
            setLoading(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [])

    const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode);
    console.log(isDarkMode);
    const dispatch = useDispatch()

    const cart = useSelector((state: { cart: { cart: (string | number)[] } }) => state.cart.cart);

    const itemInCart = cart?.find((item:any) => item.productId === id);

    const handleAddToCart = () => {
        const newItem = {
            productId: product?._id,
            name: product?.name,
            quantity: 1,
            price: product?.price,
            totalPrice: product?.price,
            image: product?.image,
            countInStock: product?.countInStock
        };
        if (itemInCart) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This product is already in your cart!'
            })
        } else {
            dispatch(addItem(newItem));
        }
    }


    return (
        <div className={`${isDarkMode ? "dark dark:bg-slate-600 dark:h-[100vh]" : ""}`}>
            {loading && <div className="flex justify-center w-screen h-screen items-center">
                <RotateLoader color="#fb41ff" />
            </div>}
            {isError && <div className="flex h-screen items-center
        justify-center text-5xl font-bold w-screen"><p>{isError}</p></div>}
            <div className={`${isDarkMode ? "dark dark:bg-slate-600" : ""}`}>
                <div className='grid grid-cols-1 mx-40 md:bg-violet-200 rounded-lg justify-center items-center gap-32 mt-32 pt-10 dark:rounded-lg
                md:grid md:grid-cols-2 md:dark:bg-slate-500 dark:shadow-lg dark:shadow-slate-400
                shadow-lg shadow-violet-400'>
                    <img className='w-full h-72 object-contain flex justify-center mx-5 mix-blend-multiply brightness-125' src={product?.image} />
                    <div className='flex flex-col justify-center items-start gap-y-10 mb-10 
                    md:mr-10'>
                        <p className='dark:text-slate-100 text-lg font-bold'><span className='text-sm text-violet-400'>Name : </span>{product?.name}</p>
                        <p className='dark:text-slate-100 text-lg font-bold'><span className='text-sm text-violet-400'>Brand : </span>{product?.brand}</p>
                        <p className='dark:text-slate-100 text-lg font-bold'><span className='text-sm text-violet-400'>Category : </span>{product?.category}</p>
                        <p className='dark:text-slate-100 text-lg font-bold w-full'><span className='text-sm text-violet-400'>Details : </span>{product?.description}</p>
                        <p className='dark:text-slate-100 text-lg font-bold'><span className='text-sm text-violet-400'>Color : </span>{product?.color}</p>
                        <p className='dark:text-slate-100 text-lg font-bold'><span className='text-sm text-violet-400'>Quantity : </span>{product?.countInStock}</p>
                        <p className='dark:text-slate-100 text-lg font-bold'><span className='text-sm text-violet-400'>Price : </span>{product?.price} $</p>
                        <p className='dark:text-slate-100 text-lg font-bold'><span className='text-sm text-violet-400'>Rate : </span>{product?.rating} / 5</p>
                    </div>
                </div>
                <div className='flex w-full justify-center bg-white mt-20 dark:bg-slate-600 '>
                    <button onClick={handleAddToCart} className=
                        'dark:shadow-slate-400 dark:shadow-md dark:bg-violet-500 bg-violet-600 mb-10 w-40 text-center rounded-md px-4 dark:mb-10 py-2 text-white'>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Product