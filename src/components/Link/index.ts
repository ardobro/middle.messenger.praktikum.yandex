import Block from "../../core/Block";
import template from "./template.hbs";
import styles from "./styles.module.scss";
import withRouter from "../../hocs/withRouter";

interface LinkProps {
  content: string;
  to: string;
  events?: {
    click?: (event: MouseEvent) => void;
  };
}

class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      styles,
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();
          this.navigate();
        },
      },
    });
  }

  private navigate() {
    this.props.router.go(this.props.to);
  }

  public render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withRouter(Link);
