import React from "react";
import ProposalQuestions from "./ProposalQuestions";
import JobDetails from "./JobDetails";
import ProposalForm from "./ProposalForm";

const CreateProposal = () => {;

  return (
    <div className="mx-auto flex flex-col justify-center w-4/5 p-6 mt-20">
      <h1 className="text-3xl font-medium mb-4 text-primary-black"> <span className="text-primary-green"> Submit
        </span> a Proposal</h1>

      <ProposalQuestions />
      <JobDetails />
      <ProposalForm />
    </div>
  );
};

export default CreateProposal;
