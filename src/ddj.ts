import { useFrame } from "@react-three/fiber";
import { useState } from "react";

import { JOG_SENSITIVITY } from "./consts";
import { objEach, objMap, x } from "./shorts";
import type { Lat } from "./types";

const buttonsMap = {
  leftPlay: [144, 11],
  leftCue: [144, 12],
  leftJogTop: [144, 54],
  leftPad0: [151, 0],
  leftPad1: [151, 1],
  leftPad2: [151, 2],
  leftPad3: [151, 3],
  leftPad4: [151, 4],
  leftPad5: [151, 5],
  leftPad6: [151, 6],
  leftPad7: [151, 7],
  rightPlay: [145, 11],
  rightCue: [145, 12],
  rightJogTop: [145, 54],
  rightPad0: [153, 0],
  rightPad1: [153, 1],
  rightPad2: [153, 2],
  rightPad3: [153, 3],
  rightPad4: [153, 4],
  rightPad5: [153, 5],
  rightPad6: [153, 6],
  rightPad7: [153, 7],
} as const;

export const buttons = objMap(buttonsMap, () => false);

export const switches = objMap(buttonsMap, () => false);

export const useSwitches = () => {
  const [reactSwitches, setReactSwitches] = useState(switches);
  useFrame(() => {
    setReactSwitches({ ...switches });
  });
  return reactSwitches;
};

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
  crossfader: [182, 31],
} as const;

export const knobs = objMap(knobsMap, () => 0.5);

const offsetsMap = {
  leftSide: [176, 33],
  leftTop: [176, 34],
  rightSide: [177, 33],
  rightTop: [177, 34],
} as const;

const offsets = objMap(offsetsMap, () => 0.5);

const times = {
  left: 0,
  right: 0,
} as Record<Lat, number>;

const loop = () => {
  if (!switches.leftPlay && !buttons.leftJogTop)
    times.left += (1 / 60) * knobs.leftTempo;
  if (!switches.rightPlay && !buttons.rightJogTop)
    times.right += (1 / 60) * knobs.rightTempo;
  requestAnimationFrame(loop);
};
loop();

export const getTime = (lat: Lat) =>
  times[lat] + JOG_SENSITIVITY * (offsets[`${lat}Side`] + offsets[`${lat}Top`]);

export const useTime = (lat: Lat) => {
  const [time, setTime] = useState(0);
  useFrame(() => {
    setTime(getTime(lat));
  });
  return time;
};

(async () => {
  console.log("[MIDI] requesting access...");
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
    const mappedTo: string[] = [];
    const [a, b, c] = evt.data;

    objEach(buttonsMap, (k, [aa, bb]) => {
      if (!(a === aa && b === bb)) return;
      mappedTo.push(`button ${k}`);
      if (c === 0) {
        buttons[k] = false;
        switches[k] = !switches[k];
      }
      if (c === 127) buttons[k] = true;
    });

    objEach(knobsMap, (k, [aa, bb]) => {
      if (!(a === aa && b === bb)) return;
      mappedTo.push(`knob ${k}`);
      knobs[k] = c / 127;
    });

    objEach(offsetsMap, (k, [aa, bb]) => {
      if (!(a === aa && b === bb)) return;
      mappedTo.push(`offset ${k}`);
      offsets[k] += c === 63 ? -1 : 1;
    });

    console.log("[MIDI] event", mappedTo, ...evt.data);
    if (mappedTo.length > 1)
      console.warn("[MIDI] mapped to several entities", ...evt.data, mappedTo);
    if (mappedTo.length === 0) console.log("[MIDI] unmapped", ...evt.data);
  });
})();
