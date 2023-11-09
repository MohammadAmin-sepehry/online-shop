
import axios from "axios";
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RotateLoader } from "react-spinners";


function Orders() {
  
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


  const [orders, setOrders] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const req = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get("http://kzico.runflare.run/order/", {
        headers: {
          authorization:
            `Bearer ${token}`,
        },
      });
      setOrders(data);
      setIsLoading(false);
      console.log(data);
    } catch (error: any) {
      setError(error.response.data.message);
      setIsLoading(false)
    }
  }

  useEffect(() => {
    req()
  }, [])

  const navigate = useNavigate()


  const orderId = (id:string)=>{
    const orderid = (orders.find((item:any)=>item._id === id)._id);
    console.log(orderid);
    navigate(`/order/${orderid}`)
  } 
  

  const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode);

  return (
    <div className={`${isDarkMode ? "dark dark:pb-56 dark:h-[100vh]" : "pb-56"}`}>
      {isLoading ? <div className="flex justify-center w-screen h-screen items-center">
        <RotateLoader color="#fb41ff" />
      </div>
        : error ? <p className="flex justify-center text-5xl font-bold dark:text-slate-100
         items-center h-[100vh]">{error}</p> : <div 
        className="flex flex-col gap-10 py-10">
          {orders.map((item: any) => {
            return <div key={item._id} className="flex justify-between 
        dark:text-sky-50 mx-5 px-5 py-2 dark:bg-slate-500 bg-violet-100">
              {/* <p className="w-72">{item.orderItems}</p> */}
              <p className="w-40">total price : {item.totalPrice} $</p>
              {/* <p>qty: {item.qty}</p> */}
              <button onClick={()=>{orderId(item._id)}} className="bg-violet-400 
        hover:bg-violet-500 transition-all py-1 px-2 text-white rounded-sm">products details</button>
            </div>
          })}
        </div>}
    </div>
  )
}

export default Orders