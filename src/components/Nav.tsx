import { Link } from "react-router-dom"
import { Icon } from "@iconify/react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { toggleMode } from "../uiSlice";
import { userLogout } from "../loginSlice";

function Nav() {

  const isDarkMode = useSelector((state: { ui: { isDarkMode: string } }) => state.ui.isDarkMode);
  const dispatch = useDispatch();
  const toggleModeHandler = () => {
    dispatch(toggleMode());
  };



  const cart = useSelector((state: { cart: { cart: (string | number)[] } }) => state.cart.cart);
  const totalCartQuantity = cart.reduce((sum: any, item: any) => sum + item.quantity, 0);

  const totalCartPrice = cart.reduce((sum: any, item: any) => sum + item.totalPrice, 0);

  const handleLogOut = () => {
    dispatch(userLogout())
  }
  const isUser = useSelector((state:any)=>state?.user?.user[0]?.success);
  const userEmail = useSelector((state:any)=>state?.user?.user[0]?.user?.email);


  return (
    <div className={`${isDarkMode ? "dark sticky top-0 z-10" : "sticky top-0 z-10"}`}>

      <div className="navbar bg-violet-200
       dark:bg-slate-500 w-full md:w-full sm:w-full shadow-md dark:shadow-white">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost normal-case text-xl dark:text-white">Home</Link>
          <Icon
            onClick={toggleModeHandler}
            icon={isDarkMode ? "circum:dark" : "iconamoon:mode-light"}
            className="text-3xl cursor-pointer dark:text-white"
          />
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:stroke-slate-50"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"><path
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 
                1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item">{totalCartQuantity}</span>
              </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52
             bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">{totalCartQuantity} Items</span>
                <span className="text-info">Subtotal: ${totalCartPrice}</span>
                <div className="card-actions">
                  <Link to='/cart' className="btn btn-primary btn-block">View cart</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            {isUser ? <label tabIndex={0} className="btn btn-ghost ">
              <p className=" dark:text-white">{userEmail}</p>
            </label>
              :     <label tabIndex={0} className="btn btn-ghost ">
              <p className=" dark:text-white">Login</p>
            </label>    }
            {!isUser ? <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2
             shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to='/signin' className="justify-between">
                  Sign in
                </Link>
              </li>
              <li><Link to='/signup'>Sign Up</Link></li>
            </ul> :
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2
             shadow bg-base-100 rounded-box w-52">
                <li><Link to='/profile'>profile</Link></li>
                <li><Link to='/order'>orders</Link></li>
                <li><Link to='/setting'>setting</Link></li>
                <li><button onClick={handleLogOut}>log out</button></li>
              </ul>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav