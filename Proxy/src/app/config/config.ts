import { TConfig } from "../types/config.type";
import { PRETTY_CONSOLE_DEFAULT } from "./defaults/pretty-console";

export const APP_CONFIG: TConfig = {
    proxy: {
        port: 3000,
        target: {
            url: "localhost",
            port: 8080,
        },
        extraTargetHeaders: {
            "BNL-SECURITY-CONTEXT": "changeMe",
        },
        log: {
            headers: false,
            sourceBody: false,
            targetBody: true,
        },
    },
    console: PRETTY_CONSOLE_DEFAULT,
};
