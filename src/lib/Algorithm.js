class Algorithm {
  constructor (canvas, grid, timeout, cellHeight, cellWidth, validColour, invalidColour, pathColour) {
    this.canvas = canvas;
    this.grid = grid;
    this.timeout = timeout;

    this.cellHeight = cellHeight;
    this.cellWidth = cellWidth;

    this.validColour = validColour;
    this.invalidColour = invalidColour;
    this.pathColour = pathColour;

    this.interval = null;

    if (this.setup !== undefined) {
      this.setup();
    }
  }

  start () {
    this.interval = setInterval(() => {
      this.calculate();
      this.draw();
    }, this.timeout);
  }

  stop () {
    clearInterval(this.interval);
  }
}

module.exports = Algorithm;
