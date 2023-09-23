import { Environment } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export const World = () => {
  return (
    <>
      <mesh>
        <boxGeometry args={[10, 10, 10, 10, 10, 10]} />
        <meshBasicMaterial wireframe />
      </mesh>
      <Environment preset="forest" background />
      <axesHelper />
      <EffectComposer>
        <Bloom />
      </EffectComposer>
    </>
  );
};
