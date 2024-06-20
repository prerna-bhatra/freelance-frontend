import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../services/user.services";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/Loading";
import { setUser, setToken } from "../redux/slices/Authslice";
import PrimaryButton from "../common/PrimaryButton";
import imageUrls from "../constants/imageurls";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userType = useSelector((state) => state.user.userType);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    

    // Validate form fields
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.password 
    ) {
      setLoading(false);
      setError("All fields are required.");
      return;
    }

    if( formData.firstname && formData.lastname){
      const username = `${formData.firstname} ${formData.lastname}`;
      setFormData({ ...formData, username });

    }

    if (!isValidEmail(formData.email)) {
      setLoading(false);
      setError("Please enter a valid email address.");
      return;
    }

    if(!formData.username){ 
      setLoading(false);
      setError("Please enter a username.");
      return;
    }

    try {
      const res = await createUser({ ...formData, userType });

      if (res.data && res.data.success) {
        setLoading(false);
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.accessToken));

        navigate("/create-profile/welcome");
      } else {
        setLoading(false);
        setError(res.message || "Failed to sign up.");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while signing up.");
      console.error("Error fetching data:", error);
    }
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="min-h-screen  pt-5 flex flex-col sm:flex-row items-center justify-center">
      <div className="p-4">
        <img src={imageUrls.signup} alt="signup"  />
      </div>
      <form className=" w-11/12 sm:w-3/5 p-8 mt-8"  onSubmit={handleSubmit}>
        <h1 className="my-6 text-3xl font-medium text-[#00B386]">
          {userType === "CLIENT"
            ? "Signup to hire talent"
            : "Signup to find work for you"}
        </h1>
        <div className=" flex justify-between gap-x-2">
          <div className="mb-4 w-1/2">
            <label
              htmlFor="firstname"
              className="block text-sm font-normal text-primary-grey mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="border placeholder:font-normal rounded-lg px-3 py-2 w-full font-medium"
              required
            />
          </div>
          <div className="mb-4 w-1/2">
            <label
              htmlFor="lastname"
              className="block text-sm font-normal text-primary-grey mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="border placeholder:font-normal rounded-lg px-3 py-2 w-full font-medium"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-normal text-primary-grey mb-2"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-normal text-primary-grey mb-2"
          >
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
        {error && <p className="text-red-500 ">{error}</p>}
        <div className="my-5">

        <PrimaryButton
          onClick={handleSubmit}
          children="Create Account"
          loading={loading}
          widthFull={true}
          />
          </div>
        <p>
          Already have an Account?{" "}
          <span>
            <Link to="/login" className="text-xl text-primary-green font-bold hover:underline">
              Login
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
