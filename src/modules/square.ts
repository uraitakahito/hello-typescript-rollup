/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-param-reassign */
const name = 'square';

const draw = (ctx: CanvasRenderingContext2D, length: number, x: number, y: number, color: string) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length,
    x,
    y,
    color,
  };
};

const random = (min: number, max: number) => {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
};

const reportArea = (length: number, listId: string) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${name} area is ${length * length}px squared.`;

  const list = document.getElementById(listId);
  list?.appendChild(listItem);
};

const reportPerimeter = (length: number, listId: string) => {
  const listItem = document.createElement('li');
  listItem.textContent = `${name} perimeter is ${length * 4}px.`;

  const list = document.getElementById(listId);
  list?.appendChild(listItem);
};

const randomSquare = (ctx: CanvasRenderingContext2D) => {
  const color1 = random(0, 255);
  const color2 = random(0, 255);
  const color3 = random(0, 255);
  const color = `rgb(${color1},${color2},${color3})`;
  ctx.fillStyle = color;

  const x = random(0, 480);
  const y = random(0, 320);
  const length = random(10, 100);
  ctx.fillRect(x, y, length, length);

  return {
    length,
    x,
    y,
    color,
  };
};

export {
  name, draw, reportArea, reportPerimeter,
};
export default randomSquare;
