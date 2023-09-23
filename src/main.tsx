import "./main.css";

import { Canvas } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Canvas>
      <mesh>
        <boxGeometry args={[10, 10, 10, 10, 10, 10]} />
        <meshBasicMaterial wireframe />
      </mesh>
    </Canvas>
  </React.StrictMode>
);
