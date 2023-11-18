import Block from "../../core/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";

interface ButtonProps {
  buttonText?: string;
  type?: string;
  events?: {
    click: () => void;
  };
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super({ ...props, styles });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Button;
