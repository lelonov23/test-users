import React, { FC } from "react";
import { observer } from "mobx-react";

import { useParams } from "react-router-dom";
import UserStore from "../../store/Store";
import UserProfile from "../user-profile/UserProfile";

const UserProfileView: FC = observer(() => {
  const userId = useParams()?.id;
  if (userId) {
    const user = UserStore.users.find((user) => user.id === +userId);
    if (user) {
      return (
        <section>
          <UserProfile user={user} />
        </section>
      );
    } else return null;
  } else return null;
});

export default UserProfileView;
