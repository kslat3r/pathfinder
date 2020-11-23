class Cell {
  constructor(x, y, chance) {
    this.x = x;
    this.y = y;
    this.open = Math.random() > chance ? true : false;

    this.fitness = 0;
    this.costFromStart = 0;
    this.costToEnd = 0;
    this.previous = null;
    this.neighbours = [];
  }
}

module.exports = Cell;
