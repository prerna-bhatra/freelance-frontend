import React from "react";
import ClientForm from "../components/ClientForm";
import { createJob } from "../services/jobs.services";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";

const CreateClientPage = () => {
   const navigate = useNavigate();
  return (
    <div className="flex bg-red-400 justify-center">
       
      <ClientForm/>

    </div>
  );
};

export default CreateClientPage;
