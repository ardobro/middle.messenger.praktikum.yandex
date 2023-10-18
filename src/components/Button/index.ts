import template from "./template.hbs";

import "./styles.scss";
import Block from "../../utils/Block";

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
    return this.compile(template, this.props);
  }
}

export default Button;
