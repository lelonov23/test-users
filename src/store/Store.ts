import { makeObservable, observable, action, computed } from "mobx";
import { UserData } from "../components/user-profile/UserProfile";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  comment?: string;
}

export class UserStoreImpl {
  userList: User[] = [];

  constructor() {
    makeObservable(this, {
      userList: observable,
      initList: action,
      editUser: action,
      getSortedUsers: action,
      users: computed,
    });
  }

  initList(users: User[]) {
    this.userList = users;
  }

  editUser(data: UserData) {
    this.userList = this.userList.map((user) => {
      if (data.username === user.username) {
        const newUser: User = {
          ...user,
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          website: data.website,
          comment: data.comment,
        };
        newUser.address.street = data.street;
        newUser.address.city = data.city;
        newUser.address.zipcode = data.zipcode;
        return newUser;
      } else return user;
    });
  }

  getSortedUsers(sorter: (x: User, y: User) => number): User[] {
    return this.userList.sort(sorter);
  }

  get users() {
    return this.userList;
  }
}

const UserStore = new UserStoreImpl();

export default UserStore;
