import React, { FC } from "react";
import { User } from "../../store/Store";
import { observer } from "mobx-react";

import styles from "./UserItem.module.scss";

interface UserItemProps {
  user: User;
}

const UserItem: FC<UserItemProps> = observer(({ user }) => {
  return (
    <div className={styles.userItem}>
      <p>{user.name}</p>
      <p>{user.address.city}</p>
      <p>{user.company.name}</p>
    </div>
  );
});

export default UserItem;
