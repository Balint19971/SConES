// useFetchPaper.ts
import { useState, useEffect } from "react";
import { fetchData } from "../fetchUtil";
import Paper from "../../../model/Paper";
import { HttpError } from "../../errors/errors";

const useFetchPaper = (id: string) => {
  const [paper, setPaper] = useState<Paper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaper = async () => {
      const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/papers/${id}`;

      try {
        const responseData = await fetchData(url);

        const loadedPaper: Paper = new Paper(
          responseData.paperId,
          responseData.title,
          responseData.authorsName,
          responseData.supervisorsName,
          responseData.pdfUrl
        );

        setPaper(loadedPaper);
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

    fetchPaper();
  }, [id]);

  return { paper, isLoading, error };
};

export default useFetchPaper;
