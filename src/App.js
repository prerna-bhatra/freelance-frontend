import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SignupLanding from "./pages/SignupLanding";
import { useSelector } from "react-redux";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import CreateProfile from "./pages/Profile/CreateProfile";
import FreelancerExperience from "./pages/Profile/FreelancerExperience";
import ProfileHome from "./pages/Profile/ProfileHome";
import Skills from "./pages/Profile/Skills";
import CreateClientProfile from "./pages/Profile/CreateClientProfile";
import JobListByClient from "./components/JobListByClient";
import CreateProposal from "./components/CreateProposal";
import ReviewAllProposals from "./components/ReviewAllProposals";
import JobForm from './components/JobForm';

const AppRouter = () => {
  const userType = useSelector((state) => state.user.userType);
  console.log(' -----------userType ------------- : ', userType )
  return (
    <div className="font-rubik">
      <Routes>
        {/* Public routes */}
        <Route path="/signup/select-user" element={<SignupLanding />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoutes />}>
          {userType === "CLIENT" ? (
            <>
              <Route index element={<ClientDashboard />} />
              <Route path="/create-jobs" element={<JobForm />} />
              <Route path="/jobs" element={<JobListByClient />} />
              <Route path="/jobs/:jobId/review-proposals" element={<ReviewAllProposals />} />
            </>
          ) : (
            <>
            <Route index element={<FreelancerDashboard />} />
            <Route path="/jobs/:jobId/create-proposal" element={<CreateProposal />} />
            </>
          )}

          {/* Profile creation routes */}
          <Route path="/create-profile" element={<ProfileHome />}>
            <Route index element={<CreateProfile />} />
            <Route path="welcome" element={<CreateProfile />} />
            <Route path="experience" element={<FreelancerExperience />} />
            <Route path="client-details" element={<CreateClientProfile />} />
          </Route>

          {/* Other protected routes */}
          <Route path="/about" element={<About />} />

          {/* Catch-all route for unmatched paths */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRouter;
