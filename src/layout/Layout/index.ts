import Block from "../../core/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";

interface LayoutProps {
  loginPage: Block;
  messagesPage: Block;
  profilePage: Block;
  registrationPage: Block;
  notFoundErrorPage: Block;
  serverErrorPage: Block;
}

class Layout extends Block {
  constructor(props: LayoutProps) {
    super("div", { ...props, styles, page: props.loginPage });
  }

  protected init(): void {
    this.element?.setAttribute("style", styles.layout);

    switch (window.location.pathname) {
      case "/":
        this.children.page = this.children.messagesPage;
        document.title = "Messages";
        break;
      case "/login":
        this.children.page = this.children.loginPage;
        document.title = "Login";
        break;
      case "/profile":
        this.children.page = this.children.profilePage;
        document.title = "Profile";
        break;
      case "/registration":
        this.children.page = this.children.registrationPage;
        document.title = "Registration";
        break;
      case "/404":
        this.children.page = this.children.notFoundErrorPage;
        document.title = "Not found";
        break;
      case "/500":
        this.children.page = this.children.serverErrorPage;
        document.title = "Server error";
        break;
      default:
        break;
    }
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default Layout;
