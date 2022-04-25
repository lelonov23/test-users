import React, { FC, useEffect, useState } from "react";
import UserStore, { User } from "../../store/Store";
import { observer } from "mobx-react";

import styles from "./UserProfile.module.scss";

interface UserProfileProps {
  user: User;
}

export interface UserData {
  name: string;
  username: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  phone: string;
  website: string;
  comment: string;
}

const UserProfile: FC<UserProfileProps> = observer(({ user }) => {
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState<UserData>({
    name: user.name,
    username: user.username,
    email: user.email,
    street: user.address.street,
    city: user.address.city,
    zipcode: user.address.zipcode,
    phone: user.phone,
    website: user.website,
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    const JSONData = JSON.stringify(data);
    console.log(JSONData);
  };

  useEffect(() => {
    setIsEdit(false);
  }, [user]);

  return (
    <div className={styles.userProfile}>
      <h1>Профиль пользователя</h1>
      {!isEdit && (
        <button onClick={() => setIsEdit(!isEdit)}>Редактировать</button>
      )}
      {isEdit && (
        <button
          onClick={() => {
            setIsEdit(!isEdit);
            UserStore.editUser(data);
          }}
        >
          Сохранить
        </button>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={styles.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => handleChange(e, "name")}
            disabled={!isEdit}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="username">User name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={data.username}
            onChange={(e) => handleChange(e, "username")}
            disabled={!isEdit}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={(e) => handleChange(e, "email")}
            disabled={!isEdit}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={data.street}
            onChange={(e) => handleChange(e, "street")}
            disabled={!isEdit}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={data.city}
            onChange={(e) => handleChange(e, "city")}
            disabled={!isEdit}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="zipcode">Zip code</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={data.zipcode}
            onChange={(e) => handleChange(e, "zipcode")}
            disabled={!isEdit}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={(e) => handleChange(e, "phone")}
            disabled={!isEdit}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={data.website}
            onChange={(e) => handleChange(e, "website")}
            disabled={!isEdit}
          />
        </div>

        <div className={styles.control}>
          <label htmlFor="comment">Comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={data.comment}
            onChange={(e) => handleChange(e, "comment")}
            disabled={!isEdit}
          />
        </div>

        <button>Отправить</button>
      </form>
    </div>
  );
});

export default UserProfile;
