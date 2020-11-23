class Canvas {
  constructor(id) {
    this.elem = document.getElementById(id);

    if (!this.elem) {
      throw new Error('Could not find canvas element');
    }

    this.context = this.elem.getContext('2d');
  }
}

module.exports = Canvas;
