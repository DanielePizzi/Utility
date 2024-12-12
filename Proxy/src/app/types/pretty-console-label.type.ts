import { BACKGROUND_ASCII_COLORS } from "../enums/background-ascii-colors.enum";
import { FOREGROUND_ASCII_COLORS } from "../enums/foreground-ascii-colors.enum";

export type TPrettyConsoleLabel = {
  message: string;
  foreground: FOREGROUND_ASCII_COLORS;
  background: BACKGROUND_ASCII_COLORS;
};
