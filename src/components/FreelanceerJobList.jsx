import React, { useState, useEffect } from "react";
import { getAllJobs } from "../services/jobs.services";
import { useAuthToken } from "../hooks/useAuth";
import LoadingSpinner from "../common/Loading";
import JobCard from "../common/cards/JobCard";
import Pagination from "../common/Pagination/Pagination";
import SelectInput from "../common/SelectInput";

const options = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Expert", label: "Expert" },
];

const FreelancerJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10); // You can set a default page size or make it configurable
  const token = useAuthToken();
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await getAllJobs({
          token,
          page,
          limit: pageSize,
          experience,
        });

        if (res.data && res.data.success) {
          setLoading(false);
          setJobs(res.data.jobs);
          setTotalPages(res.data.totalPages);
          setError(null);
        } else {
          setLoading(false);
          setError(res.message || "Failed to fetch jobs.");
        }
      } catch (error) {
        setLoading(false);
        // setError("An error occurred while fetching jobs.");
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [token, page, pageSize, experience]);

  const handleChange = (event) => {
    setExperience(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // if (!loading && jobs.length === 0) {
  //   return (
  //     <div className="flex bg-primary-white justify-center items-center h-screen">
  //       <p className="text-3xl">No jobs Found!</p>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold">
            <span className="text-3xl font-bond text-[#00B386]">
              Freelancer :{" "}
            </span>{" "}
            Jobs you might like
          </h1>
          <p className="text-sm mt-3 mb-2 text-[#898989]">
            Browse jobs that match your experience to a client's hiring
            preferences. Ordered by most relevant.
          </p>
        </div>
        <div className="">
          <p className="text-sm text-[#00B386]">Filter by experience</p>
          <SelectInput
            value={experience}
            onChange={handleChange}
            options={options}
            label="experience"
            sx={{ m: 1, minWidth: 120 }}
          />
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && <p>Error: {error}</p>}

      {!loading &&
        (jobs.length === 0 ? (
          <div className="flex bg-primary-white justify-center items-center h-screen">
            <p className="text-3xl">No jobs Found!</p>
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 px-7">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="flex justify-center">
        <Pagination
          page={page}
          count={totalPages}
          onChange={handlePageChange}
        />
      </div>
      </>
        ))}

      
    </div>
  );
};

export default FreelancerJobList;
