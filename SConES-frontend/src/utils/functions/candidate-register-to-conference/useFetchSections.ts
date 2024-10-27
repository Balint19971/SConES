// useFetchSections.ts

import { useEffect, useState } from "react";
import { fetchData } from "../fetchUtil";
import Section from "../../../model/Section";

const useFetchSections = (conferenceId: number) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      const url = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/sections/by-conferences/${conferenceId}`;
      const token = localStorage.getItem('authToken');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const responseData = await fetchData(url, requestOptions);
        const loadedSections: Section[] = responseData.map(
          (sectionData: any) =>
            new Section(
              sectionData.sectionId,
              sectionData.name,
              sectionData.university
            )
        );
        setSections(loadedSections);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, [conferenceId]);

  return { sections, isLoading, error };
};

export default useFetchSections;
