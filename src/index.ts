import renderDOM from "./utils/RenderDOM";
import MessagesPage from "./pages/MessagesPage";

import "./index.scss";

const messagesPage = new MessagesPage({});

renderDOM("#app", messagesPage);
