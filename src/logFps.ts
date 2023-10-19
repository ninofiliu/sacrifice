const logFps = true;

if (logFps) {
  let fps = 0;
  const loop = () => {
    fps++;
    requestAnimationFrame(loop);
  };
  loop();
  setInterval(() => {
    const t = ~~(1000 / fps);
    console.log(
      `fps=${fps}, t=${~~(1000 / fps)}ms ${Array(t).fill(".").join("")}`
    );
    fps = 0;
  }, 1000);
}
