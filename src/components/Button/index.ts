import Block from "../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";

interface ButtonProps {
  buttonText?: string;
  events?: {
    click: () => void;
  };
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", { ...props, styles });
  }

  protected init(): void {
    this.element?.setAttribute("class", styles.button);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default Button;
