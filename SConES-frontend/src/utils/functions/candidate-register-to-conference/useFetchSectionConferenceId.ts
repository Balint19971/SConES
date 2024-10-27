// useFetchSectionConferenceId.ts
import { useState, useEffect } from 'react';
import { fetchData } from '../fetchUtil';

const useFetchSectionConferenceId = (conferenceId: number, selectedSectionId: number | null) => {
  const [sectionConferenceId, setSectionConferenceId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSectionConferenceId = async () => {
      if (selectedSectionId) {
        const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/sections-conference/id`;
        const token = localStorage.getItem('authToken');
        const requestBody = {
          sectionId: selectedSectionId,
          conferenceId: conferenceId,
        };
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        };

        try {
          const responseData = await fetchData(url, requestOptions);
          setSectionConferenceId(responseData);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSectionConferenceId();
  }, [conferenceId, selectedSectionId]);

  return { sectionConferenceId, isLoading, error };
};

export default useFetchSectionConferenceId;
