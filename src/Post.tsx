import { Effect } from "postprocessing";
import { forwardRef, useMemo } from "react";
import { Uniform } from "three";

import PostFrag from "./Post.frag?raw";

let uParam = 0.2;

class PostEffect extends Effect {
  constructor({ param = 0.1 } = {}) {
    super("Post", PostFrag, {
      uniforms: new Map([["param", new Uniform(param)]]),
    });
    uParam = param;
  }
  update() {
    this.uniforms.get("param")!.value = uParam;
  }
}

export const Post = forwardRef(({ param }: { param: number }, ref) => {
  const effect = useMemo(() => new PostEffect({ param }), [param]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
