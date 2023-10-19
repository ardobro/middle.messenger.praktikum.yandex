import Block from "../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import Input from "../../components/Input";

interface LoginPageProps {
  loginInput: Block;
  passwordInput: Block;
  submitButton: Block;
  styles: Record<string, string>;
}

class LoginPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super("main", {
      ...props,
      styles,
      loginInput: new Input({ placeholder: "Login" }),
      passwordInput: new Input({ placeholder: "Password" }),
    });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default LoginPage;
