import { Environment, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ReactNode } from "react";
import { useState } from "react";

import { AdamRunning } from "./AdamRunning";

const TREADMILL_SPEED = 6;
const TREADMILL_LENGTH = 30;

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
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, TREADMILL_LENGTH / 2]}
        >
          <planeGeometry args={[1, TREADMILL_LENGTH, 1, 1]} />
          <meshBasicMaterial wireframe />
        </mesh>
      </Treadmill>

      <ambientLight />
      <fog attach="fog" color="grey" near={1} far={25} />
      <Environment preset="forest" />
      <color attach="background" args={["grey"]} />

      <OrbitControls />
      <axesHelper />
    </>
  );
};
