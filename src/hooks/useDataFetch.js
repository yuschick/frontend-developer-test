import { useCallback, useState } from "react";

const useDataFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [complete, setComplete] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = useCallback(async (request) => {
    setLoading(true);
    setError(false);

    try {
      const result = await request();

      result.data.length
        ? setData((data) => data.concat(result.data))
        : setComplete(true);
    } catch (err) {
      setError(!!err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, complete, rawData: data, fetchData };
};

export default useDataFetch;
