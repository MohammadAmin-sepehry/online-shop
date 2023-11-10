import axios from "axios";
import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import Swal from "sweetalert2";


function UploadAvatar() {
  

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


  const [pic, setPic] = useState<any>(null);


  const uploadAvatar:any = async () => {
    const formData:any = new FormData();
    formData.append("profile-image", pic);
    try {
      const { data } = await axios.post(
        "http://kzico.runflare.run/user/profile-image",
        formData,
        {
          headers: {
            authorization:
              `Bearer ${token}`
          },
        }
      );
      setPic(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      })
    }
  };

  const handleSetPic = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPic(e.target.files[0])
  }

  const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode)

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <form onSubmit={e=>e.preventDefault()}>
        <div className=" flex gap-5 h-full py-40 flex-col justify-center items-center">
          <input onChange={handleSetPic} type="file" 
          className="file-input file-input-bordered 
      file-input-primary w-full max-w-xs" />

          <button onClick={uploadAvatar} type="submit" className="rounded-md mx-auto
           bg-violet-500 text-white
       w-fit text-lg py-1 px-4 hover:bg-violet-800 transition-all
      ">upload</button>
        </div>
      </form>
    </div>
  )
}

export default UploadAvatar