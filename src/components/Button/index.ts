import Block from "../../utils/Block";
import button from "./button.hbs";

import "./button.scss";

interface ButtonProps {
  className?: string;
  child?: string;
  events?: {
    click: () => void;
  };
  settings?: {
    withInternalID?: boolean;
  };
}

class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super("button", props);
  }

  render() {
    return this.compile(button, this.props);
  }
}

export default Button;
