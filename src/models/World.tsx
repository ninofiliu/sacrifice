import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

import { knobs, useTime } from "../ddj";
import { mod, rf, rp } from "../shorts";
import { AdamRunning } from "./AdamRunning";
import { Oak1 } from "./trees";
import { Wolf } from "./Wolf";

const TREADMILL_SPEED = 5;
const TREADMILL_LENGTH = 30;
const FOG = 25;

const Terrain = () => {
  const n = 3;
  const forestGroundMaps = useTexture({
    map: "/textures/forest_ground_04_diff_2k.jpg",
    aoMap: "/textures/forest_ground_04_ao_2k.jpg",
    displacementMap: "/textures/forest_ground_04_disp_2k.jpg",
    roughnessMap: "/textures/forest_ground_04_rough_2k.jpg",
    normalMap: "/textures/forest_ground_04_nor_dx_2k.jpg",
  });
  const mudCrackedMaps = useTexture({
    map: "/textures/mud_cracked_dry_03_diff_2k.jpg",
    aoMap: "/textures/mud_cracked_dry_03_ao_2k.jpg",
    displacementMap: "/textures/mud_cracked_dry_03_disp_2k.jpg",
    roughnessMap: "/textures/mud_cracked_dry_03_rough_2k.jpg",
    normalMap: "/textures/mud_cracked_dry_03_nor_dx_2k.jpg",
  });
  return Array(n)
    .fill(null)
    .map((_, i) => (
      <group key={i} position={[0, 0, ((i + 0.5) * TREADMILL_LENGTH) / n]}>
        {[-1, 0, 1].map((ix) => (
          <group key={ix} position={[(ix * TREADMILL_LENGTH) / n, 0, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry
                args={[TREADMILL_LENGTH / n, TREADMILL_LENGTH / n, 100, 100]}
              />
              {Math.random() < 1 ? (
                <meshStandardMaterial
                  {...forestGroundMaps}
                  displacementScale={3}
                  displacementBias={-0.5}
                />
              ) : (
                <meshStandardMaterial
                  {...mudCrackedMaps}
                  displacementScale={0.1}
                />
              )}
            </mesh>
          </group>
        ))}
      </group>
    ));
};

const Treadmill = ({ children }: { children: ReactNode }) => {
  const [z, setZ] = useState(0);
  useFrame((_, delta) => {
    setZ((z + delta * knobs.rightTempo * TREADMILL_SPEED) % TREADMILL_LENGTH);
  });
  return (
    <>
      <group position={[0, 0, -z - TREADMILL_LENGTH]}>{children}</group>
      <group position={[0, 0, -z]}>{children}</group>
      <group position={[0, 0, -z + TREADMILL_LENGTH]}>{children}</group>
    </>
  );
};

const Tree = ({ xMin, xMax }: { xMin: number; xMax: number }) => {
  const x = useRef(rf(xMin, xMax) * rp([-1, 1]));
  const ry = useRef(rf(0, Math.PI));
  const z0 = useRef(rf(0, 2 * FOG));
  const time = useTime("left");
  const z = mod(z0.current - time * 10, 2 * FOG) - FOG;
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

      <OrbitControls />
      <axesHelper />
    </>
  );
};
