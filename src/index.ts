// import renderDOM from "./core/RenderDOM";
// import MessagesPage from "./pages/MessagesPage";
// import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
// import ProfilePage from "./pages/ProfilePage";
// import RegistrationPage from "./pages/RegistrationPage";
// import ErrorPage from "./pages/ErrorPage";
import Router from "./core/Router";
import RegistrationPage from "./pages/RegistrationPage";

// const loginPage = new LoginPage({});
// const messagesPage = new MessagesPage({});
// const profilePage = new ProfilePage({ username: "Jojo" });
// const registrationPage = new RegistrationPage({});
// const notFoundErrorPage = new ErrorPage({
//   title: "404",
//   description: "Page not found :(",
// });
// const serverErrorPage = new ErrorPage({
//   title: "500",
//   description: "We broke something :(",
// });

// const layout = new Layout({
//   loginPage,
//   messagesPage,
//   profilePage,
//   registrationPage,
//   notFoundErrorPage,
//   serverErrorPage,
// });

// renderDOM("#app", layout);

enum Routes {
  Index = "/",
  SignUp = "/sign-up",
  Settings = "/settings",
  Messenger = "/messenger",
}

const router = new Router("#app");

window.addEventListener("DOMContentLoaded", async () => {
  router
    .use(Routes.Index, LoginPage)
    ?.use(Routes.SignUp, RegistrationPage)
    ?.start();
});
