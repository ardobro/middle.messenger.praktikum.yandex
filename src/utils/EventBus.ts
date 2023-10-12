type Event = string;

type Callback = (...args: any[]) => void;

type Listeners = Record<Event, Callback[]>;

export class EventBus {
  private readonly listeners: Listeners;

  constructor() {
    this.listeners = {};
  }

  private isEventExists(event: Event) {
    return Boolean(this.listeners[event]);
  }

  private checkEventExists(event: Event) {
    if (!this.isEventExists(event)) {
      throw new Error(`Event "${event}" is not exists`);
    }
  }

  public on(event: Event, callback: Callback) {
    if (!this.isEventExists(event)) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: Event, callback: Callback) {
    this.checkEventExists(event);

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  public emit(event: Event, ...args: any[]) {
    this.checkEventExists(event);

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
