import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function IndexPage() {
  const {user} = useContext(UserContext);

  if (user) {
    return <Navigate to={"/recipe"} />
  }

  return (
    <div className="flex flex-col items-center text-center">
        <h1 className="text-primary w-2/3 pt-40 text-center font-bold text-7xl">
          Effortlessly manage your recipes and track pantry essentials in one place.
        </h1>
        <div className="flex gap-20 mt-20">
          <Link className="border border-primary rounded-3xl py-4 px-20 text-xl font-semibold" to={'/login'}>Log In</Link>
          <Link className="bg-primary rounded-3xl text-white py-4 px-20  text-xl font-semibold" to={'/register'}>Sign Up</Link>
        </div>
    </div>
  );
}