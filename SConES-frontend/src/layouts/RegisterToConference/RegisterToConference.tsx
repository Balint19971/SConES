import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";

import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Box,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useFetchSections from "../../utils/functions/candidate-register-to-conference/useFetchSections";
import useFetchSectionConferenceId from "../../utils/functions/candidate-register-to-conference/useFetchSectionConferenceId";
import { registerCandidateToConference } from "../../utils/functions/candidate-register-to-conference/registerCandidateToConference";
import { HttpError, ValidationError } from "../../utils/errors/errors";
import { SConESColors } from "../../config/Theme";
import useFetchPapers from "../../utils/functions/list-papers/useFetchPapers";

const RegisterToConference: React.FC = () => {
  const { papers, error: papersError } = useFetchPapers();
  const location = useLocation();
  const conferenceId = location.state?.conferenceId;
  const [selectedPaperId, setSelectedPaperId] = useState<number | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    null
  );
  const {
    sections,
    isLoading: sectionsLoading,
    error: sectionsError,
  } = useFetchSections(conferenceId);
  const {
    sectionConferenceId,
    isLoading: sectionConferenceIdLoading,
    error: sectionConferenceIdError,
  } = useFetchSectionConferenceId(conferenceId, selectedSectionId);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Selected sectionId: ", selectedSectionId);

    if (selectedPaperId === null || selectedSectionId === null) {
      toast.error(`Please select a paper and section`);
      return;
    }

    try {
      await registerCandidateToConference(
        selectedPaperId,
        sectionConferenceId,
        selectedSectionId,
        conferenceId
      );
      console.log("Registration successful");
    } catch (error) {
      if (error instanceof HttpError) {
        // Handle HTTP errors
        toast.error(`HTTP error ${error.status}: ${error.message}`);
      } else if (error instanceof ValidationError) {
        // Handle validation errors
        toast.error(`Validation error: ${error.message}`);
      } else {
        // Handle other types of errors
        console.error("Error registering to conference:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 18 }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 3, fontWeight: "bold", color: SConESColors.lightBlue }}
      >
        Register to Conference
      </Typography>
      <Typography
        variant="body1"
        sx={{ mb: 3, color: "text.secondary", fontStyle: "italic" }}
      >
        Your paper must be approved by a supervisor before applying to a
        conference.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: "800px" }}>
          <FormControl fullWidth>
            <InputLabel>Paper</InputLabel>
            <Select
              value={selectedPaperId || ""}
              onChange={(e) => setSelectedPaperId(e.target.value as number)}
            >
              {papers.map((paper) => (
                <MenuItem key={paper.paperId} value={paper.paperId}>
                  {paper.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Autocomplete
            options={sections}
            getOptionLabel={(option) =>
              `Section ID: ${option.sectionId} - ${option.name}`
            }
            value={
              sections.find((s) => s.sectionId === selectedSectionId) || null
            }
            onChange={(_, value) =>
              setSelectedSectionId(value ? value.sectionId : null)
            }
            renderInput={(params) => <TextField {...params} label="Section" />}
          />

          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default RegisterToConference;
