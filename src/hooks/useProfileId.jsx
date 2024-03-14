import axios from 'axios';
import { useState, useEffect } from 'react';

const useProfileId = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(url);
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      fetchData();
    }

    // Cleanup function
    return () => {
      // Optionally, perform any cleanup here
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useProfileId;
