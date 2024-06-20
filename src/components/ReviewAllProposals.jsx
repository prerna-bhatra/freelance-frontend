import React, { useEffect, useState } from "react";
import { useAuthToken, useClient } from "../hooks/useAuth";
import { reviewProposals } from "../services/jobs.services";
import { useParams } from "react-router-dom";
import ProposalCard from "../common/cards/ProposalCard";
import toast  from 'react-hot-toast';
const ReviewAllProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [totalProposals, setTotalProposals] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useAuthToken();
  const clientId = useClient();
  const { jobId } = useParams();

  const fetchJobs = async () => {
    setLoading(true);
    console.log("see Review proposals");
    try {
      const res = await reviewProposals({ jobId, token });

      if (res.data && res.data.success) {
        setLoading(false);
        setProposals(res.data.proposals);
        setTotalProposals(res.data.TotalProposals);
        console.log("ReviewProposals : ", res.data);
        setError(null);
      } else {
        setLoading(false);
        setError(res.message || "Failed to create job.");
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while creating job.");
      console.error("Error creating job:", error);
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-y-4">
      <h1 className="my-5">TotolProposals : {totalProposals} </h1>

      {proposals &&
        proposals.length > 0 &&
        proposals.map((proposal) => (
          <ProposalCard
            proposal={proposal}
            key={proposal.id}
            fetchProposals={fetchJobs}
          />
        ))}
    </div>
  );
};

export default ReviewAllProposals;
