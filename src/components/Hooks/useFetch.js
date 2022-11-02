import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState('')

  useEffect(() => {
    setData(null)
    axios.get(url)
    .then(response => {
      setData(response.data)
    })
  }, [url]);

  return {data, setData, setUrl}
};

export default useFetch;
