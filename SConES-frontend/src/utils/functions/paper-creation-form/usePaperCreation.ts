// usePaperCreation.ts
import { useState } from "react";
import { fetchData } from "../fetchUtil";
import { HttpError, ValidationError } from "../../errors/errors";
import { toast } from "react-toastify";

interface PaperCreationData {
  title: string;
  emails: string[];
  objectPath: string;
}

const usePaperCreation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [objectPath, setObjectPath] = useState<string>("");

  const createPaper = async (
    paperData: PaperCreationData,
    selectedFile: File | null
  ) => {
    setIsLoading(true);
    setError(null);

    if (!selectedFile) {
      setError("No file selected");
      setIsLoading(false);
      return;
    }

    const uploadPdfUrl = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/files/upload`;
    const token = localStorage.getItem("authToken");

    const formData = new FormData();
    formData.append("file", selectedFile);

    const uploadOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const uploadResponse = await fetchData(uploadPdfUrl, uploadOptions);
      console.log("UploadResponse", uploadResponse);
      setObjectPath(uploadResponse.objectPath);

      const createPaperUrl = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/papers`;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...paperData,
          objectPath: uploadResponse.objectPath,
        }),
      };

      const response = await fetchData(createPaperUrl, requestOptions);

      if (response.ok) {
        toast.success("Paper created successfully");
      } else {
        throw new Error("Paper creation failed");
      }
    } catch (error) {
      if (error instanceof HttpError) {
        setError(`HTTP error ${error.status}: ${error.message}`);
      } else if (error instanceof ValidationError) {
        setError(`Validation error: ${error.message}`);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createPaper, isLoading, error, objectPath };
};

export default usePaperCreation;
