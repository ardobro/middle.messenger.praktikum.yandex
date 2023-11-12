import LoginPage from "./pages/LoginPage";
import Router from "./core/Router";
import SignUpPage from "./pages/SignUpPage";
import { Routes } from "./enums/Routes";
import SettingsPage from "./pages/SettingsPage";
import MessengerPage from "./pages/MessengerPage";

const router = new Router("#app");

window.addEventListener("DOMContentLoaded", async () => {
  router
    .use(Routes.Index, LoginPage)
    ?.use(Routes.SignUp, SignUpPage)
    ?.use(Routes.Settings, SettingsPage)
    ?.use(Routes.Messenger, MessengerPage)
    ?.start();
});
