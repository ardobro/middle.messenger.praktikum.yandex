import Block from "../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import Input from "../../components/TextInput";
import Button from "../../components/Button";
import logSubmitHandler from "../../utils/logSubmitHandler";
import TextInput from "../../components/TextInput";

interface LoginPageProps {
  username: string;
}

class ProfilePage extends Block {
  constructor(props: LoginPageProps) {
    super("main", {
      ...props,
      styles,
      logoutButton: new Button({ buttonText: "Sign out" }),
      changeButton: new Button({ buttonText: "Change" }),
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
    this.element?.setAttribute("class", styles["profile-page"]);

    this.children.emailInput = new TextInput({
      type: "email",
      name: "email",
      placeholder: "Email",
      pattern: /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/,
      errorMessage:
        // eslint-disable-next-line max-len
        "Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.",
    });

    this.children.loginInput = new TextInput({
      type: "text",
      name: "login",
      placeholder: "Login",
      pattern: /[a-zA-Z0-9-_]{3,20}/,
      errorMessage:
        // eslint-disable-next-line max-len
        "От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).",
    });

    const namePattern = /^[А-ЯA-Z][а-яА-Яa-zA-Z-]*$/;
    const nameErrorMessage =
      // eslint-disable-next-line max-len
      "Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (только дефис).";

    this.children.firstNameInput = new TextInput({
      type: "text",
      name: "first_name",
      placeholder: "First name",
      pattern: namePattern,
      errorMessage: nameErrorMessage,
    });

    this.children.secondNameInput = new TextInput({
      type: "text",
      name: "second_name",
      placeholder: "Second name",
      pattern: namePattern,
      errorMessage: nameErrorMessage,
    });

    this.children.phoneInput = new TextInput({
      type: "phone",
      name: "phone",
      placeholder: "phone",
      pattern: /\+?\d{10,15}/,
      errorMessage:
        "От 10 до 15 символов, состоит из цифр, может начинается с плюса.",
    });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
