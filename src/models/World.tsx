import { Environment } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { ReactNode } from "react";
import { useRef } from "react";

import { Cam } from "../Cam";
import { FOG, TREADMILL_SPEED } from "../consts";
import { useTime } from "../ddj";
import { mod, rf, rp } from "../shorts";
import { AdamRunning } from "./AdamRunning";
import { Terrain } from "./Terrain";
import { Oak1 } from "./trees";
import { Wolf } from "./Wolf";

const Treadmill = ({ children }: { children: ReactNode }) => {
  const time = useTime("left");
  const z = mod(-time * TREADMILL_SPEED, FOG);
  return (
    <>
      <group position={[0, 0, z - 1.5 * FOG]}>{children}</group>
      <group position={[0, 0, z - 0.5 * FOG]}>{children}</group>
      <group position={[0, 0, z + 0.5 * FOG]}>{children}</group>
    </>
  );
};

const Tree = ({ xMin, xMax }: { xMin: number; xMax: number }) => {
  const x = useRef(rf(xMin, xMax) * rp([-1, 1]));
  const ry = useRef(rf(0, Math.PI));
  const z0 = useRef(rf(0, 2 * FOG));
  const time = useTime("left");
  const z = mod(z0.current - time * TREADMILL_SPEED, 2 * FOG) - FOG;
  return (
    <group position={[x.current, 0, z]} rotation={[0, ry.current, 0]}>
      <Oak1 />
    </group>
  );
};

export const World = () => {
  return (
    <>
      <AdamRunning position={[1, 0, 0]} />
      <Wolf position={[-1, 0, 0]} scale={2} />

      {Array(10)
        .fill(null)
        .map((_, i) => (
          <Tree key={i} xMin={4} xMax={15} />
        ))}
      <Treadmill>
        <Terrain />
      </Treadmill>

      <ambientLight intensity={1} />
      <Environment preset="forest" />

      <EffectComposer>
        <Bloom luminanceThreshold={100} />
      </EffectComposer>

      <Cam />
      <axesHelper />
    </>
  );
};
