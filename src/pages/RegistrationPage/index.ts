import Block from "../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logSubmitHandler from "../../utils/logSubmitHandler";

interface LoginPageProps {}

class RegistrationPage extends Block {
  constructor(props: LoginPageProps) {
    super("main", {
      ...props,
      styles,
      loginInput: new Input({
        placeholder: "Login",
        name: "login",
        type: "text",
      }),
      firstNameInput: new Input({
        placeholder: "First name",
        name: "first_name",
        type: "text",
      }),
      secondNameInput: new Input({
        placeholder: "Second name",
        name: "second_name",
        type: "text",
      }),
      emailInput: new Input({
        placeholder: "Email",
        name: "email",
        type: "email",
      }),
      phoneInput: new Input({
        placeholder: "Phone",
        name: "phone",
        type: "phone",
      }),
      passwordInput: new Input({
        placeholder: "Password",
        name: "password",
        type: "password",
      }),
      passwordAgainInput: new Input({
        placeholder: "Password (again)",
        name: "password-again",
        type: "password",
      }),
      submitButton: new Button({ buttonText: "Sign up" }),
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

export default RegistrationPage;
