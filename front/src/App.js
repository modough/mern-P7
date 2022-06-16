import axios from "axios";
import React, { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/routes";

const App = () => {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        //demande de token dés le debut
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => {
          console.log("No token");
        });
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
