import "./main.css";

import { Canvas } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";

import { World } from "./World";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Canvas>
      <World />
    </Canvas>
  </React.StrictMode>
);
