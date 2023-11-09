import axios from "axios";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RotateLoader } from "react-spinners";


type ProductsTypes = {
  _id: string;
  name: string;
  countInStock: number;
  rating: number;
  image: string;
  price: number
}



function Home() {
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

  




  const x = useSelector((state)=>state)
  console.log(x);

  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>('');

  const getProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get('https://kzico.runflare.run/product')
      setProducts(data);
      setLoading(false)
    } catch (error) {
      if (
        typeof error === "object" && error &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        setIsError(error.message);
      }
      setLoading(false)
    }
  }


  useEffect(() => {
    getProducts()
  }, []);


  const isDarkMode = useSelector((state:{ui:{isDarkMode:string}}) => state.ui.isDarkMode);


  const image = `https://static.vecteezy.com/system/resources/previews/010/974/059/original/online-shopping-3d-illustration-online-shop-digital-marketing-concept-modern-store-3d-rendering-png.png`
  return (
    <div className={`${isDarkMode ? "dark mt-20" : ""}`}>
      <div className="grid grid-cols-1 justify-center items-center  pb-20 
      lg:grid lg:grid-cols-[1fr_300px] xl:grid xl:grid-cols-[1fr_1fr]
      dark:bg-slate-600 mt-20 ">
        <img src={image} className="w-full mx-auto" />
        <div className="w-full  mx-auto flex flex-col gap-16 mr-14 justify-center items-center
        ">
          <h1 className="text-5xl text-center font-bold leading-normal
          lg:text-6xl lg:leading-relaxed lg:mr-10 dark:text-white">Sepehry Online Shop</h1>
          <p className="text-center text-2xl lg:mr-10 dark:text-white">The Best Digital Products</p>
        </div>
      </div>
      <div className="dark:bg-slate-600 dark:text-white">
        <h2 className="font-bold text-4xl ml-10">Last Products</h2>
        <p className="ml-12 mt-6 text-2xl">free delivery 😊</p>
      </div>
      <div className="dark:bg-slate-600 grid grid-cols-1 mt-10 justify-center w-full items-center gap-20
    sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ?
          <div className="flex justify-center w-screen h-screen items-center">
            <RotateLoader color="#fb41ff" />
          </div>
          : isError ? <div className="flex h-screen items-center
        justify-center text-5xl font-bold w-screen"><p className="dark:text-white">{isError}</p></div>
            :
            products.map((product) => {
              return <div key={product._id} className="border-2 w-80 rounded-lg p-6 flex flex-col
        hover:scale-105 hover:transition-all shadow-lg shadow-violet-400 gap-5  dark:bg-slate-500 bg-violet-100
        justify-center items-center mx-auto dark:text-slate-200 dark:shadow-gray-400">
                <img src={product.image} className="w-64 h-64 object-contain mix-blend-multiply brightness-125" />
                <p title={product.name} className="truncate w-full text-center font-semibold text-
          lg">{product.name}</p>
                <p>Quantity : {product.countInStock}</p>
                <div className="flex w-full justify-between">
                  <p>{product.price} $</p>
                  <p>Rate : {product.rating} /5</p>
                </div>
                <Link to={`/product/${product._id}`} className="bg-violet-600 text-white py-1 px-4
          rounded-md">more...</Link>
              </div>
            })}
      </div>
    </div>
  )
}

export default Home