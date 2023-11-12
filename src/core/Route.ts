import Block from "./Block";
import renderDOM from "./RenderDOM";

type RouteProps = Record<string, unknown>;

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null = null;
  private _props: RouteProps;

  constructor(pathname: string, view: typeof Block, props: RouteProps = {}) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  public match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  public render() {
    if (!this._block) {
      this._block = new this._blockClass("main", {});
      renderDOM(this._props.rootQuery, this._block);
      return;
    }
  }
}

export default Route;
