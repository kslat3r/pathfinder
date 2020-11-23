const config = require('./config');

const Canvas = require('./lib/Canvas');
const Grid = require('./lib/Grid');
const Events = require('./lib/Events');

const AStarAlgorithm = require('./lib/AStarAlgorithm');
const AStarReduceAlgorithm = require('./lib/AStarReduceAlgorithm');

const canvas = new Canvas('canvas', config.gridHeight, config.gridWidth, config.cellHeight, config.cellWidth);
const grid = new Grid(canvas, config.gridHeight, config.gridWidth, config.cellHeight, config.cellWidth, config.closedChance, config.openColour, config.closedColour);

const aStar = new AStarAlgorithm(canvas, grid, config.timeout, config.cellHeight, config.cellWidth, config.validColour, config.invalidColour, config.pathColour);
const aStarReduce = new AStarReduceAlgorithm(canvas, grid, config.timeout, config.cellHeight, config.cellWidth, config.validColour, config.invalidColour, config.pathColour);

new Events(canvas, grid, [aStar, aStarReduce]);
