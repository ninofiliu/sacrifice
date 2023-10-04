import { objEach, objMap, x } from "./shorts";

type PressedMap<K extends string> = Record<K, [number, number]>;
type SideButtons = "play" | "cue" | "shift" | "sync" | "headphones";

const leftPressedMap: PressedMap<SideButtons> = {
  play: [144, 11],
  cue: [144, 12],
  shift: [144, 63],
  sync: [144, 88],
  headphones: [144, 84],
};
export const leftPressed = objMap(leftPressedMap, () => false);

const rightPressedMap: PressedMap<SideButtons> = {
  play: [145, 11],
  cue: [145, 12],
  shift: [145, 63],
  sync: [145, 88],
  headphones: [145, 84],
};
export const rightPressed = objMap(rightPressedMap, () => false);

const listenPressed = <K extends string>(
  a: number,
  b: number,
  c: number,
  map: PressedMap<K>,
  pressed: Record<K, boolean>
) => {
  objEach(map, (k, [aa, bb]) => {
    if (!(a == aa && b == bb)) return;
    if (c === 127) pressed[k] = true;
    if (c === 0) pressed[k] = false;
  });
};

(async () => {
  const access = await navigator.requestMIDIAccess();
  const input = x(access.inputs.get("input-0"));
  input.addEventListener("midimessage", (evt) => {
    console.log(...evt.data);
    const [a, b, c] = evt.data;
    listenPressed(a, b, c, leftPressedMap, leftPressed);
    listenPressed(a, b, c, rightPressedMap, rightPressed);

    console.log(JSON.stringify({ leftPressed, rightPressed }, null, 2));
  });
})();
