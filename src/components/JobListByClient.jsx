import React, { useState, useEffect } from "react";
import axios from "axios";
import { getJobsByClient } from "../services/jobs.services";
import { useAuthToken, useClient } from "../hooks/useAuth";
import LoadingSpinner from "../common/Loading";
import PrimaryButton from "../common/PrimaryButton";
import JobCard from "../common/cards/JobCard";

const JobListByClient = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useAuthToken();
  const clientId = useClient();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      console.log('see all jobs')
      try {
        const res = await getJobsByClient({clientId, token});
  
        if (res.data && res.data.success) {
          setLoading(false);
          setJobs(res.data.jobs);
          console.log("getJobs : ", res.data);
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
    fetchJobs();
  }, [clientId]);

  if(!loading &&  jobs.length == 0 ) {
    return (
      <div className="flex  bg-slate-200 justify-center items-center h-screen">
        <p className="text-3xl">OOps , You have not posted any Jobs yet</p>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-3 py-10 px-7 mx-20 ">
      {loading && <LoadingSpinner/>}
      {error && <p>Error: {error}</p>}
        { jobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div></div>
    </div>
  );
};

export default JobListByClient;
