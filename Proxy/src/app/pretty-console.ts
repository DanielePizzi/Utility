import { APP_CONFIG } from "./config/config";
import { ASCII_UTILS } from "./enums/ascii-utils.enum";
import { TPrettyConsoleLabel } from "./types/pretty-console-label.type";
import { TPrettyConsoleLevelOptions } from "./types/pretty-console-level-options.type";

export class PrettyConsole {
  private static _config = APP_CONFIG.console; 
  private constructor() {} 

  /**
   * Log in console with `info` style.
   *
   * @static
   * @param {...string[]} params
   * @memberof PrettyConsole
   */
  public static info(...params: string[]) {
    this._print(this._config.level.info, ...params);
  }

  /**
   * Log in console with `warn` style.
   *
   * @static
   * @param {...string[]} params
   * @memberof PrettyConsole
   */
  public static warn(...params: string[]) {
    this._print(this._config.level.warning, ...params);
  }

  /**
   * Log in console with `error` style.
   *
   * @static
   * @param {...string[]} params
   * @memberof PrettyConsole
   */
  public static error(...params: string[]) {
    this._print(this._config.level.error, ...params);
  }

  /**
   * Log in console with the style provided.
   *
   * @static
   * @param {TPrettyConsoleLevelOptions} customLevel
   * @param {...string[]} params
   * @memberof PrettyConsole
   */

  public static custom(
    customLevel: TPrettyConsoleLevelOptions,
    ...params: string[]
  ) {
    this._print(customLevel, ...params);
  }

  /**
   * Print.
   * Print parameters to console and apply customization
   * based on options.
   *
   * @private
   * @static
   * @param {TPrettyConsoleLevelOptions} options
   * @param {...string[]} params
   * @memberof PrettyConsole
   */
  private static _print(
    options: TPrettyConsoleLevelOptions,
    ...params: string[]
  ) {
    let message: string = "";
    let label: string = this._getLabelMessage(options.label);
    let indentationSpaces = 2;
    if (params.length > 1 && options.label?.message) {
      indentationSpaces += options.label.message.length;
    }

    const identation: string = this._getIntendation(
      indentationSpaces,
      ASCII_UTILS.NEW_LINE
    );

    const background = options.background ? options.background : "";
    const foreground = options.foreground ? options.foreground : "";
    const colors = `${foreground}${background}`;
    message = `${colors}${params.join(identation)}${ASCII_UTILS.RESET}`;
    console.log("\r" + label, message);

    if (this._config.closeByNewLine) {
      console.log("");
    }
  }

  /**
   * Get label message.
   * Compose a string based on input object.
   *
   *
   * @private
   * @static
   * @param {TPrettyConsoleLabel} [label]
   * @return {*}  {string}
   * @memberof PrettyConsole
   */
  private static _getLabelMessage(label?: TPrettyConsoleLabel): string {
    // short circuit.
    if (!label) {
      return "";
    }

    const color = `${label.foreground}${label.background}`;
    let bold = "";

    return `${color} ${label.message} ${ASCII_UTILS.RESET}`;
  }

  /**
   * Get intendation.
   * Generates intendation based on spaces and starting value.
   *
   * @private
   * @static
   * @param {number} spaces
   * @param {string} [startFrom=""]
   * @return {*}  {string}
   * @memberof PrettyConsole
   */
  private static _getIntendation(spaces: number, startFrom = ""): string {
    for (let i = 0; i <= spaces; i++) {
      startFrom += " ";
    }
    return startFrom;
  }
}
