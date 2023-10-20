import Block from "../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logSubmitHandler from "../../utils/logSubmitHandler";

interface LoginPageProps {}

class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super("main", {
      ...props,
      styles,
      loginInput: new Input({
        placeholder: "Login",
        name: "login",
        type: "text",
      }),
      passwordInput: new Input({
        placeholder: "Password",
        name: "password",
        type: "password",
      }),
      submitButton: new Button({ buttonText: "Sign in" }),
      events: {
        submit: logSubmitHandler,
      },
    });
  }

  protected init(): void {
    this.element?.setAttribute("class", styles["login-page"]);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default LoginPage;
