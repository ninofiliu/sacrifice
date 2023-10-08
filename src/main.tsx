import "./main.css";

import { createRoot, extend } from "@react-three/fiber";
import * as THREE from "three";

import { height, width } from "./consts";
import { startMosh } from "./mosh";
import { World } from "./models/World";

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

startMosh(src, dst);

document.body.append(src, dst);
