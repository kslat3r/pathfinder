class AStar {
    constructor(canvas, grid, timeout, cellHeight, cellWidth, setOpenColour, setClosedColour, pathColour) {
      this.canvas = canvas;
      this.grid = grid;
      this.timeout = timeout;

      this.cellHeight = cellHeight;
      this.cellWidth = cellWidth;

      this.setOpenColour = setOpenColour;
      this.setClosedColour = setClosedColour;
      this.pathColour = pathColour;

      const start = this.grid.cells[0][0];

      this.current = start;
      this.openSet = [start];
      this.closedSet = [];
      this.end = this.grid.cells[this.grid.cells.length - 1][this.grid.cells[0].length - 1];
    }

    init () {
      // add neighbours

      for (let i = 0; i < this.grid.height; i++) {
        for (let j = 0; j < this.grid.width; j++) {
          let cell = this.grid.cells[i][j];

          let above = this.grid.cells[i - 1] && this.grid.cells[i - 1][j] ? this.grid.cells[i - 1][j] : null;
          let below = this.grid.cells[i + 1] && this.grid.cells[i + 1][j] ? this.grid.cells[i + 1][j] : null;
          let left = this.grid.cells[i] && this.grid.cells[i][j - 1] ? this.grid.cells[i][j - 1] : null;
          let right = this.grid.cells[i] && this.grid.cells[i][j + 1] ? this.grid.cells[i][j + 1] : null;

          // above

          if (above && above.open) {
            cell.neighbours.push(above);
          }

          // below

          if (below && below.open) {
            cell.neighbours.push(below);
          }

          // left

          if (left && left.open) {
            cell.neighbours.push(left);
          }

          // right

          if (right && right.open) {
            cell.neighbours.push(right);
          }
        }
      }

      // iterate

      this.interval = setInterval(() => {
        this.calculate();
        this.draw();
      }, this.timeout);
    }

    calculate () {
      // are there available options?

      if (this.openSet.length === 0) {
        alert('No solution');
        clearTimeout(this.interval);

        return;
      }

      // find next most fittest cell

      this.current = this.openSet.reduce((previous, current) => previous.fitness < current.fitness ? previous : current);

      // have we reached the end?

      if (this.current === this.end) {
        clearTimeout(this.interval);

        return;
      }

      // this cell is not the end

      this.closedSet.push(this.current);
      this.openSet = this.openSet.filter(item => item !== this.current);

      // for each of the cells neighbours

      for (const neighbour of this.current.neighbours) {
        // if it is inaccesible, skip

        if (this.closedSet.includes(neighbour)) {
          continue;
        }

        // it is one further from the starting cell

        const costFromStart = this.current.costFromStart + 1;

        // recalculate cost from start

        if (this.openSet.includes(neighbour)) {
          if (costFromStart < neighbour.costFromStart) {
            neighbour.costFromStart = costFromStart
          }
        } else {
          neighbour.costFromStart = costFromStart;
          this.openSet.push(neighbour);
        }

        // recalculate cost to end

        const distx = neighbour.x - this.end.x;
        const disty = neighbour.y - this.end.y;

        neighbour.costToEnd = Math.abs(distx) + Math.abs(disty);

        // calculate fitness

        neighbour.fitness = neighbour.costFromStart + neighbour.costToEnd;

        // allow drawing of path

        neighbour.previous = this.current;
      }
    }

    draw () {
      // draw closed cells

      for (const cell of this.closedSet) {
        this.canvas.context.fillStyle = this.setClosedColour;
        this.canvas.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);
      }

      // draw open cells

      for (const cell of this.openSet) {
        this.canvas.context.fillStyle = this.setOpenColour;
        this.canvas.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);
      }

      // draw path

      let current = this.current;
      const path = [current];

      while (current.previous) {
        path.push(current.previous);
        current = current.previous;
      }

      for (const cell of path) {
        this.canvas.context.fillStyle = this.pathColour;
        this.canvas.context.fillRect(cell.x * this.cellWidth, cell.y * this.cellHeight, this.cellWidth, this.cellHeight);
      }
    }
  }

  module.exports = AStar;
