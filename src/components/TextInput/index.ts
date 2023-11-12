import Block from "../../core/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import Input from "../Input";

interface InputProps {
  leftElement?: Block | string;
  placeholder?: string;
  rightElement?: Block | string;
  name?: string;
  type?: string;
  pattern?: string | RegExp;
  errorMessage?: string;
}

class TextInput extends Block {
  constructor(props: InputProps) {
    super({ ...props, styles });
  }

  get isValid(): boolean {
    const regExp = new RegExp(this.props.pattern);

    return regExp.test((this.children.input.element as HTMLInputElement).value);
  }

  public validate() {
    console.log(this.isValid);
    if (this.isValid) {
      this.setProps({ ...this.props, showError: false });
    } else {
      this.setProps({
        ...this.props,
        showError: true,
      });
    }
  }

  protected init(): void {
    this.validate = this.validate.bind(this);

    this.props.showError = false;

    this.children.input = new Input({
      type: this.props.type,
      placeholder: this.props.placeholder,
      name: this.props.name,
      events: {
        blur: this.validate,
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default TextInput;
