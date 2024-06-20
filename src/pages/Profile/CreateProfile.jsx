import React, { useState } from "react";
import { useSelector } from "react-redux";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FeatureItem from "../../components/FeatureItem";
import PrimaryButton from "../../common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../common/Loading";
import imageUrls from "../../constants/imageurls";

const featureItem = [
  {
    icon: <Person2OutlinedIcon />,
    text: "Answer a few questions and start building your profile",
  },
  {
    icon: <ContactMailOutlinedIcon />,
    text: "Answer a few questions and start building your profile",
  },
  {
    icon: <MonetizationOnOutlinedIcon />,
    text: "Get paid safely and know we're there to help",
  },
];

const CreateProfile = () => {
  const user = useSelector((state) => state.user.user);
  const userType = useSelector( state => state.user.userType);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {

      if( userType === "FREELANCER"){
        navigate("/create-profile/experience");
      }else if( userType === "CLIENT"){
        navigate("/create-profile/client-details");
      }
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="pt-20 px-20 flex flex-col sm:flex-row  sm:justify-evenly">
      <div className=" w-full sm:w-3/5  ">
        <h1 className="p-5 text-3xl font-medium  text-primary-black ">
          Hey <span className="text-primary-green">{user.username}.</span>{" "}
          Ready for your Next Big Opportunity ?
        </h1>

        <p className="p-5 text-base text-primary-green font-medium">Just follow few simple steps :</p>

        <div className="">
          {featureItem.map((item, index) => (
            <FeatureItem key={index} icon={item.icon} text={item.text} />
          ))}
        </div>

        <div className="pt-5 px-8  flex justify-between items-center ">
          <PrimaryButton onClick={handleSubmit} children="Get  Started" loading={loading} />

          <p className="text-[#9c9c9c] w-1/2 text-center p-3 flex flex-end">{`It only takes 5-10 min. we will save as you go `}</p>
        </div>
      </div>

      <div className=" sm:w-1/3 flex items-center">
        <div className=" rounded-lg  bg-[#efefef]">
          <img
            // src="https://zerodha.com/static/images/ecosystem.png"
            src={imageUrls.profileScreen}
            alt=""
            className="h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
