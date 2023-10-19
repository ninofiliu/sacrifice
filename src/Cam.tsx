import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { knobs } from "./ddj";
import { objEach, objMap } from "./shorts";

const initPosition = new THREE.Vector3(0, 1, -5);

const positions = {
  leftHi: new THREE.Vector3(-0.06, 0.74, 1.99),
  leftMid: new THREE.Vector3(0.49, 1.11, -0.58),
  leftBass: new THREE.Vector3(-0.18, 0.64, -1.06),
  leftFx: new THREE.Vector3(-1.27, -1.05, -2.23),
  rightHi: new THREE.Vector3(-0.52, -0.21, 0.04),
  rightMid: new THREE.Vector3(0.05, -0.17, -0.13),
  rightBass: new THREE.Vector3(1.58, -0.28, -0.44),
  rightFx: new THREE.Vector3(-1.71, 0.4, 1.19),
} as const;

const positionOffsets = objMap(positions, (_, v) =>
  v.clone().sub(initPosition)
);

const initLookAt = new THREE.Vector3(0, 1, -4);

const lookAts = {
  leftHi: new THREE.Vector3(-0.06, 0.74, 0.99),
  leftMid: new THREE.Vector3(1.23, 1.17, 0.09),
  leftBass: new THREE.Vector3(-0.89, 0.48, -0.37),
  leftFx: new THREE.Vector3(-0.83, -0.33, -1.7),
  rightHi: new THREE.Vector3(-1.19, 0.45, 0.37),
  rightMid: new THREE.Vector3(0.7, 0.45, 0.31),
  rightBass: new THREE.Vector3(0.92, 0.24, 0.11),
  rightFx: new THREE.Vector3(-0.85, 0.56, 0.7),
} as const;

const lookAtOffsets = objMap(lookAts, (_, v) => v.clone().sub(initLookAt));

export const Cam = () => {
  const cam = useRef<THREE.PerspectiveCamera | null>(null);
  const [zoom, setZoom] = useState(1);

  useFrame(() => {
    if (!cam.current) return;
    const nextPosition = initPosition.clone();
    const nextLookAt = initLookAt.clone();

    objEach(positionOffsets, (k, v) =>
      nextPosition.addScaledVector(v, -1 + 2 * knobs[k])
    );
    objEach(lookAtOffsets, (k, v) =>
      nextLookAt.addScaledVector(v, -1 + 2 * knobs[k])
    );

    nextPosition.x *= -1 + 2 * knobs.crossfader;
    nextLookAt.x *= -1 + 2 * knobs.crossfader;

    cam.current.position.set(nextPosition.x, nextPosition.y, nextPosition.z);
    cam.current.lookAt(nextLookAt);
    setZoom(3 + (0.2 - 3) * knobs.leftVolume);
  });

  return <PerspectiveCamera ref={cam} makeDefault zoom={zoom} />;
};

export const DebugCam = () => {
  const controls = useRef<OrbitControlsImpl>(null);
  useFrame(() => {
    if (!controls.current) return;
    const obj = controls.current.object;
    const dir = new THREE.Vector3();
    obj.getWorldDirection(dir);
    const lookAt = obj.position.clone().add(dir);
    console.log(
      `new THREE.Vector3(${obj.position.x.toFixed(2)},${obj.position.y.toFixed(
        2
      )},${obj.position.z.toFixed(2)})`,
      `new THREE.Vector3(${lookAt.x.toFixed(2)},${lookAt.y.toFixed(
        2
      )},${lookAt.z.toFixed(2)})`
    );
  });

  return <OrbitControls ref={controls} />;
};
