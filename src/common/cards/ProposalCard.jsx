import { useState } from "react";
import SecondaryButton from "../SecondaryButton";
import ModalContent from "../Modal/ModalContent";
import PrimaryButton from "../PrimaryButton";

export default function ProposalCard({ proposal, key , fetchProposals }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDownload = (coverLetter) => {
    // Open the coverLetter URL in a new tab to download the file
    window.open(coverLetter, "_blank");
  };
  return (
    <div key={key} className="border bg-white shadow-lg rounded-lg p-4 ">
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium">{proposal.Freelancer.User.username}</h2>

        <p className="text-sm text-[#00B386]">STATUS : {proposal.status}</p>
      </div>
      <p className="mb-4 mt-3 text-sm text-[#717171] font-medium overflow-hidden line-clamp-4">
        {proposal.description}
      </p>

      <ul>
          {proposal.Freelancer.skills.map((skill, index) => (
            <li
              key={index}
              className="m-1 px-2 py-1  font-normal inline-block  text-primary-green bg-[#81dcc550] rounded-lg"
            >
              {skill}
            </li>
          ))}
        </ul>

      <div className=" flex items-center flex-col sm:flex-row sm:justify-between py-4">
        <p className="text-sm font-medium text-primary-black ">Quoted Deadline : 
        <span className="text-primary-green"> {proposal.deadline}
          </span></p>

        <h1 onClick={() => handleDownload(proposal.coverLetter)} className="text-sm font-medium text-primary-black hover:underline">Download Cover Letter</h1>
      
      </div>
        

     


      <div className=" flex items-center flex-col sm:flex-row sm:justify-between">

      <p className="text-sm font-medium text-primary-black ">Quoted Amount : <span className="text-primary-green">
      ₹ {proposal.charges}/hr 
        </span> </p>

        <div>
          <PrimaryButton children={`UPDATE STATUS`} onClick={handleOpen} />
          <ModalContent
            open={open}
            handleClose={handleClose}
            proposal={proposal}
            fetchProposals={fetchProposals}
          />
        </div>
       
      </div>
    </div>
  );
}
