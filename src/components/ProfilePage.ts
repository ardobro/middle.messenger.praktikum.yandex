import Block from "../utils/Block";
import profilePageTemplate from "./profillePage.hbs";

interface PropfilePageProps {
  button: Block;
  title: string;
}

class ProfilePage extends Block<PropfilePageProps> {
  constructor(props: PropfilePageProps) {
    super("div", props);
  }

  render() {
    return this.compile(profilePageTemplate, this.props);
  }
}

export default ProfilePage;
