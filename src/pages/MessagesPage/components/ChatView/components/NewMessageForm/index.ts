import Block from "../../../../../../core/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import paperclipIcon from "./static/paperclip.svg?raw";
import sendMessageIcon from "./static/send-message.svg?raw";
import Input from "../../../../../../components/TextInput";
import logSubmitHandler from "../../../../../../utils/logSubmitHandler";

class NewMessageForm extends Block {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super("form", {
      ...props,
      styles,
      paperclipIcon,
      sendMessageIcon,
      input: new Input({
        placeholder: "Start typing message",
        name: "message",
        type: "text",
      }),
      events: {
        submit: logSubmitHandler,
      },
    });
  }

  protected init(): void {
    this.element?.setAttribute("class", styles["message-form"]);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default NewMessageForm;
