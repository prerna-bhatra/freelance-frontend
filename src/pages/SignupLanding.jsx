import { useDispatch, useSelector } from "react-redux";
import React , { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { setUserType } from "../redux/slices/Authslice";
import PrimaryButton from "../common/PrimaryButton";
import imageUrls from "../constants/imageurls";

const SignupLanding = () => {
  const userType = useSelector((state) => state.user.userType);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleUserTypeChange = (type) => {
    dispatch(setUserType(type));
  };

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/Signup");
    }, 1000);
  };

  return (
    <div className="w-full mt-20 flex flex-col justify-center items-center">
      <h1 className="my-10 text-2xl font-medium text-black">
        Join as a Client or Freelancer
      </h1>

      <div id="userType" className="flex justify-between sm:w-4/5 gap-4">
        <div
          className={`flex shadow  gap-4 py-8 px-5 rounded-2xl border ${
            userType === "CLIENT"
              ? "border-[#00B386] text-[#00B386] border-2"
              : "border-black-500 text-black-500"
          }`}
          onClick={() => handleUserTypeChange("CLIENT")}
        >

          <div>
            <img src={imageUrls.client} alt="client" />
          </div>
          <div>

       
          <div className="my-1 flex justify-between items-center">
            <p className="font-bold text-3xl">Client</p>
            <input
              type="radio"
              value={userType}
              checked={userType === "CLIENT"}
              onChange={() => {}}
              className="w-5 h-5 text-primary-green"
            />
          </div>
          <p className="mt-5">I'm Client hiring for a project</p>
          </div>
        </div>

        <div
          className={`flex shadow gap-4 py-8 px-5 rounded-2xl border ${
            userType === "FREELANCER"
              ? "border-[#00B386] text-[#00B386] border-2"
              : "border-black-500 text-black-500"
          }`}
          onClick={() => handleUserTypeChange("FREELANCER")}
        >

          <div>
            <img src={imageUrls.freelancer} alt="freelancer" />
          </div>

          <div>

          
          <div className="my-1 flex justify-between items-center">
            <p className="font-bold text-3xl">Freelancer</p>
            <input
              type="radio"
              value={userType}
              checked={userType === "FREELANCER"}
              onChange={() => {}}
              className="w-5 h-5"
            />
          </div>
          <p className="mt-5">I'm Freelancer looking for a work</p>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center flex-col items-center">
        <PrimaryButton
          onClick={handleSubmit}
          children={
            userType === "FREELANCER"
              ? "Apply as a Freelancer"
              : userType === "CLIENT"
              ? "Join as a Client"
              : "Create Account"
          }
          loading={loading}
        />

        <p>
          Already have an Account ?{" "}
          <span>
            <Link
              to={"/login"}
              className="text-xl text-[#00B386] font-bold hover:underline"
            >
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupLanding;
