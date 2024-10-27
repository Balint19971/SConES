// useUpdatePaperTitle.ts
import { useState } from "react";
import { HttpError } from "../../errors/errors";
import { fetchData } from "../fetchUtil";

const useUpdatePaperTitle = (paperId: string) => {
  const [updateTitleVisible, setUpdateTitleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateTitle = async (newTitle: string) => {
    setIsLoading(true);
    setError(null);

    const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/papers/${paperId}`;

    const dataToSend = {
      title: newTitle,
    };

    const token = localStorage.getItem("authToken");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    };

    try {
      const response = await fetchData(url, requestOptions);

      if (!response.ok) {
        throw new Error("Paper title update failed");
      }
      setUpdateTitleVisible(false);
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

  return {
    handleUpdateTitle,
    isLoading,
    error,
    updateTitleVisible,
    setUpdateTitleVisible,
  };
};

export default useUpdatePaperTitle;
