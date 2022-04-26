import React, { FC } from "react";
import UserStore, { User } from "../../store/Store";

import styles from "./SorterPanel.module.scss";

const SorterPanel: FC = () => {
  const sortByCity = (x: User, y: User) => {
    return x.address.city.localeCompare(y.address.city);
  };
  const sortByCompany = (x: User, y: User) => {
    return x.company.name.localeCompare(y.company.name);
  };

  const handleSort = (type: "city" | "company") => {
    let sortedUsers: User[] = [];
    if (type === "city") {
      sortedUsers = UserStore.getSortedUsers(sortByCity);
    } else {
      sortedUsers = UserStore.getSortedUsers(sortByCompany);
    }
    UserStore.initList(sortedUsers);
  };

  return (
    <div className={styles.panel}>
      <span>Сортировка</span>
      <button onClick={() => handleSort("city")}>по городу</button>
      <button onClick={() => handleSort("company")}>по компании</button>
    </div>
  );
};

export default SorterPanel;
