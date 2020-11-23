const config = require('./config');

const Canvas = require('./lib/Canvas');
const Grid = require('./lib/Grid');
const Algorithm = require('./lib/AStarAlgorithm');

const canvas = new Canvas('canvas', config.gridHeight, config.gridWidth, config.cellHeight, config.cellWidth);
const grid = new Grid(canvas, config.gridHeight, config.gridWidth, config.cellHeight, config.cellWidth, config.closedChance, config.openColour, config.closedColour);
const algorithm = new Algorithm(canvas, grid, config.timeout, config.cellHeight, config.cellWidth, config.validColour, config.invalidColour, config.pathColour);

grid.draw();
algorithm.start();
