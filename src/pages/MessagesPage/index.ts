import settingsIcon from "./static/settings.svg?raw";
import chats from "./mocks/chats";
import ChatsList from "./components/ChatsList";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import Block from "../../utils/Block";
import ChatView from "./components/ChatView";
import Input from "../../components/TextInput";
import searchIcon from "./static/search.svg?raw";

class MessagesPage extends Block {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super("main", {
      ...props,
      styles,
      settingsIcon,
      chatsList: new ChatsList({ items: chats }),
      chatView: new ChatView({
        username: "Jotari Kujo",
      }),
      search: new Input({ placeholder: "Search", leftElement: searchIcon }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessagesPage;
