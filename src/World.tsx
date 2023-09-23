import { Environment } from "@react-three/drei";

export const World = () => {
  return (
    <>
      <mesh>
        <boxGeometry args={[10, 10, 10, 10, 10, 10]} />
        <meshBasicMaterial wireframe />
      </mesh>
      <Environment preset="forest" background />
      <axesHelper />
    </>
  );
};
