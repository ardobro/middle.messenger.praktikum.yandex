import Block from "../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";

interface InputProps {
  leftElement?: Block | string;
  placeholder?: string;
  rightElement?: Block | string;
}

class Input extends Block {
  constructor(props: InputProps) {
    super("label", { ...props, styles });
  }

  protected init(): void {
    this.element?.setAttribute("class", styles.input);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Input;
