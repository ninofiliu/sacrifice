export const startMosh = (src: HTMLCanvasElement, dst: HTMLCanvasElement) => {
  const ctx = dst.getContext("2d")!;

  const loop = () => {
    ctx.drawImage(src, 0, 0);
    requestAnimationFrame(loop);
  };
  loop();
};
