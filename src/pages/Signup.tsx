import axios from "axios";
import { useFormik } from "formik"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from 'react'
import { RotateLoader } from "react-spinners";


function Signup() {

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

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

      if (values.username === '') {
        errors.username = "the username field is required"
      } else if (values.username.length < 3) {
        errors.username = "the username must be greater than 2 characters"
      }


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

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "The confirm password is not equal the password"
      }

      if (values.mobile === '') {
        errors.mobile = "the mobile field is required"
      } else if (!/^(\+98|0)?9\d{9}$/.test(values.mobile)) {
        errors.mobile = "the mobile format is not possible"
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      const req = async () => {
        try {
          setIsLoading(true)
          const { data } = await axios.post('http://kzico.runflare.run/user/signup',
            {
              username: values.username,
              email: values.email,
              password: values.password,
              mobile: values.mobile,
            });
          setIsLoading(false);
          console.log(data);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'You successfully signed up',
            showConfirmButton: false,
            timer: 1500
          })
          navigate('/signin')
        } catch (error: any) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${error.response.data.message}`,
          });
          setIsLoading(false)
        }
      }
      req()
    }
  })
  const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode);

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      {isLoading ?
        <div className="flex justify-center w-screen h-screen items-center">
          <RotateLoader color="#fb41ff" />
        </div>
        : <div className="h-[100vh]  dark:bg-slate-600 light:bg-gradient-to-l from-violet-100 to-white">
          <h1 className="text-center pt-20 dark:text-slate-200 top-36 text-2xl font-bold">Sepehry Online Shop</h1>
          <div className="h-20"></div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col bg-violet-100
           w-2/6 border-2 dark:bg-slate-300 shadow-lg p-6 mx-auto h-fit rounded-lg">
            <label className="text-center">User Name</label>
            <input name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-2 py-1 px-4 pl-8 focus:outline-violet-400"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
              className="w-6 h-6 relative -top-8 left-2 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0
               0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>

            <p
              className="text-red-500 text-center mb-6 
        ">{formik.touched.username && formik.errors.username ? formik.errors.username : null}
            </p>

            <label className="text-center">Email</label>
            <input name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-2 py-1 px-4 pl-8 focus:outline-violet-400" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="w-6 h-6 relative -top-8 left-2 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>

            <p
              className="text-red-500 text-center mb-6"
            >{formik.touched.email && formik.errors.email ? formik.errors.email : null}</p>


            <label className="text-center">Password</label>
            <input name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-2 py-1 px-4 pl-8 focus:outline-violet-400" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative -top-8 left-2 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>

            <p
              className="text-red-500 text-center mb-6
        ">{formik.touched.password && formik.errors.password ? formik.errors.password : null}
            </p>


            <label className="text-center">Confirm Password</label>
            <input name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-2 py-1 px-4 pl-8 focus:outline-violet-400" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative -top-8 left-2 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>

            <p className="text-red-500 text-center mb-6"
            >{formik.touched.confirmPassword && formik.errors.confirmPassword ?
              formik.errors.confirmPassword : null}
            </p>


            <label className="text-center">Mobile</label>
            <input name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-2 py-1 px-4 pl-8 focus:outline-violet-400" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative -top-8 left-2 stroke-slate-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>

            <p className="text-red-500 text-center mb-6"
            >{formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : null}</p>


            <button type="submit" className="rounded-md mx-auto bg-violet-500 text-white
           w-fit py-1 px-4  hover:bg-violet-800 transition-all text-center
            ">Submit</button>
            <em className="text-center mt-6">By joining the site, you accept all the rules and terms of use of the site.</em>
          </form>
        </div>}
    </div>
  )
}

export default Signup