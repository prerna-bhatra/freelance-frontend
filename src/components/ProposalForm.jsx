import React, { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate, useParams } from "react-router-dom";
import { submitProposal } from "../services/jobs.services";
import { useAuthToken } from "../hooks/useAuth";
import imageUrls from "../constants/imageurls";
import CurrencyInput from "../common/CurrencyInput";
import toast  from 'react-hot-toast';

const ProposalForm = () => {
  const { jobId } = useParams();
  const token = useAuthToken();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    charges: "",
    description: "",
    coverLetter: null,
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "coverLetter") {
      setFormData((prevData) => ({
        ...prevData,
        coverLetter: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [currency, setCurrency] = useState("INR");

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form fields
    if (!formData.description || !formData.charges) {
      setLoading(false);
      setError("Description and charges are required.");
      return;
    }

    const data = new FormData();
    data.append("description", formData.description);
    data.append("jobId", jobId); // Assuming jobId is hardcoded for now
    data.append("deadline", "2024-12-31"); // Assuming deadline is hardcoded for now
    data.append("charges", formData.charges);
    data.append("coverLetter", formData.coverLetter);

    try {
      console.log("data : ", data);
      const res = await submitProposal(data, token);

      if (res.data && res.data.success) {
        setLoading(false);
        console.log("Proposal Created: ", res.data);
        setError(null);
        setFormData({
          charges: "",
          description: "",
          coverLetter: null,
        });

        toast.success('Proposal Submitted Successfully!')
      } else {
        setLoading(false);
        setError(res.message || "Failed to create proposal.");
        toast('Error in submitting proposal')
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while creating proposal.");
      console.error("Error creating proposal:", error);
      toast.error('Error in submitting proposal')
    }
  };

  return (
   
  
    <form className="w-full  rounded-xl py-4 px-3">
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-primary-black  font-medium  mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Brief about your skillset and experience"
          rows="4"
          required
        ></textarea>
      </div>

      {/* <hr /> */}

      <div className="flex flex-col sm:flex-row justify-between my-3 py-3">
        <div className="w-full sm:w-1/2 ">
          <div className="mt-5">
            <label
              htmlFor="charges"
              className="block text-primary-black  font-medium"
            >
              Total Quote for the project
            </label>
            <p className="text-sm text-[#9a9898]">
              This includes all milestones, and is the amount your client will
              see
            </p>
            
            <CurrencyInput
              placeholder="Enter amount"
              selectedCurrency={currency}
              currencies={["USD", "EUR", "GBP", "INR"]}
              onCurrencyChange={handleCurrencyChange}
              id="charges"
              name="charges"
              value={formData.charges}
              onChange={handleChange}
            />
          </div>

          <div className="my-4">
            <label
              htmlFor="coverLetter"
              className="block text-primary-black  font-medium"
            >
              Upload Cover Letter
            </label>
            <input
              type="file"
              id="coverLetter"
              name="coverLetter"
              className="mt-1 block w-full border border-dotted border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2"
              onChange={handleChange}
              required
            />
            <div className="mt-10">
              <PrimaryButton
                onClick={handleSubmit}
                children="Confirm & Submit"
                loading={isLoading}
                widthFull={true}
              />
            </div>
          </div>
        </div>

        <div className="p-4 text-center">
          <img src={imageUrls.safeMoney} width={"90%"} alt={"safe money"} />
        </div>
      </div>

      {error && <p className="mb-4 text-red-600">{error}</p>}
    </form>
    
  );
};

export default ProposalForm;
