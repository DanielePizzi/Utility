import { BACKGROUND_ASCII_COLORS } from "../../enums/background-ascii-colors.enum";
import { FOREGROUND_ASCII_COLORS } from "../../enums/foreground-ascii-colors.enum";
import { TPrettyConsole } from "../../types/pretty-console.type";

export const PRETTY_CONSOLE_DEFAULT: TPrettyConsole = {
    closeByNewLine: true,
    level: {
        info: {
            label: {
                message: "INFO",
                foreground: FOREGROUND_ASCII_COLORS.WHITE,
                background: BACKGROUND_ASCII_COLORS.CYAN,
            },
            foreground: FOREGROUND_ASCII_COLORS.CYAN,
            background: BACKGROUND_ASCII_COLORS.BLUE,
        },
        warning: {
            label: {
                message: "WARNING",
                foreground: FOREGROUND_ASCII_COLORS.WHITE,
                background: BACKGROUND_ASCII_COLORS.YELLOW,
            },
            foreground: FOREGROUND_ASCII_COLORS.YELLOW,
            background: BACKGROUND_ASCII_COLORS.BLUE,
        },
        error: {
            label: {
                message: "ERROR",
                foreground: FOREGROUND_ASCII_COLORS.WHITE,
                background: BACKGROUND_ASCII_COLORS.RED,
            },
            foreground: FOREGROUND_ASCII_COLORS.RED,
            background: BACKGROUND_ASCII_COLORS.BLUE,
        },
    },
};
