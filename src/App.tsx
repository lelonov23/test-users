import React, { useEffect, useState } from "react";
import "./App.scss";
import UserStore from "./store/Store";
import PulseLoader from "react-spinners/PulseLoader";

import { Routes, Route, Navigate } from "react-router-dom";
import UserListView from "./components/views/UserListView";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        UserStore.initList(data);
        setTimeout(() => {
          setIsLoaded(true);
        }, 1000);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return (
    <div className="App">
      {!isLoaded && (
        <div className="spinner">
          <PulseLoader size={30} />
        </div>
      )}
      {isLoaded && (
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<UserListView />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
