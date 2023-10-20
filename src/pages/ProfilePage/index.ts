import Block from "../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import Button from "../../components/Button";
import logSubmitHandler from "../../utils/logSubmitHandler";

interface LoginPageProps {
  username: string;
}

class ProfilePage extends Block {
  constructor(props: LoginPageProps) {
    super("main", {
      ...props,
      styles,
      emailInput: new Input({
        placeholder: "Email",
        name: "email",
        type: "email",
      }),
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
      displayNameInput: new Input({
        placeholder: "Display name",
        name: "display_name",
        type: "text",
      }),
      phoneInput: new Input({
        placeholder: "Phone",
        name: "phone",
        type: "phone",
      }),
      logoutButton: new Button({ buttonText: "Sign out" }),
      changeButton: new Button({ buttonText: "Change" }),
      events: {
        submit: logSubmitHandler,
      },
    });
  }

  protected init(): void {
    this.element?.setAttribute("class", styles["profile-page"]);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
