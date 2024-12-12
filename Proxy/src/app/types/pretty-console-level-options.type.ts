import { BACKGROUND_ASCII_COLORS } from "../enums/background-ascii-colors.enum";
import { FOREGROUND_ASCII_COLORS } from "../enums/foreground-ascii-colors.enum";
import { TPrettyConsoleLabel } from "./pretty-console-label.type";


export type TPrettyConsoleLevelOptions = {
  foreground?: FOREGROUND_ASCII_COLORS;
  background?: BACKGROUND_ASCII_COLORS;
  label?: TPrettyConsoleLabel;
};
