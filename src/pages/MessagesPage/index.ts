import settingsIcon from "./static/settings.svg?raw";
import chats from "./mocks/chats";
import ChatsList from "./components/ChatsList";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import Block from "../../utils/Block";

class MessagesPage extends Block {
  constructor(props: any) {
    super("div", {
      ...props,
      styles,
      settingsIcon,
      chatsList: new ChatsList({ items: chats }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessagesPage;
