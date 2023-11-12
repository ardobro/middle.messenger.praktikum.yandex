import Block from "../../../../core/Block";
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
    super({
      ...props,
      styles,
      ellipsisVerticalIcon,
      newMessageForm: new NewMessageForm({}),
    });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatView;
