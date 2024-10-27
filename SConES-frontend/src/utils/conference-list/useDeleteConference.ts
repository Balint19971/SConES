// useDeleteConference.ts
import { useState } from "react";
import { HttpError } from "../../utils/errors/errors";
import { fetchData } from "../functions/fetchUtil";

const useDeleteConference = () => {
  const [deletedConferenceId, setDeletedConferenceId] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteConference = async (conferenceId: number) => {
    const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/conferences/${conferenceId}`;
    const token = localStorage.getItem("authToken");

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetchData(url, requestOptions);

      if (response.ok) {
        // setDeletedConferenceId(conferenceId);
        window.location.reload();
      } else {
        throw new Error("Delete conference fetch went wrong");
      }
    } catch (error) {
      if (error instanceof HttpError) {
        setError(`HTTP error ${error.status}: ${error.message}`);
      }
    }
    window.location.reload();
  };

  return { handleDeleteConference, deletedConferenceId, error };
};

export default useDeleteConference;
