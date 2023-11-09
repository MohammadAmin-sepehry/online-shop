import axios from "axios"
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { RotateLoader } from "react-spinners";

type ProfileTypes = {
    age: number,
    city: string,
    email: string,
    firstname: string,
    gender: string,
    image: string,
    isAdmin: boolean,
    lastname: string,
    mobile: string,
    token: string,
    username: string,
    _id: string
}

function Profile() {

    const [profile, setProfile] = useState<ProfileTypes>()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const token = useSelector((state: any) => state?.user?.user[0].user.token);

    const getProfile = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.get('http://kzico.runflare.run/user/profile',
                {
                    headers: {
                        authorization:
                            `Bearer ${token}`
                    },
                })
            setProfile(data.user);
            setIsLoading(false)
        } catch (error: any) {
            setError(error.response.data.message);
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])


    const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode);

    return (
        <div className={`${isDarkMode ? "dark dark:h-[100vh]" : ""}`}>
            {isLoading ? <div className="flex justify-center w-screen h-screen items-center">
                <RotateLoader color="#fb41ff" />
            </div> : error ? <p className="flex justify-center text-5xl font-bold dark:text-slate-100
                  items-center h-[100vh]">{error}</p> : <div className="flex flex-col py-20  mx-auto
                  items-center dark:text-slate-100  mt-40 gap-10 bg-violet-100 
                  w-5/12 dark:bg-slate-400  rounded-lg shadow-xl dark:shadow-lg">
                <img src={profile?.image} className="w-32" />
                <p>Email Address : {profile?.email}</p>
                <p>User Name : {profile?.username}</p>
                <p >Mobile : <span className="font-sans">{profile?.mobile}</span></p>
                <p>First Name : {profile?.firstname}</p>
                <p>Last Name : {profile?.lastname}</p>
                <p>Gender : {profile?.gender}</p>
                <p>Age : {profile?.age}</p>
                <p>City : {profile?.city}</p>
            </div>}
        </div>
    )
}

export default Profile