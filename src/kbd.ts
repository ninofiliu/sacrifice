export const kbd: Record<KeyboardEvent["code"], boolean> = {};

document.body.addEventListener("keydown", (evt) => (kbd[evt.code] = true));
document.body.addEventListener("keyup", (evt) => (kbd[evt.code] = false));
