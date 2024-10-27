// useFetchPaper.ts
import { useState, useEffect } from "react";
import { fetchData } from "../fetchUtil";
import Paper from "../../../model/Paper";
import { HttpError } from "../../errors/errors";

const useFetchMyPapers = (user: string) => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaper = async () => {
      const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/papers/by-user`;

      const token = localStorage.getItem("authToken");

      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const responseData = await fetchData(url,requestOptions);

        const loadedPapers: Paper[] = responseData.map(
          (paperData: any) =>
            new Paper(
              paperData.paperId,
              paperData.title,
              paperData.authorsName,
              paperData.supervisorsName,
              paperData.pdfUrl
            )
        );

        setPapers(loadedPapers);
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
  }, [user]);

  return { papers, isLoading, error };
};

export default useFetchMyPapers;
