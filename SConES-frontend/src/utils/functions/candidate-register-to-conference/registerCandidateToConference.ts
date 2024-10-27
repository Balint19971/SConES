// registerCandidateToConference.ts

import { toast } from "react-toastify";
import { HttpError, ValidationError } from "../../errors/errors";

export const registerCandidateToConference = async (
  selectedPaperId: number | null,
  sectionConferenceId: number | null,
  selectedSectionId: number | null,
  conferenceId: number | undefined
) => {
  console.log("registerCandidateToConference called");
  console.log(
    "SelectedData: ",
    selectedPaperId +
      " " +
      sectionConferenceId +
      " " +
      selectedSectionId +
      " " +
      conferenceId
  );
  const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/sections-conference/register-to-conference`;
  const method = "PUT";
  const token = localStorage.getItem("authToken");

  try {
    const requestBody = {
      paperId: selectedPaperId,
      sectionConferenceInDTO: {
        sectionConferenceId: 3,
        sectionId: selectedSectionId,
        conferenceId: conferenceId,
      },
    };

    const requestOptions = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(url, requestOptions);
    const responseData = await response.text();
    console.log("ResponseData text", responseData);

    if (response.ok) {
      toast.success("Registration successful!");
    } else {
      toast.error(responseData);
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    if (error instanceof HttpError) {
      toast.error(`HTTP error ${error.status}: ${error.message}`);
    } else if (error instanceof ValidationError) {
      toast.error(`Validation error: ${error.message}`);
    } else {
      console.error("Error registering to conference:", error);
      toast.error("An unexpected error occurred");
    }
  }
};
