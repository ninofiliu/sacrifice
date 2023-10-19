import { useGLTF } from "@react-three/drei";
import { useAnimations } from "@react-three/drei";
import { type GroupProps, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useEffect } from "react";
import type { Group, Material, Object3DEventMap, SkinnedMesh } from "three";
import type { GLTF } from "three-stdlib";

import { knobs, useSwitches } from "../ddj";

useGLTF.preload("/AdamRunning.glb");

export const AdamRunning = (props: Omit<GroupProps, "ref" | "dispose">) => {
  const group = useRef<Group<Object3DEventMap>>(null!);
  const { nodes, materials, animations } = useGLTF(
    "/AdamRunning.glb"
  ) as GLTF & {
    nodes: Record<string, SkinnedMesh>;
    materials: Record<string, Material>;
  };

  const { actions } = useAnimations(animations, group);
  const action = actions["Armature|mixamo.com|Layer0"];
  useEffect(() => {
    if (!action) return;
    action.play();
  }, [action]);
  useFrame(() => {
    if (!action) return;
    action.timeScale = knobs.leftTempo;
  });

  const switches = useSwitches();

  return (
    <group {...props} ref={group} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorig7Hips} />
          <skinnedMesh
            name="Ch08_Beard"
            geometry={nodes.Ch08_Beard.geometry}
            skeleton={nodes.Ch08_Beard.skeleton}
          >
            {switches.leftPad0 ? (
              <meshBasicMaterial color="black" />
            ) : (
              <primitive object={materials.Ch08_hair} />
            )}
          </skinnedMesh>
          <skinnedMesh
            name="Ch08_Body"
            geometry={nodes.Ch08_Body.geometry}
            skeleton={nodes.Ch08_Body.skeleton}
          >
            {switches.leftPad0 ? (
              <meshBasicMaterial color="black" />
            ) : (
              <primitive object={materials.Ch08_body} />
            )}
          </skinnedMesh>
          <skinnedMesh
            name="Ch08_Eyelashes"
            geometry={nodes.Ch08_Eyelashes.geometry}
            material={materials.Ch08_hair}
            skeleton={nodes.Ch08_Eyelashes.skeleton}
          />
          <skinnedMesh
            name="Ch08_Hair"
            geometry={nodes.Ch08_Hair.geometry}
            skeleton={nodes.Ch08_Hair.skeleton}
          >
            {switches.leftPad0 ? (
              <meshBasicMaterial color="black" />
            ) : (
              <primitive object={materials.Ch08_hair} />
            )}
          </skinnedMesh>
          <skinnedMesh
            name="Ch08_Hoodie"
            geometry={nodes.Ch08_Hoodie.geometry}
            skeleton={nodes.Ch08_Hoodie.skeleton}
          >
            {switches.leftPad1 ? (
              <meshBasicMaterial color="white" wireframe />
            ) : (
              <primitive object={materials.Ch08_body1} />
            )}
          </skinnedMesh>
          <skinnedMesh
            name="Ch08_Pants"
            geometry={nodes.Ch08_Pants.geometry}
            material={materials.Ch08_body1}
            skeleton={nodes.Ch08_Pants.skeleton}
          >
            {switches.leftPad2 ? (
              <meshBasicMaterial color="white" wireframe />
            ) : (
              <primitive object={materials.Ch08_body1} />
            )}
          </skinnedMesh>
          <skinnedMesh
            name="Ch08_Sneakers"
            geometry={nodes.Ch08_Sneakers.geometry}
            material={materials.Ch08_body1}
            skeleton={nodes.Ch08_Sneakers.skeleton}
          >
            {switches.leftPad3 ? (
              <meshBasicMaterial color="white" wireframe />
            ) : (
              <primitive object={materials.Ch08_body1} />
            )}
          </skinnedMesh>
        </group>
      </group>
    </group>
  );
};
