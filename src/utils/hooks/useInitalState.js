import { useState, useEffect } from "react";

const useInitialState = (API) => {
  const [user, setUser] = useState({ usuarios: [] });

  console.log(user);
  // empty array as second argument equivalent to componentDidMount
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(API, { mode: "no-cors" });
      const json = await response.json();
      setUser(json);
    }
    fetchData();
  }, [API]);

  return user;
};

export default useInitialState;
