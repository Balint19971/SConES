// useDeletePaper.ts
import { useState } from 'react';
import { fetchData } from '../fetchUtil';
import { HttpError } from '../../errors/errors';

const useDeletePaper = () => {
  const [deletedPaperId, setDeletedPaperId] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleDeletePaper = async (paperId: number) => {
    const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/papers/${paperId}`;
    const token = localStorage.getItem('authToken');

    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetchData(url, requestOptions);

      if (response.ok) {
        setDeletedPaperId(paperId);
      } else {
        throw new Error('Delete paper fetch went wrong');
      }
    } catch (error) {
      if (error instanceof HttpError) {
        setError(`HTTP error ${error.status}: ${error.message}`);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return { handleDeletePaper, deletedPaperId, error };
};

export default useDeletePaper;
