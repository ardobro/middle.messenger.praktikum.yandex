import renderDOM from "./utils/RenderDOM";
import MessagesPage from "./pages/MessagesPage";

const messagesPage = new MessagesPage({});

renderDOM("#app", messagesPage);
