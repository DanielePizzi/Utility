import { TPrettyConsole } from "./pretty-console.type";
import { TProxy } from "./proxy.type";

export type TConfig = {
  proxy: TProxy;
  console: TPrettyConsole;
};
