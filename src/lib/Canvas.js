class Canvas {
  constructor(id, gridHeight, gridWidth, cellHeight, cellWidth) {
    this.elem = document.getElementById(id);

    if (!this.elem) {
      throw new Error('Could not find canvas element');
    }

    this.elem.height = gridHeight * cellHeight;
    this.elem.width = gridWidth * cellWidth;
    this.context = this.elem.getContext('2d');
  }
}

module.exports = Canvas;
