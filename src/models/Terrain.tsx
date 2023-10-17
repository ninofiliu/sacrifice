import { useTexture } from "@react-three/drei";
import type { ReactNode } from "react";

import { FOG, TREADMILL_SPEED } from "../consts";
import { useSwitches, useTime } from "../ddj";
import { mod } from "../shorts";

const Treadmill = ({ children }: { children: ReactNode }) => {
  const time = useTime("left");
  const z = mod(-time * TREADMILL_SPEED, FOG);
  return (
    <>
      <group position={[0, 0, z - 1.5 * FOG]}>{children}</group>
      <group position={[0, 0, z - 0.5 * FOG]}>{children}</group>
      <group position={[0, 0, z + 0.5 * FOG]}>{children}</group>
    </>
  );
};

const TerrainPart = () => {
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

  const switches = useSwitches();

  return Array(n)
    .fill(null)
    .map((_, i) => (
      <group key={i} position={[0, 0, ((i + 0.5) * FOG) / n]}>
        {[-1, 0, 1].map((ix) => (
          <group key={ix} position={[(ix * FOG) / n, 0, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[FOG / n, FOG / n, 100, 100]} />
              {switches.leftPad4 ? (
                <meshStandardMaterial
                  {...mudCrackedMaps}
                  displacementScale={0.1}
                  displacementBias={-0.2}
                  wireframe={switches.leftPad5}
                />
              ) : (
                <meshStandardMaterial
                  {...forestGroundMaps}
                  displacementScale={3}
                  displacementBias={-0.5}
                  wireframe={switches.leftPad5}
                />
              )}
            </mesh>
          </group>
        ))}
      </group>
    ));
};

export const Terrain = () => (
  <Treadmill>
    <TerrainPart />
  </Treadmill>
);
