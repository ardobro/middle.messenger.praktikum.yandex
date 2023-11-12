import Block from "../../core/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  events: Record<string, () => void>;
}

class Input extends Block {
  constructor(props: InputProps) {
    super({ ...props, styles });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Input;
