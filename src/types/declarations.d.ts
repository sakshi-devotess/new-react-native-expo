// declarations.d.ts

declare module "*.jpg" {
  const content: number;
  export default content;
}

declare module "*.png" {
  const content: number;
  export default content;
}

declare module "*.jpeg" {
  const content: number;
  export default content;
}

declare module "*.svg" {
  import * as React from "react";
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}
