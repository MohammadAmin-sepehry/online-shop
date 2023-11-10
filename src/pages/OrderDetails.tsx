import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { RotateLoader } from 'react-spinners';

function OrderDetails() {
    const [profile, setProfile] = useState(null);
    console.log(profile);

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

    const [order, setOrder] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


   

    const { id } = useParams();




    useEffect(() => {
        const req = async () => {
            setIsLoading(true)
            try {
                const { data } = await axios.get(`http://kzico.runflare.run/order/${id}`, {
                    headers: {
                        authorization:
                            `Bearer ${token}`,
                    },
                });
                setOrder(data.orderItems);
                setIsLoading(false)
            } catch (error: any) {
                setError(error.response.data.message);
                setIsLoading(false)
            }
        }
        req();

    }, []);

    console.log(order);
    const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode);


    return (
        <div className={`${isDarkMode ? "dark h-full" : ""}`}>
            {isLoading ? <div className="flex justify-center w-screen h-screen items-center">
                <RotateLoader color="#fb41ff" />
            </div>

                : error ? <p className="flex justify-center text-5xl font-bold dark:text-slate-100
         items-center h-[100vh]">{error}</p> : <div className='flex flex-col gap-5 py-5 px-5 '>
                    {order.map((item: {product:{description:string,image:string,name:string,category:string,brand:string,price:number,rating:number}}) => {
                        return <div key={item.product.description} className='flex flex-col gap-5 rounded-md
            dark:bg-slate-500 dark:text-slate-100 bg-violet-100 p-5'>
                            <img src={item.product.image} className='w-36 h-40 object-contain mix-blend-multiply brightness-125' />
                            <p><span className='text-sm text-violet-500 dark:text-violet-200'>name : </span>{item.product.name}</p>
                            <p><span className='text-sm text-violet-500 dark:text-violet-200'>category : </span>{item.product.category}</p>
                            <p><span className='text-sm text-violet-500 dark:text-violet-200'>brand : </span>{item.product.brand}</p>
                            <p><span className='text-sm text-violet-500 dark:text-violet-200'>details : </span>{item.product.description}</p>
                            <p><span className='text-sm text-violet-500 dark:text-violet-200'>price : </span>{item.product.price}$</p>
                            <p><span className='text-sm text-violet-500 dark:text-violet-200'>rating : </span>{item.product.rating} / 5</p>
                        </div>
                    })}
                </div>}
        </div>
    )
}

export default OrderDetails