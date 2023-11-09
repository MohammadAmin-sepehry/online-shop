import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux"
import { getchangeProfile } from "../changeProfileSlice";
import axios from "axios";
import {useState,useEffect} from 'react'


type FormikTypes = {

  initialValues: {
    firstname: string,
    lastname: string,
    gender: string,
    age: string,
    city: string,
  }
  handleSubmit: () => void,
  handleBlur: () => void,
  handleChange: () => void,
  values: {
    firstname: string,
    lastname: string,
    gender: string,
    age: string,
    city: string,
  },
  touched:any,
  errors:any
}

function ChangeProfile() {
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


  const formik: FormikTypes | any  = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      gender: '',
      age: '',
      city: '',
    },
    validate: (values) => {
      let errors: any = {};

      if (values.firstname === '') {
        errors.firstname = "the firstname field is required"
      } else if (values.firstname.length < 3) {
        errors.firstname = "the firstname must be greater than 2 characters"
      }

      if (values.lastname === '') {
        errors.lastname = "the lastname field is required"
      } else if (values.lastname.length < 3) {
        errors.lastname = "the lastname must be greater than 2 characters"
      }


      if (values.gender === '') {
        errors.gender = "the gender field is required"
      } else if (values.gender !== 'male' && values.gender !== 'female') {
        errors.gender = "you must be male or female"
      }

      if (values.age === '') {
        errors.age = "the age field is required"
      } else if (values.age < 18) {
        errors.age = "you must be greater than 18 year old"
      }

      if (values.city === '') {
        errors.city = "the city field is required"
      }



      return errors;
    },
    onSubmit: (values: any) => {
      dispatch(getchangeProfile(values.firstname, values.lastname, values.gender, values.age, values.city, token))
    }
  })


  const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode)

  return (
    <div className={`${isDarkMode ? "dark dark:bg-bg-600" : ""}`}>
      <em className="relative text-center
      text-2xl block mt-10 dark:text-white mb-10">Change your profile informations</em>
      <form onSubmit={formik.handleSubmit} className=" flex flex-col 
             md:flex md:flex-col md:justify-center w-3/6 bg-violet-100
              xl:flex xl:flex-col xl:justify-center xl:items-center 
          lg:w-3/6 xl:w-3/6 mx-auto md:w-3/6 dark:bg-slate-300  p-8 shadow-xl rounded-md">
        <label className="text-center xl:flex xl:justify-center">First Name</label>
        <input
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="xl:flex xl:justify-center border-2 py-1 px-4 mb-10 focus:outline-violet-400 xl:w-4/5" />
        <p
          className="text-red-500 text-center mb-6 
        ">{formik.touched.firstname && formik.errors.firstname ? formik.errors.firstname : null}
        </p>



        <label className="text-center xl:flex xl:justify-center">Last Name</label>
        <input
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="xl:flex xl:justify-center border-2 py-1 px-4 mb-10 focus:outline-violet-400 xl:w-4/5" />
        <p
          className="text-red-500 text-center mb-6 
        ">{formik.touched.lastname && formik.errors.lastname ? formik.errors.lastname : null}
        </p>


        <label className="text-center xl:flex xl:justify-center">Gender</label>
        <input name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="xl:flex xl:justify-center border-2 py-1 px-4 mb-10 focus:outline-violet-400 xl:w-4/5" />
        <p
          className="text-red-500 text-center mb-6 
        ">{formik.touched.gender && formik.errors.gender ? formik.errors.gender : null}
        </p>



        <label className="text-center xl:flex xl:justify-center">Age</label>
        <input name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="xl:flex xl:justify-center border-2 py-1 px-4 mb-10 focus:outline-violet-400 xl:w-4/5" />
        <p
          className="text-red-500 text-center mb-6 
        ">{formik.touched.age && formik.errors.age ? formik.errors.age : null}
        </p>



        <label className="text-center xl:flex xl:justify-center">City</label>
        <input name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="xl:flex xl:justify-center border-2 py-1 px-4 mb-10 focus:outline-violet-400 xl:w-4/5" />
        <p
          className="text-red-500 text-center mb-6 
        ">{formik.touched.city && formik.errors.city ? formik.errors.city : null}
        </p>



        <button type="submit" className="rounded-md mx-auto bg-violet-500 text-white
               w-fit text-2xl py-2 px-6 hover:bg-violet-800 transition-all
      ">Done</button>
      </form>
    </div>
  )
}

export default ChangeProfile