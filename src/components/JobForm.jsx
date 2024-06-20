import React, { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import { createJob } from "../services/jobs.services";
import { useAuthToken, useClient } from "../hooks/useAuth";
import toast from "react-hot-toast";
import imageUrls from "../constants/imageurls";
import CurrencyInput from "../common/CurrencyInput";
const ClientForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    skills: [],
    projectScope: "",
    timeRequired: "",
    experience: "",
    contractType: "",
    budget: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useAuthToken();
  const clientId = useClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "skills") {
      // Split the value by comma and trim each skill
      const skillsArray = value.split(",").map((skill) => skill.trim());
      setFormData((prevData) => ({
        ...prevData,
        [name]: skillsArray,
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
    if (
      !formData.title ||
      !formData.projectScope ||
      !formData.skills ||
      !formData.timeRequired ||
      !formData.experience ||
      !formData.contractType ||
      !formData.budget ||
      !formData.description
    ) {
      setLoading(false);
      setError("All fields are required.");
      return;
    }

    try {
      const res = await createJob(formData, token);

      if (res.data && res.data.success) {
        setLoading(false);
        console.log("CreateJOB : ", res.data);
        toast.success("Job Created SuccessFully !");

        setFormData({
          title: "",
          skills: [],
          projectScope: "",
          timeRequired: "",
          experience: "",
          contractType: "",
          budget: "",
          description: "",
        });
        setError(null);
      } else {
        setLoading(false);
        setError(res.message || "Failed to create job.");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while creating job.");
      console.error("Error creating job:", error);
      toast.error("An error occurred while creating job");
    }
  };

  return (
    <div className="mt-2 p-5 flex flex-col-reverse sm:flex-row gap-12 justify-between  sm:py-24 sm:px-32">
      <div className="sm:w-3/5">
        <h1 className="text-3xl font-medium">Create Job Posting</h1>
        <p className="text-sm font-normal mb-4">
          Enter the Details of Job Posting
        </p>

        <form className=" w-full mt-12">
          <div className="mb-4 ">
            <label
              htmlFor="title"
              className="block text-primary-grey text-base font-medium mb-2"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className=" border border-primary-grey2 placeholder:text-primary-black  placeholder:text-xl rounded-lg sm:w-full py-2 px-4"
              placeholder="Job Title"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="skills"
              className="block text-primary-grey text-base font-medium mb-2"
            >
              Skills
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills.join(", ")} // Join skills array with comma and space
              onChange={handleChange}
              className="border border-primary-grey2 placeholder:text-primary-black  placeholder:text-xl rounded-lg sm:w-full py-2 px-4"
              placeholder="Enter , seperated Skills ( Ex : React , JS ) "
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="projectScope"
              className="block text-primary-grey font-medium  mb-2"
            >
              Project Scope
            </label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="projectScopeLarge"
                  name="projectScope"
                  value="large"
                  checked={formData.projectScope === "large"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Large</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  id="projectScopeMedium"
                  name="projectScope"
                  value="medium"
                  checked={formData.projectScope === "medium"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Medium</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  id="projectScopeSmall"
                  name="projectScope"
                  value="small"
                  checked={formData.projectScope === "small"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Small</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="timeRequired"
              className="block text-primary-grey text-base font-medium mb-2"
            >
              Time Required
            </label>
            <input
              type="text"
              id="timeRequired"
              name="timeRequired"
              value={formData.timeRequired}
              onChange={handleChange}
              className="border border-primary-grey2 placeholder:text-primary-black  placeholder:text-xl rounded-lg sm:w-full py-2 px-4"
              placeholder="Time Required"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="experience"
              className="block text-primary-grey text-base font-medium mb-2"
            >
              Experience Required
            </label>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="experienceExpert"
                  name="experience"
                  value="Expert"
                  checked={formData.experience === "Expert"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Expert</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  id="experienceIntermediate"
                  name="experience"
                  value="Intermediate"
                  checked={formData.experience === "Intermediate"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Intermediate</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  id="experienceBeginner"
                  name="experience"
                  value="Beginner"
                  checked={formData.experience === "Beginner"}
                  onChange={handleChange}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2">Beginner</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="contractType"
              className="block text-primary-grey text-base font-medium mb-2"
            >
              Contract Type
            </label>
            <input
              type="text"
              id="contractType"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              className="border border-primary-grey2 placeholder:text-primary-black  placeholder:text-xl rounded-lg sm:w-full py-2 px-4"
              placeholder="Contract Type"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="budget"
              className="block text-primary-grey font-bold mb-2"
            >
              Budget
            </label>
            

            <CurrencyInput
              placeholder="Enter amount"
              selectedCurrency={currency}
              currencies={["USD", "EUR", "GBP", "INR"]}
              onCurrencyChange={handleCurrencyChange}
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-primary-grey text-base font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-primary-grey2 placeholder:text-primary-black  placeholder:text-xl rounded-lg sm:w-full py-2 px-4"
              placeholder="Description"
              rows="4"
            ></textarea>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          <PrimaryButton
            onClick={handleSubmit}
            children="Create Job"
            loading={isLoading}
            widthFull={true}
          />
        </form>
      </div>

      <div className="flex items-start justify-end">
        <img src={imageUrls.createJob} style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default ClientForm;
