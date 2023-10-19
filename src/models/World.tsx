import { Environment } from "@react-three/drei";

import { Cam } from "../Cam";
import { AdamRunning } from "./AdamRunning";
import { Terrain } from "./Terrain";
import { Trees } from "./Trees";
import { Wolf } from "./Wolf";

export const World = () => {
  return (
    <>
      <AdamRunning position={[1, 0, 0]} />
      <Wolf position={[-1, 0, 0]} scale={2} />
      <Trees />
      <Terrain />

      <ambientLight />
      <Environment preset="forest" />

      <Cam />
    </>
  );
};
