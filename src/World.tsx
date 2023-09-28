import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import type { ReactNode } from "react";
import { useState } from "react";

import { AdamRunning } from "./AdamRunning";
import { Post } from "./Post";

const TREADMILL_SPEED = 5;
const TREADMILL_LENGTH = 30;

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
      <mesh
        key={i}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, ((i + 0.5) * TREADMILL_LENGTH) / n]}
      >
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
          <meshStandardMaterial {...mudCrackedMaps} displacementScale={0.1} />
        )}
      </mesh>
    ));
};

const Treadmill = ({ children }: { children: ReactNode }) => {
  const [z, setZ] = useState(0);
  useFrame((_, delta) => {
    setZ((z + delta * TREADMILL_SPEED) % TREADMILL_LENGTH);
  });
  return (
    <>
      <group position={[0, 0, -z - TREADMILL_LENGTH]}>{children}</group>
      <group position={[0, 0, -z]}>{children}</group>
      <group position={[0, 0, -z + TREADMILL_LENGTH]}>{children}</group>
    </>
  );
};

export const World = () => {
  return (
    <>
      <AdamRunning />
      <Treadmill>
        <Terrain />
      </Treadmill>

      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} intensity={2} />
      <fog attach="fog" color="grey" near={1} far={25} />
      <Environment preset="forest" />
      <color attach="background" args={["grey"]} />
      <EffectComposer>
        <Post param={0.9} />
      </EffectComposer>

      <OrbitControls />
      <axesHelper />
    </>
  );
};
