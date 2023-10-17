import { useFrame } from "@react-three/fiber";
import { useState } from "react";

import { JOG_SENSITIVITY } from "./consts";
import { objEach, objMap, x } from "./shorts";
import type { Lat } from "./types";

const buttonsMap = {
  leftPlay: [144, 11],
  leftCue: [144, 12],
  rightPlay: [144, 11],
  rightCue: [144, 12],
} as const;

export const buttons = objMap(buttonsMap, () => false);

const knobsMap = {
  leftTempo: [176, 0],
  leftHi: [176, 7],
  leftMid: [176, 11],
  leftBass: [176, 15],
  leftFx: [182, 23],
  leftVolume: [176, 19],
  rightTempo: [177, 0],
  rightHi: [177, 7],
  rightMid: [177, 11],
  rightBass: [177, 15],
  rightFx: [182, 24],
  rightVolume: [177, 19],
} as const;

export const knobs = objMap(knobsMap, () => 0.5);

const offsetsMap = {
  left: [176, 33],
  right: [177, 33],
} as const;
const offsets = objMap(offsetsMap, () => 0.5);
const times = {
  left: 0,
  right: 0,
} as Record<Lat, number>;
const loop = () => {
  times.left += (1 / 60) * knobs.leftTempo;
  times.right += (1 / 60) * knobs.rightTempo;
  requestAnimationFrame(loop);
};
loop();
export const getTime = (lat: Lat) =>
  times[lat] + JOG_SENSITIVITY * offsets[lat];
export const useTime = (lat: Lat) => {
  const [time, setTime] = useState(0);
  useFrame(() => {
    setTime(getTime(lat));
  });
  return time;
};

(async () => {
  console.log("[MIDI] requestig access...");
  const access = await navigator.requestMIDIAccess();
  console.log("[MIDI] finding input...");
  const input = x(
    [...access.inputs.values()].find((e) =>
      // DDJ-200 on windows
      // DDJ-200 MIDI 1
      e.name?.includes("DDJ-200")
    )
  );
  input.addEventListener("midimessage", (evt) => {
    console.log("[MIDI] event", ...evt.data);
    const [a, b, c] = evt.data;

    objEach(buttonsMap, (k, [aa, bb]) => {
      if (!(a === aa && b === bb)) return;
      if (c === 0) buttons[k] = false;
      if (c === 127) buttons[k] = true;
    });

    objEach(knobsMap, (k, [aa, bb]) => {
      if (!(a === aa && b === bb)) return;
      knobs[k] = c / 127;
    });

    objEach(offsetsMap, (k, [aa, bb]) => {
      if (!(a === aa && b === bb)) return;
      offsets[k] += c === 63 ? -1 : 1;
    });
  });
})();
