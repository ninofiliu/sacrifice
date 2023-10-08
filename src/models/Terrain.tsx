import { useTexture } from "@react-three/drei";

import { FOG } from "../consts";

export const Terrain = () => {
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
  return Array(n)
    .fill(null)
    .map((_, i) => (
      <group key={i} position={[0, 0, ((i + 0.5) * FOG) / n]}>
        {[-1, 0, 1].map((ix) => (
          <group key={ix} position={[(ix * FOG) / n, 0, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[FOG / n, FOG / n, 100, 100]} />
              {Math.random() < 1 ? (
                <meshStandardMaterial
                  {...forestGroundMaps}
                  displacementScale={3}
                  displacementBias={-0.5}
                />
              ) : (
                <meshStandardMaterial
                  {...mudCrackedMaps}
                  displacementScale={0.1}
                />
              )}
            </mesh>
          </group>
        ))}
      </group>
    ));
};
