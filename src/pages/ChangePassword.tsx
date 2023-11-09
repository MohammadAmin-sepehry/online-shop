import { useState,useEffect } from 'react'
import axios from "axios"
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';


function ChangePassword() {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const token = useSelector((state:any)=>state?.user?.user[0].user.token);


  const changePassword = async () => {
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


    try {
      const { data } = await axios.put(
        "http://kzico.runflare.run/user/change-password",
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            authorization:
              `Bearer ${token}`,
          },
        },
      )
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error:any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,

      })
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }


  const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode)

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="h-full py-20">
        <form onSubmit={(e) => { changePassword(); handleSubmit(e) }} className="flex flex-col justify-center 
    w-5/6 mx-auto items-center p-10  bg-violet-100
    sm:w-3/6 md:w-3/6 lg:w-3/6 xl:w-3/6 shadow-xl rounded-lg dark:bg-slate-300">
          <label className="text-center">Old Password</label>
          <input  onChange={e => setOldPassword(e.target.value)} name="city"
            className="w-5/6 border-2 py-1 px-4 mb-10 focus:outline-violet-400" />

          <label className="text-center">New Password</label>
          <input  onChange={e => setNewPassword(e.target.value)}
            className="w-5/6 border-2 py-1 px-4 mb-10 focus:outline-violet-400" />


          <button type="submit" className="rounded-md mx-auto bg-violet-500 text-white
       hover:bg-violet-800 transition-all w-fit text-2xl py-2 px-6
      ">Done</button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword