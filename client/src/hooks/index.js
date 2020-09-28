import { useState, useEffect, useCallback } from "react";

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  return [
    values,
    (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
  ];
};

export const useFetch = ({ api, url, method, headers, paylaod = null }) => {
  // useFetch state
  const [response, setResponse] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const callAPI = useCallback(async () => {
    // setResponse(prevState => ({...prevState, loading: true}))
    let res = await api[method](url, paylaod, headers);
    console.log(res);
    if (res.status === 200) {
      setResponse({ data: null, loading: false, error: "" });
    }

    setResponse({ data: res.data, loading: false, error: null });

    // api[method](url, paylaod, headers)
    //   .then((res) => {
    //     // console.log("paylaod: ", paylaod);
    //     // console.log("data: ", res.data);

    //     setResponse({ data: res.data, loading: false, error: null });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setResponse({ data: null, loading: false, error: err });
    //   });
    // intercepting request to check auth token
    // api.interceptors.request.use((config) => {
    //   const token = localStorage.getItem("userToken");

    //   config.headers.Authorization = token ? `Bearer ${token}` : "";
    //   return config;
    // });
  }, [api, method, url, headers, paylaod]);
  // console.log("response from custom hook: ", response);
  return [response, callAPI];
};
