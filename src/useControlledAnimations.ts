import { useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import type { AnimationClip, Group, Object3DEventMap } from "three";

import { getTime, knobs } from "./ddj";
import { mod } from "./shorts";
import type { Lat } from "./types";

export const useControlledAnimations = (
  animations: AnimationClip[],
  group: React.MutableRefObject<Group<Object3DEventMap>>,
  lat: Lat,
  name: string
) => {
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    const action = actions[name];
    if (action) action.play();
  }, [actions, name]);
  useFrame(() => {
    const action = actions[name];
    if (action) {
      const time = getTime(lat);
      action.timeScale = knobs.leftTempo;
      action.time = mod(time, action.getClip().duration);
    }
  });
};
