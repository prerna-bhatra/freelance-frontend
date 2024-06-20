import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import AppBar from "../common/AppBar";


const FrontendHome = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to={"/signup/select-user"} />;
  }

  const isCreateProfileWelcome = location.pathname === "/create-profile/welcome";

  return (
    <div className="flex gap-y-16 flex-col font-rubik  min-h-screen">
      { !isCreateProfileWelcome && <AppBar/>}
      
      <Outlet />
    </div>
  );
};

export default FrontendHome;
