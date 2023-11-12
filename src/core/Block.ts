/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as makeUUID } from "uuid";
import EventBus from "./EventBus";

type TagName = keyof HTMLElementTagNameMap;

type Meta<Props> = {
  tagName: TagName;
  props: Props;
  oldProps: Props;
};

class Block<P extends Record<string, any> = any> {
  private static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  public _id = makeUUID();
  protected props: P;
  protected children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private meta: Meta<P>;

  constructor(tagName: TagName = "div", propsAndChildren: P) {
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    const eventBus = new EventBus();

    this.meta = { tagName, props: props as P, oldProps: {} as P };

    this.props = this._makePropsProxy(props as P);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  public compile(template: Handlebars.TemplateDelegate, props: any) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = document.createElement("template");

    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      stub?.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  private _getChildren(propsAndChildren: P) {
    const children: Record<string, Block> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  public setProps = (nextProps: P) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _makePropsProxy(props: P) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
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
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this.meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _createDocumentElement(tagName: TagName) {
    const element = document.createElement(tagName);

    if (this.props?.setting?.withInternalID) {
      element.setAttribute("data-id", this._id);
    }

    return element;
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  protected componentDidMount() {}

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.meta.oldProps = oldProps;
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public componentDidUpdate(_oldProps: P, _newProps: P) {
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
      this._element?.addEventListener(
        eventName,
        events[eventName as keyof typeof events]
      );
    });
  }

  private _removeEvents() {
    const { events = {} } = this.meta.oldProps;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(
        eventName,
        events[eventName as keyof typeof events]
      );
    });
  }

  private _render() {
    const fragment = this.render();

    this._removeEvents();

    this._element!.innerHTML = "";

    this._element!.append(fragment);

    this._addEvents();
  }

  public render(): DocumentFragment {
    return new DocumentFragment();
  }

  public show() {
    this.getContent()!.style.display = "block";
  }

  public hide() {
    this.getContent()!.style.display = "none";
  }
}

export default Block;
