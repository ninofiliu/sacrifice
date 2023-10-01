import { height, width } from "./consts";
import { kbd } from "./kbd";

type Shift = {
  [xOffset: number]: {
    [yOffset: number]: {
      x: number;
      y: number;
    };
  };
};

const size = 16;
const shiftOptions = [0, 1, -1, 2, -2, 4, -4, 8, -8];

const getShift = (previous: ImageData, real: ImageData) => {
  const { width, height } = previous;
  const shift: Shift = {};

  for (let xOffset = 0; xOffset < width; xOffset += size) {
    if (!shift[xOffset]) shift[xOffset] = [];
    for (let yOffset = 0; yOffset < height; yOffset += size) {
      if (!shift[xOffset][yOffset])
        shift[xOffset][yOffset] = { x: NaN, y: NaN };

      const xMax = Math.min(xOffset + size, width);
      const yMax = Math.min(yOffset + size, height);

      let minDiff = +Infinity;
      for (const xShift of shiftOptions) {
        for (const yShift of shiftOptions) {
          let diff = 0;

          for (let x = xOffset; x < xMax; x++) {
            for (let y = yOffset; y < yMax; y++) {
              const xsrc = (x + xShift + width) % width;
              const ysrc = (y + yShift + height) % height;
              const isrc = 4 * (width * ysrc + xsrc);
              const idst = 4 * (width * y + x);
              diff += Math.abs(previous.data[isrc + 0] - real.data[idst + 0]);
              diff += Math.abs(previous.data[isrc + 1] - real.data[idst + 1]);
              diff += Math.abs(previous.data[isrc + 2] - real.data[idst + 2]);
            }
          }

          if (diff < minDiff) {
            minDiff = diff;
            shift[xOffset][yOffset].x = xShift;
            shift[xOffset][yOffset].y = yShift;
          }
        }
      }
    }
  }

  return shift;
};

const approximate = (previous: ImageData, shift: Shift): ImageData => {
  const { width, height } = previous;
  const out = new ImageData(width, height);

  for (let i = 3; i < out.data.length; i += 4) {
    out.data[i] = 255;
  }

  for (let xOffset = 0; xOffset < width; xOffset += size) {
    for (let yOffset = 0; yOffset < height; yOffset += size) {
      const xMax = Math.min(xOffset + size, width);
      const yMax = Math.min(yOffset + size, height);

      for (let x = xOffset; x < xMax; x++) {
        for (let y = yOffset; y < yMax; y++) {
          const xsrc = (x + shift[xOffset][yOffset].x + width) % width;
          const ysrc = (y + shift[xOffset][yOffset].y + height) % height;
          const isrc = 4 * (width * ysrc + xsrc);
          const idst = 4 * (width * y + x);
          out.data[idst + 0] = previous.data[isrc + 0];
          out.data[idst + 1] = previous.data[isrc + 1];
          out.data[idst + 2] = previous.data[isrc + 2];
        }
      }
    }
  }

  return out;
};

export const startMosh = (src: HTMLCanvasElement, dst: HTMLCanvasElement) => {
  const ctx = dst.getContext("2d")!;

  let shift: Shift | null = null;

  const loop = () => {
    const prev = ctx.getImageData(0, 0, width, height);
    ctx.drawImage(src, 0, 0);
    const cur = ctx.getImageData(0, 0, width, height);

    if (kbd.Space) {
      if (!shift) {
        shift = getShift(prev, cur);
      }
      const drifted = approximate(prev, shift);
      ctx.putImageData(drifted, 0, 0);
    } else {
      shift = null;
    }
    requestAnimationFrame(loop);
  };
  loop();
};
