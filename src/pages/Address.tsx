import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getOrder } from "../orderSlice";
import { getOrder2 } from "../orderSlice2";
import axios from "axios";
import { useEffect, useState } from "react";



function Address() {
  const [profile, setProfile] = useState(null)
  
  
  
  const getProfile = async () => {
      const token = JSON.parse(localStorage.getItem('user')||'{}')[0]?.user?.token;
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




const navigate = useNavigate();

const cart = useSelector((state: { cart: { cart: ({productId:string,name:string,quantity:number,price:number,totalPrice:number,image:string})[] } }) => state.cart.cart);

const totalPrice = cart.reduce((sum: number, item: {totalPrice:number}) => sum + item.totalPrice, 0);


const orderItems:{product:string,qty:number}[] = [];
cart.map((item)=>{
  orderItems.push({product:item.productId,qty:item.quantity})
})


const token = useSelector((state:any)=>state?.user?.user[0].user.token);


const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      city: '',
      address: '',
      postalCode: '',
      phone: '',
    },
    validate: (values) => {
      let errors: any = {};

      if (values.city === '') {
        errors.city = "the city field is required"
      }


      if (values.address === '') {
        errors.address = "the address field is required"
      }

      if (values.postalCode === '') {
        errors.postalCode = "the postal code field is required"
      }


      if (values.phone === '') {
        errors.phone = "the phone field is required"
      } else if (!/^(\+98|0)?9\d{9}$/.test(values.phone)) {
        errors.phone = "the phone format is not possible"
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log('object');
     dispatch(getOrder(orderItems,values.city,values.address,values.postalCode,values.phone,token,totalPrice));
     dispatch(getOrder2(orderItems,values.city,values.address,values.postalCode,values.phone,token,totalPrice));
     navigate("/checkout");
  }})



  const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode)



  return (
    <div className={`${isDarkMode ? "dark h-[100vh]" : ""}`}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center 
    w-3/6 mx-auto mt-40 border-2 p-8 rounded-lg shadow-lg dark:bg-slate-500 bg-violet-100">
        <label className="text-center dark:text-white">Your City</label>
        <input name="city"
          className="dark:focus:bg-white border-2 py-1 px-4 mb-10 dark:bg-slate-300
           hover:outline-violet-400"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p
          className="text-red-500 text-center mb-6 
        ">{formik.touched.city && formik.errors.city ? formik.errors.city : null}
        </p>

        <label className="text-center dark:text-white">Address</label>
        <input
        name="address"
          className="border-2 dark:focus:bg-white py-1 px-4 mb-10
           dark:bg-slate-300 hover:outline-violet-400"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p
          className="text-red-500 text-center mb-6 
        ">{formik.touched.address && formik.errors.address ? formik.errors.address : null}
        </p>

        <label className="text-center dark:text-white">Postal Code</label>
        <input name="postalCode"
          className="dark:focus:bg-white border-2 py-1 px-4 mb-10 dark:bg-slate-300
           hover:outline-violet-400"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p
          className="text-red-500 text-center mb-6 
        ">{formik.touched.postalCode && formik.errors.postalCode ? formik.errors.postalCode : null}
        </p>

        <label className="text-center dark:text-white">Phone Number</label>
        <input name="phone"
          className="border-2 dark:focus:bg-white py-1 px-4 mb-10
           dark:bg-slate-300 hover:outline-violet-400"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <p
          className="text-red-500 text-center mb-6 
        ">{formik.touched.phone && formik.errors.phone ? formik.errors.phone : null}
        </p>

        <button  type="submit" className="dark:bg-violet-400 dark:hover:bg-violet-500 rounded-md mx-auto
         bg-violet-500 text-white dark:hover:transition-all
       w-fit text-2xl py-2 px-6
      ">Next</button>
      </form>
    </div>
  )
}

export default Address