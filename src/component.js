export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
  }
  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }
  render() {}
  unrender() {}
  update() {}
  _addEventListeners() {}
  _removeEventListeners() {}
}
