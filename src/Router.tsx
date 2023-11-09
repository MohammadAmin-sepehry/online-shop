import Nav from './components/Nav';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
import Product from './pages/Product';
import Address from './pages/Address';
import Checkout from './pages/Checkout';
import Setting from './pages/Setting';
import ChangeProfile from './pages/ChangeProfile';
import ChangePassword from './pages/ChangePassword';
import UploadAvatar from './pages/UploadAvatar';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import Cart from './pages/Cart';
import Signin from './pages/Signin';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';


function Router() {
  const isDarkMode = useSelector((state:{ui:{isDarkMode:string}})=>state.ui.isDarkMode)

  const isUser = useSelector((state:any)=>state?.user?.user[0]?.success);



  return (
    <div className={`${isDarkMode ? "dark dark:bg-slate-600" : ""}`}>
      <div className='dark:bg-slate-600'>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NotFound />} />
          {!isUser&&<Route path='/signup' element={<Signup />} />}
          {!isUser&&<Route path='/signin' element={<Signin />} />}
          {isUser&&<Route path='/order' element={<Orders />} />}
          {isUser&&<Route path='/order/:id' element={<OrderDetails />} />}
          <Route path='/product/:id?' element={<Product />} />
         {isUser&&<Route path='/address' element={<Address />} />}
         {isUser&&<Route path='/checkout' element={<Checkout />} />}
         {isUser&&<Route path='/profile' element={<Profile />} />}
          <Route path='/cart' element={<Cart />} />
         {isUser&&<Route path='setting' element={<Setting />} >
            <Route path='change-profile' element={<ChangeProfile />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='upload-avatar' element={<UploadAvatar />} />
          </Route>}
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  )
}

export default Router