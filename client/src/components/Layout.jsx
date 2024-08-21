import { Outlet } from "react-router-dom";
import NavHeader from "./NavHeader";

export default function Layout() {
  return (
    <div className="py-8 px-8 flex flex-col min-h-screen mx-auto">
      <NavHeader />
      <Outlet />
    </div>  
  );
}