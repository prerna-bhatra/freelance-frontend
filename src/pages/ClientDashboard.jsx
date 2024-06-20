import React from 'react'
import JobForm from '../components/JobForm'
import PrimaryButton from '../common/PrimaryButton'
import { useNavigate } from 'react-router-dom'
import SecondaryButton from '../common/SecondaryButton'
import imageUrls from '../constants/imageurls'

const ClientDashboard = () => {
  const navigate = useNavigate();
 
  const handleClick = () => {
    navigate("/jobs");
  }
  const handleNewJob = () => {
    navigate("/create-jobs")
  }
  return (
    <div className=" p-4 flex flex-col items-center justify-center h-screen">

      <div className="flex justify-center w-1/2"> 
      <img src={imageUrls.clientDashboard} alt="client-dashboard" />

      </div>

      <div className='flex bg-white gap-4 justify-center items-center'>
     <PrimaryButton children="See All Jobs" onClick={handleClick}/>

     <SecondaryButton children={`Create New Job`} onClick={handleNewJob}/>

      </div>
    
    </div>
  )
}

export default ClientDashboard