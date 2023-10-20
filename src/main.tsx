import "./main.css";
import "./logFps";

import { createRoot, extend } from "@react-three/fiber";
import * as THREE from "three";

import { height, width } from "./consts";
import { World } from "./models/World";
import { setupRecord } from "./record";
import { x } from "./shorts";

extend(THREE);

const src = document.createElement("canvas");
const root = createRoot(src);
root.configure({
  size: { width, height, top: 0, left: 0 },
  gl: { preserveDrawingBuffer: true },
});
root.render(<World />);

const dst = document.createElement("canvas");
dst.width = width;
dst.height = height;
document.body.append(src, dst);

const ctx = x(dst.getContext("2d"));
const loop = () => {
  ctx.drawImage(src, 0, 0);
  requestAnimationFrame(loop);
};
loop();

setupRecord(dst);
