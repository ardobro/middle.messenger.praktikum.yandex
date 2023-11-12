import Block from "../../core/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import logSubmitHandler from "../../utils/logSubmitHandler";

class LoginPage extends Block {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super("main", {
      ...props,
      styles,
      submitButton: new Button({ buttonText: "Sign in" }),
      events: {
        submit: (e: Event) => {
          logSubmitHandler(e);

          Object.values(this.children).forEach((child) => {
            if (child instanceof TextInput) {
              child.validate();
            }
          });
        },
      },
    });
  }

  protected init(): void {
    this.element?.setAttribute("class", styles["login-page"]);

    this.children.loginInput = new TextInput({
      type: "text",
      name: "login",
      placeholder: "Login",
      pattern: /[a-zA-Z0-9-_]{3,20}/,
      errorMessage:
        // eslint-disable-next-line max-len
        "От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).",
    });

    this.children.passwordInput = new TextInput({
      type: "password",
      name: "password",
      placeholder: "Password",
      pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/,
      errorMessage:
        "От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
    });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default LoginPage;
