import { useState, useEffect } from "react";

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  return [
    values,
    (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
  ];
};

export const useFetch = ({ api, url, method, data = null }) => {
  // useFetch state
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      api[method](url, data)
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
        });
      // intercepting request to check auth token
      // api.interceptors.request.use((config) => {
      //   const token = localStorage.getItem("userToken");

      //   config.headers.Authorization = token ? `Bearer ${token}` : "";
      //   return config;
      // });
    } catch (err) {
      console.log(err);
      setError(err);
    }
    console.log("from useFetch hook");
  }, []);

  return { response, error, loading };
};
