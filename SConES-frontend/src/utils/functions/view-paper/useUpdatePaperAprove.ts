// useUpdatePaperTitle.ts
import { useState } from "react";
import { HttpError } from "../../errors/errors";
import { fetchData } from "../fetchUtil";
import { toast } from "react-toastify";

const useUpdatePaperApprove = (paperId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApprovePaper = async () => {
    setIsLoading(true);
    setError(null);

    const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/papers/approve/${paperId}`;

    const token = localStorage.getItem("authToken");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetchData(url, requestOptions);

      if (response.ok) {
        toast.success("Paper created successfully");
      } else {
        throw new Error("Paper creation failed");
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

  return {
    handleApprovePaper,
    isLoading,
    error,
  };
};

export default useUpdatePaperApprove;
