import Block from "../../../../../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import paperclipIcon from "./static/paperclip.svg?raw";
import sendMessageIcon from "./static/send-message.svg?raw";

class NewMessageForm extends Block {
  constructor(props: any) {
    super("form", { ...props, styles, paperclipIcon, sendMessageIcon });
  }

  protected init(): void {
    this.element?.setAttribute("class", styles["message-form"]);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default NewMessageForm;
