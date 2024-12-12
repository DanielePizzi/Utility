import { TProxyLog } from "./proxy-log.type";
import { TProxyTarget } from "./proxy-target.type";

export type TProxy = {
  /**
   * The port of the proxy.
   *
   *
   * @type {number}
   */
  port: number;
  /**
   * Target to forward requests to.
   *
   * @type {TProxyTarget}
   */
  target: TProxyTarget;
  /**
   * Extra headers that will be added to the ones already present.
   * Example: Frontend makes a call to the proxy and has headers `A B C`,
   * the proxy will add `D E F`,
   *  the backend will get `A B C D E F`
   *
   * @type {({ [key: string]: string | number })}
   */
  extraTargetHeaders?: { [key: string]: string | number };
  log: TProxyLog;
};
