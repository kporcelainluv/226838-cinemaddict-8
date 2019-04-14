export default class Observable {
  constructor(data) {
    this.value = data;
    this._observers = [];
  }

  subscribe(f) {
    this._observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  update(f) {
    this.value = f(this.value);
    this.notify();
  }

  notify() {
    this._observers.forEach(observer => observer(this.value));
  }
}
