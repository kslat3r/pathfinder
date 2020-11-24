class Events {
  constructor (canvas, grid, algorithms) {
    this.canvas = canvas;
    this.grid = grid;
    this.algorithms = algorithms;
    this.algorithm = algorithms[0];

    this.grid.draw();
    this.algorithm.start();

    this.bind();
  }

  bind () {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelector('#algorithm').addEventListener('change', () => {
        this.reset();
        this.start();
      });
    });
  }

  reset() {
    this.grid.reset();

    this.algorithms.forEach(algorithm => {
      algorithm.stop();
      algorithm.reset()
    });
  }

  start () {
    this.grid.draw();

    this.algorithm = this.algorithms.find(algorithm => algorithm.constructor.name === document.getElementById('algorithm').value);
    this.algorithm.start();
  }
}

module.exports = Events;
