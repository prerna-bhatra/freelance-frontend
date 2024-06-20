import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/user.services";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../common/Loading";
import { setUser, setToken, setUserType } from "../redux/slices/Authslice";
import PrimaryButton from "../common/PrimaryButton";
import { getClientProfileByUserID, getFreelancerProfileByUserID } from "../services/profile.services";
import { setUserProfile } from "../redux/slices/profileSlice";
import imageUrls from "../constants/imageurls";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userType = useSelector((state) => state.user.userType);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form fields
    if (!formData.email || !formData.password) {
      setLoading(false);
      setError("Email and password are required.");
      return;
    }

    try {
      const res = await loginUser(formData);

      if (res.data && res.data.success) {
        setLoading(false);
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.accessToken));
        dispatch(setUserType(res.data.user.userType));

        console.log("LoginProfile : ", res.data.user);
        if (res.data.user.userType === "FREELANCER") {
          const profileData = await getFreelancerProfileByUserID(
            res.data.user.id,
            res.data.accessToken
          );
          if (profileData.data && profileData.data.success) {
            dispatch(setUserProfile(profileData.data.freelancer));
            navigate("/");
          }
        }else if(res.data.user.userType === "CLIENT"){
          const profileData = await getClientProfileByUserID(
            res.data.user.id,
            res.data.accessToken
          );
          if (profileData.data && profileData.data.success) {
            dispatch(setUserProfile(profileData.data.client));
            navigate("/");
          }
        }
      } else {
        setLoading(false);
        setError(res.message || "Failed to log in.");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while logging in.");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="min-h-screen  p-5 flex flex-col sm:flex-row items-center justify-around ">
    <div className="p-4">
      <img src={imageUrls.signup} alt="login"  />
    </div>
      <form className=" mt-8 sm:mr-5">
        <div className="mb-4">
          <h1 className=" my-6 text-3xl  font-medium text-[#00B386]">
            {userType === "CLIENT"
              ? `Login to hire talent`
              : `Login to find work for you`}
          </h1>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border placeholder:font-normal rounded-lg px-3 py-2 w-full font-medium"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border placeholder:font-normal rounded-lg px-3 py-2 w-full font-medium"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-5">
          <PrimaryButton
            onClick={handleSubmit}
            children={`Login`}
            loading={loading}
            widthFull={true}
          />
        </div>

        <p>
          Create a New Account ?{" "}
          <span>
            <Link
              to={"/signup/select-user"}
              className="font-medium text-xl text-[#00B386] hover:underline"
            >
              Signup
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
