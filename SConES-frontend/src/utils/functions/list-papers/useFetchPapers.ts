// useFetchPapers.ts
import { useState, useEffect } from 'react';
import { fetchData } from '../fetchUtil';
import Paper from '../../../model/Paper';
import { HttpError } from '../../errors/errors';

const useFetchPapers = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPapers = async () => {
      const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/papers`;

      try {
        const responseData = await fetchData(url);

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
          setError('An unexpected error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPapers();
  }, []);

  return { papers, isLoading, error };
};

export default useFetchPapers;
