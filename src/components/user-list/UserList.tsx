import React, { FC } from "react";
import UserStore from "../../store/Store";
import { observer } from "mobx-react";

import styles from "./UserList.module.scss";
import UserItem from "./UserItem";

const UserList: FC = observer(() => {
  const users = UserStore.users;
  return (
    <div>
      <h1>Список пользователей</h1>
      <ul className={styles.list}>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <UserItem user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default UserList;
