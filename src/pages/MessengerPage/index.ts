import settingsIcon from "./static/settings.svg?raw";
import chats from "./mocks/chats";
import ChatsList from "./components/ChatsList";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import Block from "../../core/Block";
import ChatView from "./components/ChatView";
import TextInput from "../../components/TextInput";
import searchIcon from "./static/search.svg?raw";
import Link from "../../components/Link";
import { Routes } from "../../enums/Routes";

class MessengerPage extends Block {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super({
      ...props,
      styles,
    });
  }

  protected init(): void {
    this.children.settingsLink = new Link({
      content: settingsIcon,
      to: Routes.Settings,
      class: styles["sidebar-header_link"],
    });

    this.children.chatsList = new ChatsList({ items: chats });

    this.children.chatView = new ChatView({
      username: "Jotari Kujo",
    });

    this.children.search = new TextInput({
      placeholder: "Search",
      leftElement: searchIcon,
    });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default MessengerPage;
