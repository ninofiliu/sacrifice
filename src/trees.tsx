import { useGLTF } from "@react-three/drei";
import type { Material, SkinnedMesh } from "three";
import type { GLTF } from "three-stdlib";

useGLTF.preload("/oaks.glb");

export function Oak1() {
  const { nodes, materials } = useGLTF("/oaks.glb") as GLTF & {
    nodes: Record<string, SkinnedMesh>;
    materials: Record<string, Material>;
  };
  return (
    <group dispose={null} scale={0.1}>
      <mesh
        geometry={nodes.structure.geometry}
        material={materials.bark}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.foliage.geometry}
        material={materials.foliage}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

export function Oak2() {
  const { nodes, materials } = useGLTF("/oaks.glb") as GLTF & {
    nodes: Record<string, SkinnedMesh>;
    materials: Record<string, Material>;
  };
  return (
    <group dispose={null} scale={0.1}>
      <mesh
        geometry={nodes.structure001.geometry}
        material={materials.bark}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.foliage001.geometry}
        material={materials.foliage}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

export function Oak3() {
  const { nodes, materials } = useGLTF("/oaks.glb") as GLTF & {
    nodes: Record<string, SkinnedMesh>;
    materials: Record<string, Material>;
  };
  return (
    <group dispose={null} scale={0.1}>
      <mesh
        geometry={nodes.structure002.geometry}
        material={materials.bark}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.foliage002.geometry}
        material={materials.foliage}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
