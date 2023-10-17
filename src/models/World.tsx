import { Environment } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

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

      <ambientLight intensity={1} />
      <Environment preset="forest" />

      <EffectComposer>
        <Bloom luminanceThreshold={100} />
      </EffectComposer>

      <Cam />
    </>
  );
};
