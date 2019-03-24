export class Observable {
  constructor(data) {
    this._data = data;
    this._observers = [];
  }

  subscribe(f) {
    this._observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  update(f) {
    this._data = f(this._data);
    this.notify();
  }
  currentData() {
    return this._data;
  }

  notify() {
    this._observers.forEach(observer => observer(this._data));
  }
}
