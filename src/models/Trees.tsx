import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import type { Material, SkinnedMesh } from "three";
import type { GLTF } from "three-stdlib";

import { FOG, TREADMILL_SPEED } from "../consts";
import { useSwitches, useTime } from "../ddj";
import { mod, rf, rp } from "../shorts";

useGLTF.preload("/OaksLight.glb");

const Oak1 = () => {
  const { nodes, materials } = useGLTF("/OaksLight.glb") as GLTF & {
    nodes: Record<string, SkinnedMesh>;
    materials: Record<string, Material>;
  };

  const switches = useSwitches();

  return (
    <group dispose={null} scale={0.15}>
      <mesh geometry={nodes.structure.geometry} rotation={[Math.PI / 2, 0, 0]}>
        {switches.rightPad0 ? (
          <meshBasicMaterial color="black" wireframe />
        ) : (
          <primitive object={materials.bark} />
        )}
      </mesh>
      <mesh geometry={nodes.foliage.geometry} rotation={[Math.PI / 2, 0, 0]}>
        {switches.rightPad1 ? (
          <meshBasicMaterial color="red" wireframe />
        ) : (
          <primitive object={materials.foliage} />
        )}
      </mesh>
    </group>
  );
};

const Tree = ({ xMin, xMax }: { xMin: number; xMax: number }) => {
  const x = useRef(rf(xMin, xMax) * rp([-1, 1]));
  const ry = useRef(rf(0, Math.PI));
  const z0 = useRef(rf(0, 2 * FOG));
  const time = useTime("right");
  const z = mod(z0.current - time * TREADMILL_SPEED, 2 * FOG) - FOG;
  return (
    <group position={[x.current, 0, z]} rotation={[0, ry.current, 0]}>
      <Oak1 />
    </group>
  );
};

export const Trees = () => (
  <>
    {Array(8)
      .fill(null)
      .map((_, i) => (
        <Tree key={i} xMin={8} xMax={15} />
      ))}
  </>
);
