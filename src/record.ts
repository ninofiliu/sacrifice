export const setupRecord = (canvas: HTMLCanvasElement) => {
  const recorder = new MediaRecorder(canvas.captureStream(30), {
    bitsPerSecond: 510_000,
  });
  recorder.addEventListener("dataavailable", (evt) => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(evt.data);
    a.download = `Sacrifice_${new Date().toISOString()}.webm`;
    a.click();
  });

  document.addEventListener("keypress", (evt) => {
    if (evt.key !== "r") return;
    switch (recorder.state) {
      case "inactive":
        console.log("starting record");
        recorder.start();
        break;
      case "recording":
        console.log("ending record");
        recorder.stop();
        break;
      case "paused":
        throw new Error("recorder should not be paused");
    }
  });
};
