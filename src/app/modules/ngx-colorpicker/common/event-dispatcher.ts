export class EventPhase {
  static CAPTURE_PHASE = 0;

  static AT_TARGET = 1;

  static BUBBLING_PHASE = 2;
}

export class RokkEvent {
  type: string;
  cancelable: boolean;
  bubbles: boolean;
  eventPhase = 0;
  target: IEventDispatcher;
  currentTarget: IEventDispatcher;
  isPropagating = true;
  isImmediatePropagating = true;
  isCancelled = true;

  constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
  }

  stopPropagation() {
    this.isPropagating = false;
  }

  stopImmediatePropagation() {
    this.isImmediatePropagating = false;
  }

  preventDefault() {
    if (this.cancelable) {
      this.isCancelled = true;
    }
  }

  isDefaultPrevented() {
    if (!this.cancelable) {
      return false;
    }
    return this.isCancelled;
  }
}

export interface IEventDispatcher {
  dispatchEvent(evt: RokkEvent);

  addEventListener(eventType: string, listener: (evt: RokkEvent) => void);

  removeEventListener(eventType: string, listener: (evt: RokkEvent) => void);

  getPropagationParent(): IEventDispatcher;

  executeHandlers(event: RokkEvent): void;
}

export class EventListenerDescription {
  listenerFunction: (event: RokkEvent) => void;
  once = false;
  useCapture = false;
}

export class EventDispatcher implements IEventDispatcher {
  private eventRoot: HTMLElement;
  private handlers: { [index: string]: EventListenerDescription[]; } = {};

  dispatchEvent(event: RokkEvent) {

    event.target = this;

    let lastParent: IEventDispatcher = this.getPropagationParent(),
      j = 0;
    const activationList: IEventDispatcher[] = [];
    while (lastParent !== null && lastParent !== undefined) {
      activationList.push(lastParent);
      lastParent = lastParent.getPropagationParent();
    }

    event.eventPhase = EventPhase.CAPTURE_PHASE;
    j = activationList.length;
    while (j > 0) {
      j = j - 1;
      activationList[j].executeHandlers(event);
      if (!event.isImmediatePropagating || !event.isPropagating) {
        break;
      }
    }

    if (event.isImmediatePropagating && event.isPropagating) {
      event.eventPhase = EventPhase.AT_TARGET;
      this.executeHandlers(event);
    }

    if (event.bubbles && event.isImmediatePropagating && event.isPropagating) {
      event.eventPhase = EventPhase.BUBBLING_PHASE;
      j = 0;
      while (j < activationList.length) {
        activationList[j].executeHandlers(event);
        if (!event.isImmediatePropagating || !event.isPropagating) {
          break;
        }
        j = j + 1;
      }
    }
  }

  getPropagationParent(): IEventDispatcher {
    return null;
  }

  addEventListener(eventType: string, listener: (evt: RokkEvent) => void, once: boolean = false, useCapture: boolean = false) {
    if (this.handlers[eventType] === undefined) {
      this.handlers[eventType] = [];
    }
    const handler: EventListenerDescription = new EventListenerDescription();
    handler.listenerFunction = listener;
    handler.once = once;
    handler.useCapture = useCapture;
    this.handlers[eventType].push(handler);
  }

  removeEventListener(eventType: string, listener: (evt: RokkEvent) => void) {
    const needToRemove: any[] = [];
    for (const i in this.handlers[eventType]) {
      if (this.handlers[eventType][i].listenerFunction === listener) {
        needToRemove.push(i);
      }
    }
  }

  executeHandlers(event: RokkEvent) {
    const handlers = this.handlers[event.type],
      remove = [];
    let i;
    event.currentTarget = this;
    if (handlers !== undefined && handlers !== null) {
      i = handlers.length;
      while (--i >= 0) {
        if (event.eventPhase === EventPhase.CAPTURE_PHASE && handlers[i].useCapture) {
          handlers[i].listenerFunction(event);
        } else if (!handlers[i].useCapture && (event.eventPhase === EventPhase.BUBBLING_PHASE
|| event.eventPhase === EventPhase.AT_TARGET)) {
          handlers[i].listenerFunction(event);
        }
        if (handlers[i].once) {
          remove.push(handlers[i]);
        }
        if (!event.isImmediatePropagating) {
          break;
        }
      }
      i = remove.length;
      while (--i >= 0) {
        this.handlers[event.type].splice(this.handlers[event.type].indexOf(remove[i]), 1);
      }
    }
  }
}
