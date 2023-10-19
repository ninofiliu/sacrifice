const logFps = false;

if (logFps) {
  let fps = 0;
  const loop = () => {
    fps++;
    requestAnimationFrame(loop);
  };
  loop();
  setInterval(() => {
    console.log("fps", fps);
    fps = 0;
  }, 1000);
}
