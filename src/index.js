const config = require('./config');
const Canvas = require('./lib/Canvas');
const Grid = require('./lib/Grid');
const AStar = require('./lib/AStar');

const canvas = new Canvas('canvas');
const grid = new Grid(canvas, config.gridHeight, config.gridWidth, config.cellHeight, config.cellWidth, config.cellClosedChance, config.cellOpenColour, config.cellClosedColour);
const astar = new AStar(canvas, grid, config.timeout, config.cellHeight, config.cellWidth, config.setOpenColour, config.setClosedColour, config.pathColour);

grid.draw();
astar.init();
