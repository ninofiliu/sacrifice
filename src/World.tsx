import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import type { SkinnedMesh } from "three";
import type { GLTF } from "three-stdlib";

export const World = () => {
  const group = useRef();
  const { nodes, animations } = useGLTF("/mine.glb") as GLTF & {
    nodes: Record<string, SkinnedMesh>;
  };
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions["Armature|mixamo.com|Layer0"]?.play();
  }, [actions]);
  return (
    <>
      <group ref={group} dispose={null}>
        <group name="Scene">
          <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={nodes.Cube.material}
              skeleton={nodes.Cube.skeleton}
            />
          </group>
        </group>
      </group>
      <OrbitControls />
      <ambientLight />
      <axesHelper />
    </>
  );
};
