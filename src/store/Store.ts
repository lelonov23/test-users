import { makeAutoObservable } from "mobx";

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
    makeAutoObservable(this);
  }

  initList(users: User[]) {
    this.userList = users;
  }

  get users() {
    return this.userList;
  }

  // get sortedBy...
}

const UserStore = new UserStoreImpl();

export default UserStore;
