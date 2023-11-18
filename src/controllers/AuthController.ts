import AuthAPI, { ISignInData, ISignUpData } from "../api/AuthAPI";
import Router from "../core/Router";
import { Routes } from "../enums/Routes";

class AuthController {
  private api = new AuthAPI();
  private router = new Router("#app");

  async signup(data: ISignUpData) {
    try {
      await this.api.signup(data);

      this.router.go(Routes.Messenger);
    } catch (error) {
      console.error(error);
    }
  }

  async signin(data: ISignInData) {
    try {
      await this.api.signin(data);
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      await this.api.logout();
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthController();
