import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function NavHeader() {
  const {user} = useContext(UserContext);
  let className = 'text-2xl w-60';
  
  if (user) {
    className += ' text-center bg-primary text-white rounded-3xl py-2';
  }

  return (
    <header className="border-b border-b-gray-400">
      <div className="flex justify-between items-center pb-4">
        <Link to={'/'} href="" className="flex gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} className="size-8 stroke-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z" />
          </svg>
          <span className='font-semibold text-3xl text-primary'>MyKitcken</span>
        </Link>
        <div className="flex gap-40 absolute left-1/2 transform -translate-x-1/2">
          <NavLink to="/recipe" className={({ isActive }) => isActive 
            ? "bg-primary text-white text-2xl px-16 py-2 rounded-3xl"
            : "text-black text-2xl px-16 py-2"
          }>
            My Recipe
          </NavLink>
          <NavLink to="/storage" className={({ isActive }) => isActive 
            ? "bg-primary text-white text-2xl px-16 py-2 rounded-3xl"
            : "text-black text-2xl px-16 py-2"
          }>
            My Storage
          </NavLink>
        </div>
        <Link className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
          </div>
          {!!user && (
            <div className="text-xl">
              {user.name}
            </div>
          )}
        </Link>
      </div>
      
    </header>
  );
}