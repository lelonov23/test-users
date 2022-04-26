import React, { FC } from "react";
import { User } from "../../store/Store";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import styles from "./UserItem.module.scss";

interface UserItemProps {
  user: User;
}

const UserItem: FC<UserItemProps> = observer(({ user }) => {
  return (
    <div className={styles.userItem}>
      <p>
        <span>ФИО: </span>
        {user.name}
      </p>
      <p>
        <span>город: </span>
        {user.address.city}
      </p>
      <p>
        <span>компания: </span>
        {user.company.name}
      </p>
      <Link to={`${user.id}`}>Подробнее</Link>
    </div>
  );
});

export default UserItem;
