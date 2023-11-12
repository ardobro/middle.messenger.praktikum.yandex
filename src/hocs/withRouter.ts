/* eslint-disable @typescript-eslint/no-explicit-any */
import Block from "../core/Block";
import Router from "../core/Router";

const router = new Router("#app");

export interface PropsWithRouter {
  router: typeof Router;
}

function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<
    infer P extends Record<string, any>
  >
    ? P
    : any;

  return class extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router });
    }
  };
}

export default withRouter;
