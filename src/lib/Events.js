class Events {
  constructor (canvas, grid, algorithms) {
    this.canvas = canvas;
    this.grid = grid;
    this.algorithms = algorithms;
    this.algorithm = null;

    this.bind();
  }

  bind () {
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('start').addEventListener('click', () => {
        this.reset();
        this.start();
      });

      document.getElementById('resume').addEventListener('click', () => {
        this.resume();
      });

      document.getElementById('stop').addEventListener('click', () => {
        this.stop();
      });
    });
  }

  start () {
    this.algorithm = this.algorithms.find(algorithm => algorithm.constructor.name === document.getElementById('algorithm').value);

    this.grid.draw();
    this.algorithm.start();
  }

  resume () {
    if (this.algorithm) {
      this.algorithm.start();
    }
  }

  stop () {
    this.algorithm.stop();
  }

  reset() {
    this.grid.reset();
    this.algorithms.forEach(algorithm => algorithm.reset());
  }
}

module.exports = Events;
