import { objEach, objMap, x } from "./shorts";

const buttonsMap = {
  leftPlay: [144, 11],
  leftCue: [144, 12],
  rightPlay: [144, 11],
  rightCue: [144, 12],
} as const;

export const buttons = objMap(buttonsMap, () => false);

const knobsMap = {
  leftTempo: [176, 0],
} as const;

export const knobs = objMap(knobsMap, () => 0);

const offsetsMap = {
  left: [176, 33],
  right: [177, 33],
} as const;

export const offsets = objMap(offsetsMap, () => 0);

(async () => {
  const access = await navigator.requestMIDIAccess();
  const input = x(access.inputs.get("input-0"));
  input.addEventListener("midimessage", (evt) => {
    console.log(...evt.data);
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
      offsets[k] += c === 63 ? -1 : -1;
    });
  });
})();
