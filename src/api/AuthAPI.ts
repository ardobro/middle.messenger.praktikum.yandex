import BaseAPI from "./BaseAPI";

export interface ISignUpData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ISignInData {
  login: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  signup(data: ISignUpData): Promise<void> {
    return this.http.post("/sign-up", { data });
  }

  signin(data: ISignInData): Promise<void> {
    return this.http.post("/sign-in", { data });
  }

  getUser(): Promise<User> {
    return this.http.get<User>("/user");
  }

  logout(): Promise<void> {
    return this.http.post("/logout");
  }
}

export default AuthAPI;
