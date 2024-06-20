import React, { useState } from "react";
import PrimaryButton from "../../common/PrimaryButton";
import { clientProfile } from "../../services/profile.services";
import { useAuthToken } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserProfile } from "../../redux/slices/profileSlice";

const CreateClientProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = useAuthToken();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    companyName: "",
    companySize: "",
    websiteURL: "",
  });

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (
      !formData.companyName ||
      !formData.companySize ||
      !formData.websiteURL
    ) {
      setLoading(false);
      setError("All fields are required.");
      return;
    }

    const isValidUrl = isValidURL(formData.websiteURL);
    if (!isValidUrl) {
      setLoading(false);
      setError("Please enter a valid website URL.");
      return;
    }

    try {
      const res = await clientProfile(formData, token);
      setLoading(false);

      if (res.data && res.data.success) {
        dispatch(setUserProfile(res.data.client));
        navigate("/");
      } else {
        setError(res.message);
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while creating the client profile.");
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const companySizeOptions = [
    { value: "", label: "Select an option" },
    { value: "1-10", label: "1-10" },
    { value: "11-50", label: "11-50" },
    { value: "51-200", label: "51-200" },
    { value: "201-500", label: "201-500" },
    { value: "501-1000", label: "501-1000" },
    { value: "1001+", label: "1001+" },
  ];

  return (
    <div className="my-10 mx-24 p-4">
      <h1 className="text-3xl font-medium my-1">Create Client Profile</h1>
      <p className="text-sm font-normal mb-4">
        Enter the details of the Company
      </p>
      <div className="w-full  py-4 px-9">
        <div className="flex  justify-around  my-4">
          <label htmlFor="companyName" className="w-1/4  block mb-2">
            Let's start with a strong title. What is the name of your company?
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Enter the company name"
            value={formData.companyName}
            onChange={handleChange}
            className="border w-1/2 h-[50px] text-primary-black font-medium border-gray-300 rounded px-3 py-4"
            required
          />
        </div>
        <div className="flex justify-around my-4">
          <label htmlFor="companySize" className="w-1/4 mb-2">
            Select the Company Size:
          </label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="border border-gray-300 text-primary-black font-medium w-1/2 rounded-md px-3 py-4 outline-none focus:border-blue-500"
          >
            {companySizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-around my-4">
          <label htmlFor="websiteURL" className="block sm:w-1/4 mb-2">
            Kindly furnish the digital coordinates of your company by entering
            its website URL
          </label>
          <input
            type="text"
            id="websiteURL"
            name="websiteURL"
            placeholder="Enter the website URL of company"
            value={formData.websiteURL}
            onChange={handleChange}
            className="border border-gray-300 text-primary-black font-medium sm:w-1/2 rounded px-3 py-4 "
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-around">
          <div  className="w-1/4 mb-2"></div>

          <div className="w-1/2">
            <PrimaryButton
              onClick={handleSubmit}
              children="Next, Create the Profile"
              loading={loading}
              widthFull={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClientProfile;
