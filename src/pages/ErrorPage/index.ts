import Block from "../../utils/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";

interface ErrorPageProps {
  title: string;
  description: string;
}

class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super("main", { ...props, styles });
  }

  protected init(): void {
    this.element?.setAttribute("class", styles["error-page"]);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default ErrorPage;
