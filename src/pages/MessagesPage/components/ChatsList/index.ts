/* eslint-disable @typescript-eslint/no-explicit-any */
import Handlebars from "handlebars/runtime";
import Block from "../../../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import messageReadIcon from "./static/message-read.svg?raw";

// вынести на верхний уровень
Handlebars.registerHelper("isPositive", (aString: string) => {
  return Number(aString) > 0;
});

type Props = {
  items: any[];
};

class ChatsList extends Block<Props> {
  constructor(props: any) {
    super("ul", { ...props, styles, messageReadIcon });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ChatsList;
