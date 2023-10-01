import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";

import { height, width } from "./consts";
import { startMosh } from "./mosh";
import { World } from "./World";

export const App = () => {
  const [src, setSrc] = useState<HTMLCanvasElement | null>(null);
  const [dst, setDst] = useState<HTMLCanvasElement | null>(null);
  const started = useRef(false);

  if (!started.current && src && dst) {
    started.current = true;
    startMosh(src, dst);
  }

  return (
    <>
      <div style={{ width: width + "px", height: height + "px" }}>
        <Canvas ref={setSrc} gl={{ preserveDrawingBuffer: true }}>
          <World />
        </Canvas>
      </div>
      <canvas ref={setDst} width={width} height={height} />
    </>
  );
};
