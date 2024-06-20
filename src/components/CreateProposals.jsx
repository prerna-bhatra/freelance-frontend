import React from "react";
import ProposalForm from "./ProposalForm";

const CreateProposalPage = () => {
  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("/api/create-proposal", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Handle success, maybe redirect or show a success message
      } else {
        // Handle error
        console.error("Failed to create proposal");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h1>Create Proposal</h1>
      <ProposalForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateProposalPage;
