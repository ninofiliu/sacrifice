import { Environment, OrbitControls } from "@react-three/drei";

import { AdamRunning } from "./AdamRunning";

const Rocks = () =>
  Array(10)
    .fill(null)
    .map((_, i) => (
      <mesh key={i} position={[0, 0, 4 * i + 2]}>
        <boxGeometry args={[1, 1, 1, 1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    ));

export const World = () => {
  return (
    <>
      <AdamRunning />
      <Rocks />

      <ambientLight />
      <fog attach="fog" color="grey" near={1} far={35} />
      <Environment preset="forest" />
      <color attach="background" args={["grey"]} />

      <OrbitControls />
      <axesHelper />
    </>
  );
};
