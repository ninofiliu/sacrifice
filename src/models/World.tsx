import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { ReactNode } from "react";
import { useState } from "react";

import { knobs } from "../ddj";
import { rf, rp } from "../shorts";
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

const Treaded = ({
  xMin,
  xMax,
  children,
}: {
  xMin: number;
  xMax: number;
  children: ReactNode;
}) => {
  const [x, setX] = useState(rf(xMin, xMax) * rp([-1, 1]));
  const [z, setZ] = useState(rf(FOG, 3 * FOG));
  const [ry, setRy] = useState(rf(0, Math.PI));
  useFrame((_, delta) => {
    if (z < -FOG) {
      setX(rf(xMin, xMax) * rp([-1, 1]));
      setZ(rf(FOG, 2 * FOG));
      setRy(rf(0, Math.PI));
    } else {
      setZ(z - delta * knobs.leftTempo * TREADMILL_SPEED);
    }
  });
  return (
    <group position={[x, 0, z]} rotation={[0, ry, 0]}>
      {children}
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
          <Treaded key={i} xMin={4} xMax={15}>
            <Oak1 />
          </Treaded>
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
