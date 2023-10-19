import Block from "../../../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import NewMessageForm from "./components/NewMessageForm";
import ellipsisVerticalIcon from "./static/ellipsis-vertical.svg?raw";

type Props = {
  username: string;
};

class ChatView extends Block<Props> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super("div", {
      ...props,
      styles,
      ellipsisVerticalIcon,
      newMessageForm: new NewMessageForm({}),
    });
  }

  protected init(): void {
    this.element?.setAttribute("class", styles["chat-view"]);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatView;
