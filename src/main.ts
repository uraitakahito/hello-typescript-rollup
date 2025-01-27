// https://github.com/mdn/js-examples/tree/main/module-examples/basic-modules
/* eslint-disable no-magic-numbers */
import { create, createReportList } from './modules/canvas.js';
import randomSquare, {
  draw, reportArea, reportPerimeter,
} from './modules/square.js';

const myCanvas = create('myCanvas', document.body, 480, 320);
const reportList = createReportList(myCanvas.id);

if (!myCanvas.ctx) {
  throw new Error('Failed to get 2d context');
}

const square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);

// Use the default
randomSquare(myCanvas.ctx);
