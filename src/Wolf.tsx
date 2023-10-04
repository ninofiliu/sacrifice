import { useAnimations, useGLTF } from "@react-three/drei";
import type { GroupProps } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group, Material, Object3DEventMap, SkinnedMesh } from "three";
import type { GLTF } from "three-stdlib";

useGLTF.preload("/Wolf.glb");

export const Wolf = (props: Omit<GroupProps, "ref" | "dispose">) => {
  const group = useRef<Group<Object3DEventMap>>(null!);
  const { nodes, materials, animations } = useGLTF("/Wolf.glb") as GLTF & {
    nodes: Record<string, SkinnedMesh>;
    materials: Record<string, Material>;
  };
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions["01_Run"]?.play();
  }, [actions]);
  return (
    <group {...props} ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature_0">
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            name="Wolf1_Material__wolf_col_tga_0"
            geometry={nodes.Wolf1_Material__wolf_col_tga_0.geometry}
            material={materials.Wolf_1}
            skeleton={nodes.Wolf1_Material__wolf_col_tga_0.skeleton}
          />
          <skinnedMesh
            name="Wolf2_fur__fella3_jpg_001_0"
            geometry={nodes.Wolf2_fur__fella3_jpg_001_0.geometry}
            material={materials.Wolf_Fur}
            skeleton={nodes.Wolf2_fur__fella3_jpg_001_0.skeleton}
          />
          <skinnedMesh
            name="Wolf3_claws_0"
            geometry={nodes.Wolf3_claws_0.geometry}
            material={materials.Wolf_claws}
            skeleton={nodes.Wolf3_claws_0.skeleton}
          />
          <skinnedMesh
            name="Wolf3_eyes_0"
            geometry={nodes.Wolf3_eyes_0.geometry}
            material={materials["Wolf Eyes"]}
            skeleton={nodes.Wolf3_eyes_0.skeleton}
          />
          <skinnedMesh
            name="Wolf3_teeth"
            geometry={nodes.Wolf3_teeth.geometry}
            material={materials["Wolf Teeth"]}
            skeleton={nodes.Wolf3_teeth.skeleton}
          />
        </group>
      </group>
    </group>
  );
};
