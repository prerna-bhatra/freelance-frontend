import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PrimaryButton from "../PrimaryButton";
import { updateProposals } from "../../services/jobs.services";
import { useState } from "react";
import { useAuthToken } from "../../hooks/useAuth";
import toast  from 'react-hot-toast';
const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          border: "1px solid #00B386", // Change color to green
        },
      },
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalContent({ open, handleClose, proposal , fetchProposals }) {
  const [status, setStatus] = React.useState("PENDING");
  const [loading, setLoading] = React.useState(false);
  const [ proposalId , setProposalId] = React.useState(proposal.id);
  const [ error , setError ] = useState(null);
  const token = useAuthToken()

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  console.log("proposalsinModal : ", proposal.id);

  const handleSave =async () => {
    // Here you can perform any action you want with the selected status
    console.log("Selected Status:", status);
    await handleSubmit();
    handleClose();
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const updatedData = {
        status 
      }
        const res = await updateProposals( proposalId , updatedData , token )

      if (res.data && res.data.success) {
        
        console.log("Proposal Created: ", res.data);
       await  fetchProposals()
        toast.success('Status Updated SuccessFully !')
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError(res.message || "Failed to updated proposal.");
       
      }
    } catch (error) {
      setLoading(false);
      setError("An error occurred while creating proposal.");
      console.error("Error creating proposal:", error);
      toast.error('An error occurred while creating proposal')
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Status
          </Typography>

          <FormControl
            sx={{ m: 1, minWidth: 300, marginTop: 2, marginBottom: 2 }}
            size="small"
            className="text-sm"
          >
            <InputLabel id="demo-select-small-label">status</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={status}
              label="status"
              onChange={handleChange}
            >
              <MenuItem value="PENDING" className="text-sm lowercase">
                PENDING
              </MenuItem>
              <MenuItem value="ACCEPTED" className="text-sm lowercase">
                ACCEPTED
              </MenuItem>
              <MenuItem value="REJECTED" className="text-sm lowercase">
                REJECTED
              </MenuItem>
              { proposal.status == "ACCEPTED" && <MenuItem value="COMPLETED" className="text-sm lowercase">
                COMPLETED
              </MenuItem>}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <PrimaryButton children={`save`} onClick={handleSave} loading={loading} />
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
