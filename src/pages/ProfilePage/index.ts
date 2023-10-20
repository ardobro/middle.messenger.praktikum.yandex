import Block from "../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";

interface LoginPageProps {}

class ProfilePage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super("main", { ...props, styles });
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ProfilePage;
