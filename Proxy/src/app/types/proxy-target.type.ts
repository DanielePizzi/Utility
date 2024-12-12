export type TProxyTarget = {
  /**
   * Target url.
   * Example `http://localhost`
   *
   * @type {string}
   */
  url: string;
  /**
   * Target port.
   *
   * @type {(number | null)}
   */
  port: number | null;
};
