class Cell {
  constructor(x, y, chance) {
    this.x = x;
    this.y = y;
    this.open = Math.random() > chance ? true : false;
  }
}

module.exports = Cell;
