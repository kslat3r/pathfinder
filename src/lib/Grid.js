const Cell = require('./Cell');

class Grid {
  constructor(canvas, height, width, cellHeight, cellWidth, cellClosedChance, cellOpenColour, cellClosedColour) {
    this.canvas = canvas;

    this.height = height;
    this.width = width;

    this.cellHeight = cellHeight;
    this.cellWidth = cellWidth;
    this.cellClosedChance = cellClosedChance;
    this.cellOpenColour = cellOpenColour;
    this.cellClosedColour = cellClosedColour;

    this.cells = [];

    for (let i = 0; i < this.height; i++) {
      const row = [];

      for (let j = 0; j < this.width; j++) {
        let cellClosedChance = this.cellClosedChance;

        if ((i === 0 && j === 0) || ((i === this.height - 1) && (j === this.width - 1))) {
          cellClosedChance = 0;
        }

        row.push(new Cell(j, i, cellClosedChance));
      }

      this.cells.push(row);
    }
  }

  draw () {
    for (const row of this.cells) {
      for (const cell of row) {
        this.canvas.context.fillStyle = cell.open ? this.cellOpenColour : this.cellClosedColour;
        this.canvas.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);
      }
    }
  }
}

module.exports = Grid;
