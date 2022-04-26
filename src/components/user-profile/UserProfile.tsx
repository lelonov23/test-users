import React, { FC, useEffect, useState } from "react";
import UserStore, { User } from "../../store/Store";
import { observer } from "mobx-react";

import styles from "./UserProfile.module.scss";

interface UserProfileProps {
  user: User;
}

export interface UserData {
  [index: string]: string;
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

export interface UserDataErrors {
  [index: string]: boolean;
  name: boolean;
  username: boolean;
  email: boolean;
  street: boolean;
  city: boolean;
  zipcode: boolean;
  phone: boolean;
  website: boolean;
}

const UserProfile: FC<UserProfileProps> = observer(({ user }) => {
  // edit state
  const [isEdit, setIsEdit] = useState(false);

  //form data state
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

  //validation states
  const [nameError, setNameError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);

  //function context for input change
  const changeContext: {
    [index: string]: React.Dispatch<React.SetStateAction<boolean>>;
  } = {
    name: setNameError,
    username: setUsernameError,
    email: setEmailError,
    street: setStreetError,
    city: setCityError,
    zipcode: setZipcodeError,
    phone: setPhoneError,
    website: setWebsiteError,
  };

  //save form edit handler
  const handleSave = () => {
    let canSave = true;
    if (data.name.length === 0) {
      setNameError(true);
      canSave = false;
    }
    if (data.username.length === 0) {
      setUsernameError(true);
      canSave = false;
    }
    if (data.email.length === 0) {
      setEmailError(true);
      canSave = false;
    }
    if (data.street.length === 0) {
      setStreetError(true);
      canSave = false;
    }
    if (data.city.length === 0) {
      setCityError(true);
      canSave = false;
    }
    if (data.zipcode.length === 0) {
      setZipcodeError(true);
      canSave = false;
    }
    if (data.website.length === 0) {
      setWebsiteError(true);
      canSave = false;
    }
    if (data.phone.length === 0) {
      setPhoneError(true);
      canSave = false;
    }
    // save logic
    if (canSave) {
      setIsEdit(!isEdit);
      UserStore.editUser(data);
    }
  };

  //input change handler
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    key: string
  ) => {
    const value = e.target.value;
    setData({
      ...data,
      [key]: value,
    });
    changeContext[e.target.name](false);
  };

  const handleSubmit = () => {
    if (!isEdit) {
      const JSONData = JSON.stringify(data);
      console.log(JSONData);
    }
  };

  useEffect(() => {
    setIsEdit(false);
  }, [user]);

  return (
    <div className={styles.userProfile}>
      <header>
        <h1>Профиль пользователя</h1>
        {!isEdit && (
          <button onClick={() => setIsEdit(!isEdit)}>Редактировать</button>
        )}
        {isEdit && <button onClick={handleSave}>Сохранить</button>}
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className={styles.formFields}>
          <div className={styles.control}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => handleChange(e, "name")}
              disabled={!isEdit}
              className={nameError ? styles.error : undefined}
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
              className={usernameError ? styles.error : undefined}
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
              className={emailError ? styles.error : undefined}
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
              className={streetError ? styles.error : undefined}
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
              className={cityError ? styles.error : undefined}
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
              className={zipcodeError ? styles.error : undefined}
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
              className={phoneError ? styles.error : undefined}
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
              className={websiteError ? styles.error : undefined}
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              name="comment"
              value={data.comment}
              onChange={(e) => handleChange(e, "comment")}
              disabled={!isEdit}
            />
          </div>
        </div>
        <button>Отправить</button>
      </form>
    </div>
  );
});

export default UserProfile;
