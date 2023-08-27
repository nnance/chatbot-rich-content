export interface Subject {
  // Attach an observer to the subject.
  attach(observer: Observer): void;

  // Detach an observer from the subject.
  detach(observer: Observer): void;

  // Notify all observers about an event.
  notify(): void;
}

export interface Observer {
  // Receive update from subject.
  update(subject: Subject): void;
}

export const createSubject = (): Subject => {
  const observers: Observer[] = [];

  /**
   * The subscription management methods.
   */
  function attach(observer: Observer): void {
    const exists = observers.includes(observer);
    if (exists) {
      return console.log("Subject: Observer has been attached already.");
    }

    console.log("Subject: Attached an observer.");
    observers.push(observer);
  }

  function detach(observer: Observer): void {
    const observerIndex = observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer.");
    }

    observers.splice(observerIndex, 1);
    console.log("Subject: Detached an observer.");
  }

  /**
   * Trigger an update in each subscriber.
   */
  function notify(): void {
    for (const observer of observers) {
      observer.update(this);
    }
  }

  return {
    attach,
    detach,
    notify,
  };
};
