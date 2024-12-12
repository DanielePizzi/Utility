import { ASCII_UTILS } from "../enums/ascii-utils.enum";
import { BACKGROUND_ASCII_COLORS } from "../enums/background-ascii-colors.enum";
import { FOREGROUND_ASCII_COLORS } from "../enums/foreground-ascii-colors.enum";
import { PrettyConsole } from "../pretty-console";
import { TPrettyConsoleLevelOptions } from "../types/pretty-console-level-options.type";

export class ProxyLogUtil {
  
  /**
   * Log request.
   *
   * @static
   * @param {Date} time
   * @param {(string | null)} method
   * @param {string} path
   * @memberof ProxyLogUtil
   */

  public static logRequest(
    time: Date,
    method: string | null,
    path: string
  ): void {
    const opts: TPrettyConsoleLevelOptions = {
      label: {
        foreground: FOREGROUND_ASCII_COLORS.WHITE,
        background: BACKGROUND_ASCII_COLORS.GRAY,
        message: `${time.toLocaleString()}`,
      },
    };
    method = this._getMethodColors(method);
    const message: string = `${method} ${FOREGROUND_ASCII_COLORS.MAGENTA}${path}${ASCII_UTILS.RESET}`;
    PrettyConsole.custom(opts, message);
  }

 

  /**
   * Log status.
   *
   * @static
   * @param {Date} time
   * @param {string} label
   * @param {string} path
   * @param {number} code
   * @param {number} duarationSeconds
   * @memberof ProxyLogUtil
   */
  public static logStatus(
    time: Date,
    label: string,
    path: string,
    code: number,
    duarationSeconds: number
  ): void {
    const opts: TPrettyConsoleLevelOptions = {
      label: {
        foreground: FOREGROUND_ASCII_COLORS.WHITE,
        background: BACKGROUND_ASCII_COLORS.GRAY,
        message: `${time.toLocaleString()}`,
      },
    };
    let message: string = `${FOREGROUND_ASCII_COLORS.CYAN}${label} `;
    message += `${FOREGROUND_ASCII_COLORS.MAGENTA}${path}${ASCII_UTILS.RESET} - `;
    message += `${FOREGROUND_ASCII_COLORS.BLUE}${code}${ASCII_UTILS.RESET} - `;
    message += `${FOREGROUND_ASCII_COLORS.CYAN} ${duarationSeconds}s`;
    message += `${ASCII_UTILS.RESET}`;
    PrettyConsole.custom(opts, message);
  }


  public static logData(
    time: Date,
    status: string,
    path: string,
    data: any
  ): void {
    const opts: TPrettyConsoleLevelOptions = {
      label: {
        foreground: FOREGROUND_ASCII_COLORS.WHITE,
        background: BACKGROUND_ASCII_COLORS.GRAY,
        message: `${time.toLocaleString()}`,
      },
    };
    let message: string = `${FOREGROUND_ASCII_COLORS.CYAN}${status} `;
    message += `${FOREGROUND_ASCII_COLORS.MAGENTA}${path} `;
    message += `${ASCII_UTILS.RESET}`;
    PrettyConsole.custom(opts, message);
  
    this._logData(data);
  }

  private static _logData(data: any): void {
    let parsedBody;

    try {
      parsedBody = JSON.parse(data);
    } catch (error) {
      parsedBody = data;
    }
    console.log(parsedBody, "\n");
  }

 

  /**
   * Get method colors.
   *
   * @private
   * @static
   * @param {(string | null)} method
   * @return {*}  {string}
   * @memberof ProxyLogUtil
   */
  private static _getMethodColors(method: string | null): string {
    let foregroundColor: FOREGROUND_ASCII_COLORS;

    switch (method) {
      case "GET":
        foregroundColor = FOREGROUND_ASCII_COLORS.GREEN;
        break;
      case "POST":
        foregroundColor = FOREGROUND_ASCII_COLORS.BLUE;
        break;
      case "PUT":
        foregroundColor = FOREGROUND_ASCII_COLORS.YELLOW;
        break;
      case "DELETE":
        foregroundColor = FOREGROUND_ASCII_COLORS.RED;
        break;

      default:
        foregroundColor = FOREGROUND_ASCII_COLORS.YELLOW;
        method = method || "UKNOWN";
        break;
    }

    return `${foregroundColor}${method}${ASCII_UTILS.RESET}`;
  }


  public static logLogo() {
    const opts: TPrettyConsoleLevelOptions = {
      foreground: FOREGROUND_ASCII_COLORS.CYAN,
    };
    PrettyConsole.custom(
      opts,
      "",
      "**************************************************",
      "*                                                *",
      "*                Custom Proxy                    *",
      "*                                                *",
      "**************************************************"
    );
  }

 
  public static twirlTimer() {
    const centerChar = "●";
    const expandChar = "•";
    const spacer = " ";
    const maxSize = 3;
    let growing = true;
    let size = 0;

    const pulseInterval = setInterval(() => {
      const fill = `${spacer.repeat(maxSize - size)}`;
      const expandCharRepeat = `${expandChar.repeat(size)}`;
      const output = `\r${FOREGROUND_ASCII_COLORS.MAGENTA}Listening ${fill}${expandCharRepeat}${centerChar}${expandCharRepeat}${fill}${ASCII_UTILS.RESET}`;

      process.stdout.write(`${output}`);
      if (growing) {
        size++;
        if (size >= maxSize) {
          growing = false;
        }
      } else {
        size--;
        if (size <= 0) {
          growing = true;
        }
      }
    }, 200);
  }
}
