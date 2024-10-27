// useCreateConference.ts
import { useState } from "react";
import { HttpError } from "../../utils/errors/errors";
import { ConferenceFormData } from "../../model/Conference";
import { fetchData } from "../functions/fetchUtil";

const useCreateConference = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdConferenceId, setCreatedConferenceId] = useState<number | null>(
    null
  );

  const createConference = async (conferenceData: ConferenceFormData) => {
    setIsLoading(true);
    setError(null);
    setCreatedConferenceId(null);

    const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/conferences`;
    const token = localStorage.getItem("authToken");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(conferenceData),
    };

    try {
      const response = await fetchData(url, requestOptions);

      if (response.ok) {
        setCreatedConferenceId(response.conferenceId);
      } else {
        throw new Error("Conference creation failed");
      }
    } catch (error) {
      if (error instanceof HttpError) {
        setError(`HTTP error ${error.status}: ${error.message}`);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createConference, isLoading, error, createdConferenceId };
};

export default useCreateConference;
