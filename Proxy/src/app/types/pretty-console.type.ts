import { PRETTY_CONSOLE_TYPES } from "../enums/pretty-console-types.enum";
import { TPrettyConsoleLevelOptions } from "./pretty-console-level-options.type";

export type TPrettyConsoleLevel = {
  [k in PRETTY_CONSOLE_TYPES]: TPrettyConsoleLevelOptions;
};
