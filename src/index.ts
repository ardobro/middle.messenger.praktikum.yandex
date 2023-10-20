import renderDOM from "./utils/RenderDOM";
import MessagesPage from "./pages/MessagesPage";
import Layout from "./layout/Layout";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";

const loginPage = new LoginPage({});
const messagesPage = new MessagesPage({});
const profilePage = new ProfilePage({});
const registrationPage = new RegistrationPage({});

const layout = new Layout({
  loginPage,
  messagesPage,
  profilePage,
  registrationPage,
});

renderDOM("#app", layout);
