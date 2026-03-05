// https://github.com/mdn/js-examples/tree/main/module-examples/basic-modules
import { create, createReportList } from './modules/canvas';
import randomSquare, {
  draw, reportArea, reportPerimeter,
} from './modules/square';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Failed to get root element');
}

const myCanvas = create('myCanvas', root, 480, 320);
const reportList = createReportList(myCanvas.id);

if (!myCanvas.ctx) {
  throw new Error('Failed to get 2d context');
}

const square1 = draw(myCanvas.ctx, 50, 50, 100, 'blue');
reportArea(square1.length, reportList);
reportPerimeter(square1.length, reportList);

// Use the default
randomSquare(myCanvas.ctx);
