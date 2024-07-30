import { useState, useEffect } from "react";

const useAppWrite = (fn) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fn();
        setData(response);
      } catch (err) {
        Alert.alert("Error", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return {data, isLoading, refetch};
};


export default useAppWrite;