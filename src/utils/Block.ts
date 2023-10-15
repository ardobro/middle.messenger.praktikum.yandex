import EventBus from "./EventBus";

type TagName = keyof HTMLElementTagNameMap;

type Meta<Props> = {
  tagName: TagName;
  props: Props;
  oldProps: Props;
};

class Block<P extends Record<string, any> & {} = any> {
  private static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  private eventBus: () => EventBus;
  private _element!: HTMLElement;
  private meta: Meta<P>;
  public props: P;

  constructor(tagName: TagName = "div", props: P) {
    const eventBus = new EventBus();

    this.meta = { tagName, props, oldProps: {} as P };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  public setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _makePropsProxy(props: P) {
    const self = this;

    return new Proxy<P>(props, {
      get(target, prop: string) {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };

        target[prop as keyof P] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error("Forbidden access");
      },
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this.meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _createDocumentElement(tagName: TagName) {
    return document.createElement(tagName);
  }

  private init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  public componentDidMount() {}

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.meta.oldProps = oldProps;
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  public componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  get element() {
    return this._element;
  }

  public getContent() {
    return this.element;
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(
        eventName,
        events[eventName as keyof typeof events]
      );
    });
  }

  private _removeEvents() {
    const { events = {} } = this.meta.oldProps;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(
        eventName,
        events[eventName as keyof typeof events]
      );
    });
  }

  private _render() {
    const fragment = this.render();

    this._removeEvents();

    this._element!.innerHTML = fragment;

    this._addEvents();

    // this._element!.append(fragment);
  }

  public render(): string {
    return "";
  }

  public show() {
    this.getContent()!.style.display = "block";
  }

  public hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;
