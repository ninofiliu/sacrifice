import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { knobs } from "./ddj";
import { objEach } from "./shorts";

const positions = {
  leftHi: new THREE.Vector3(1, 1, -5),
} as const;

const lookAts = {
  leftHi: new THREE.Vector3(1, 1, -4),
} as const;

export const Cam = () => {
  const cam = useRef<THREE.PerspectiveCamera | null>(null);

  useFrame(() => {
    if (!cam.current) return;
    const nextPosition = new THREE.Vector3(0, 1, -5);
    const nextLookAt = new THREE.Vector3(0, 1, -4);

    objEach(positions, (k, position) => {
      const lookAt = lookAts[k];
      nextPosition.lerp(position, knobs[k]);
      nextLookAt.lerp(lookAt, knobs[k]);
    });

    cam.current.position.set(nextPosition.x, nextPosition.y, nextPosition.z);
    cam.current.lookAt(nextLookAt);
  });

  return <PerspectiveCamera ref={cam} makeDefault />;
};
