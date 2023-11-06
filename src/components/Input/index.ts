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
    super("input", props);
  }

  protected init(): void {
    this.element?.setAttribute("class", styles.input);
    this.element?.setAttribute("type", this.props.type);
    this.element?.setAttribute("name", this.props.name);
    this.element?.setAttribute("placeholder", this.props.placeholder);
    this.element?.setAttribute("autocomplete", "off");
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Input;
