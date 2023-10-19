const logFps = true;

if (logFps) {
  let fps = 0;
  const loop = () => {
    fps++;
    requestAnimationFrame(loop);
  };
  loop();
  setInterval(() => {
    console.log(`fps=${fps}, t=${~~(1000 / fps)}ms`);
    fps = 0;
  }, 1000);
}
