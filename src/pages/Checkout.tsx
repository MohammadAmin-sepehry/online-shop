import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../cartSlice";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { clearOrder } from "../orderSlice";
import {useState,useEffect} from 'react'
import axios from "axios";

function Checkout() {
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

  const dispatch = useDispatch()

  const products = useSelector((state: { order: { order: any } }) => state.order?.order?.orderItems);
  console.log(products); 

  const navigate = useNavigate()
  const cart1 = useSelector((state: { cart: { cart: (any)[] } }) => state.cart.cart);
  // const token = useSelector((state:any) => state.user?.user[0]?.user?.token );
  // const totalPrice = cart1.reduce((sum: any, item: any) => sum + item.totalPrice, 0);
  
  // const city = useSelector((state:any) => state.order2?.order2?.shippingAddress?.city);
  // const address = useSelector((state:any) => state.order2?.order2?.shippingAddress?.address);
  // const postalCode = useSelector((state:any) => state.order2?.order2?.shippingAddress?.postalCode);
  // const phone = useSelector((state:any) => state.order2?.order2?.shippingAddress?.phone);
  const orderItems:any = [];
  cart1.map((item)=>{
    orderItems.push({product:item.productId,qty:item.quantity})
  })


  const handleDone = () => {
    // dispatch(getOrderHistory(orderItems,city,address,postalCode,phone,token,totalPrice));
    dispatch(clearCart());
    dispatch(clearOrder());
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your shopping has been done',
      showConfirmButton: false,
      timer: 1500
    });
    navigate('/')
  }
  
  const cart = useSelector((state: { cart: { cart: (any)[] } }) => state.cart.cart);
  const totalCartPrice = cart.reduce((sum: any, item: any) => sum + item.totalPrice, 0);

  const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode);


  return (
    <div className={`${isDarkMode ? "dark dark:h-[100vh]" : "pb-56"}`}>
    <div className="flex flex-col">
      {products?.map((item: any) => {
        return <div key={item._id}>
          <div className="flex mt-10 px-2 rounded-lg lg:px-10
          bg-violet-100 items-center justify-between mx-5 dark:bg-slate-400
          ">
            <img className="w-52 h-56 object-contain" src={item.product.image} />
            <p className="dark:text-white sm:w-40">{item.product.name}</p>
            <p className="dark:text-white mr-4">{item.product.price}$</p>
            <p className="dark:text-white">quantity : {item.qty}</p>
          </div>
        </div>
      })}
      {products ? 
      <div>
        <p className="text-center mt-20 text-3xl font-bold font-sans dark:text-white">Total Price : {totalCartPrice} $</p>
      <div className="flex justify-evenly mt-40">
           <Link to='/cart' className="bg-lime-600 text-white hover:bg-lime-800 transition-all
           text-3xl py-2 px-8 rounded-lg">Edit</Link>
           <button className="bg-violet-600 text-white hover:bg-violet-800 transition-all
           text-3xl py-2 px-8 rounded-lg" onClick={handleDone}>Done</button>    
      </div> 
      </div>
      : 
      <div className="flex flex-col gap-24 justify-center
             h-[100vh] items-center"><p className="text-6xl font-bold
              dark:text-slate-100">Address form is empty 😐</p>
        <Link to='/address' className="bg-violet-500 py-2 px-8 rounded-lg hover:bg-violet-600
            transition-all text-white">Back to adress form</Link>
      </div>}
    </div>
    </div>
  )
}

export default Checkout