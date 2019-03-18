class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
  }
  get element() {
    return this._element;
  }
  _getRandomNum(length) {
    return Math.floor(Math.random() * length);
  }
  _generateDescription(descr) {
    const coords = [
      this._getRandomNum(this._about.length),
      this._getRandomNum(this._about.length)
    ].sort((a, b) => a - b);
    return descr.slice(...coords).join(`. `);
  }
  get template() {
    throw new Error(`You have to define template.`);
  }
  render() {}
  unrender() {}
}

export { Component };
