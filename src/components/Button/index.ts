import Block from "../../utils/Block";
import button from "./button.hbs";

import "./button.scss";

interface ButtonProps {
  className?: string;
  child?: string;
  events?: {
    click: () => void;
  };
}

class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super("button", props);
  }

  render() {
    return button(this.props);
  }
}

export default Button;
