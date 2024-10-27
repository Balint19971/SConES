// useUpdatePaperTitle.ts
import { useState } from "react";
import { HttpError } from "../../errors/errors";
import { fetchData } from "../fetchUtil";

const useUpdatePaperGrade = (paperId: string) => {
  const [updateGradeVisible, setUpgradeGradeStateVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateGrade = async (newGrade: string) => {
    const token = localStorage.getItem("authToken");
    setIsLoading(true);
    setError(null);

    const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/papers/${paperId}`;

    const dataToSend = {
      grade: newGrade,
      token: token,
    };

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
        throw new Error("Paper grade update failed");
      }
      setUpgradeGradeStateVisible(false);
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
    handleUpdateGrade,
    isLoading,
    error,
    updateGradeVisible,
    setUpgradeGradeStateVisible,
  };
};

export default useUpdatePaperGrade;
