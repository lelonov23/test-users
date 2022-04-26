import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import UserStore from "./store/Store";
import PulseLoader from "react-spinners/PulseLoader";

import { Routes, Route, Navigate } from "react-router-dom";
import UserListView from "./components/views/UserListView";
import UserProfileView from "./components/views/UserProfileView";
import SorterPanel from "./components/sorter-panel/SorterPanel";

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
    <div className={styles.App}>
      {!isLoaded && (
        <div className={styles.spinner}>
          <PulseLoader size={30} />
        </div>
      )}
      {isLoaded && (
        <div className={styles.mainView}>
          <SorterPanel />
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<UserListView />} />
            <Route path="/users/:id" element={<UserProfileView />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
