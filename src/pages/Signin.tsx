import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import axios from "axios";
import { userLogin } from "../loginSlice";
import Swal from "sweetalert2";
import{useState} from 'react'


function Signin() {

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const [isLoading,setIsLoading] = useState(false)


  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
    },
    validate: (values) => {
      let errors: any = {};



      if (values.email === '') {
        errors.email = "the email field is required"
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
        errors.email = "the email format is not possible"
      }

      if (values.password === '') {
        errors.password = "the password field is required"
      } else if (values.password.length < 8) {
        errors.password = "the password must be greater than 8 characters"
      }



      return errors;
    },
    onSubmit: (values) => {

      const req = async () => {
        try {
          setIsLoading(true)
          const { data } = await axios.post("http://kzico.runflare.run/user/login", {
            email: values.email,
            password: values.password,
          });
          setIsLoading(false)
          dispatch(userLogin(data))
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `${data.message}`,
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/')
        } catch (error: any) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.response.data.message}`,
          });
          setIsLoading(false)
        }
      }
      req();
    }
  })
  const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode);


  return (

    <div className={`${isDarkMode ? "dark " : ""}`}>

      {isLoading ? <div className="flex justify-center w-screen h-screen items-center">
        <RotateLoader color="#fb41ff" />
      </div>
        : <div className="h-[100vh]  dark:bg-slate-600 
        light:bg-gradient-to-l from-violet-100 to-white">
          <h1 className="text-center pt-20 dark:text-slate-200 top-36 text-2xl font-bold">Sepehry Online Shop</h1>
          <div className="h-20 "></div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col  
         w-2/6 bg-white border-2 dark:bg-slate-300
         dark:shadow-lg dark:shadow-slate-400 shadow-lg p-6 mx-auto
         shadow-violet-400 h-fit rounded-lg">

            <label className="text-center">Email</label>
            <input name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-2 py-1 px-4 pl-8 focus:outline-violet-400" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="w-6 h-6 relative -top-8 left-2 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25
           2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25
            2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25
             2.25 0 01-1.07-1.916V6.75" />
            </svg>

            <p
              className="text-red-500 text-center mb-6"
            >{formik.touched.email && formik.errors.email ? formik.errors.email : null}</p>


            <label className="text-center">Password</label>
            <input name="password" type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-2 py-1 px-4 pl-8 focus:outline-violet-400" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative -top-8 left-2 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9
           0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25
            2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>

            <p
              className="text-red-500 text-center mb-6
          ">{formik.touched.password && formik.errors.password ? formik.errors.password : null}
            </p>


            <div className="flex">
              <button
                type="submit" className="rounded-md mx-auto bg-violet-500 text-white
            w-fit py-1 px-4  hover:bg-violet-800 transition-all text-center
          ">Log in</button>
              <Link to='/signup' className="rounded-md mx-auto bg-green-500 text-white
           w-fit py-1 px-4  hover:bg-green-800 transition-all text-center
           ">Sign Up</Link>
            </div>
          </form>

        </div>}
    </div>
  )
}

export default Signin