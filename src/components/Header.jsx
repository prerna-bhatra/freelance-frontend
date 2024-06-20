import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/Authslice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const useSelector( state => state.user.logout)
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signup/select-user");
  };

  const handleSubmit = () => {
    navigate("/");
  };
  return (
    <nav className="bg-[#282c34] px-4 text-white  text-2xl h-[70px] flex justify-between items-center">
      <h1 className=" font-bold text-[#00B386]" onClick={handleSubmit}>Winwave</h1>
      <div className="flex sm:w-1/2 justify-between ">
        <Link to="/" className="hover:text-red-200">
          Home
        </Link>

        <Link to="/about" className="hover:text-red-200">
          About
        </Link>

        <li onClick={handleLogout} className="hover:text-red-200">
          Logout
        </li>
      </div>
    </nav>
  );
};

export default Header;
