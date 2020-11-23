const AStarAlgorithm = require('./AStarAlgorithm');

class AStarReduceAlgorithm extends AStarAlgorithm {
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
}

module.exports = AStarReduceAlgorithm;
