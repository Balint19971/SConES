// useFetchConferences.ts
import { useState, useEffect } from "react";
import { HttpError } from "../../utils/errors/errors";
import { ConferenceFormData } from "../../model/Conference";
import { fetchData } from "../functions/fetchUtil";

const useFetchConferences = () => {
  const [conferences, setConferences] = useState<ConferenceFormData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConferences = async () => {
      const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/conferences`;

      try {
        const responseData = await fetchData(url);

        const loadedConferences = responseData.map(
          (item: {
            conferenceId: any;
            name: any;
            startDate: any;
            endDate: any;
            location: any;
            sectionsIds: number[];
          }) => ({
            id: item.conferenceId,
            name: item.name,
            startDate: item.startDate,
            endDate: item.endDate,
            location: item.location,
            sectionsIds: item.sectionsIds,
          })
        );

        setConferences(loadedConferences);
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

    fetchConferences();
  }, []);

  return { conferences, isLoading, error };
};

export default useFetchConferences;
