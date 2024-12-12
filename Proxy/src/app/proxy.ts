import http from "http";
import { PROXY_MESSAGES } from "./enums/proxy-messages.enum";
import { ProxyEvents } from "./extras/proxy-events.extras";
import { TProxy } from "./types/proxy.type";
import { TProxyEvents } from "./types/proxy-events.type";

export class Proxy {
  private _proxyConfig: TProxy;
  private _events: ProxyEvents = new ProxyEvents();

  constructor(config: TProxy) {
    this._proxyConfig = config;
    this._create();
  }

  /**
   * Creates a proxy server and listens for calls.
   *
   * @private
   * @memberof Proxy
   */

  private _create(): void {
    const server = http.createServer((req, res) => {
      const targetOpts = this._getHeaderOptionsByRequest(req);
      this._events.emit("new-request", {
        method: req.method,
        path: req.url,
        headers: targetOpts.headers,
      });

      res.once("finish", () => {
        this._events.emit("end-request", res.statusCode);
        this._events.removeAllListenersExcept(["new-request"]);
      });

      // set cors headers
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        req.headers["access-control-request-headers"] || ""
      );

      // handle preflight requests
      if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
      }

      const targetReq = http.request(targetOpts, (targetRes) => {
        this._events.emit("target-called");
        let body = "";
        targetRes.on("data", (chunk) => (body += chunk));
        targetRes.once("end", () => {
          this._events.emit("target-body", body);
          this._events.emit("target-end", targetRes.statusCode || 500);
        });

        res.writeHead(
          targetRes.statusCode || 500,
          targetRes.statusMessage,
          targetRes.headers
        );

        targetRes.pipe(res, {
          end: true,
        });
      });

      req.pipe(targetReq, {
        end: true,
      });

      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.once("end", () => {
       this._events.emit("source-body", body);
      });

      targetReq.on("error", (err) => {
        res.writeHead(500);
        res.end(PROXY_MESSAGES.ERROR);
        this._events.emit("target-error");
      });
    });

    server.listen(this._proxyConfig.port, () => {
      this._events.emit("started");
    });
  }

  /**
   * Get header options by request.
   * Merge headers from source with those from configuration.
   *
   * @private
   * @param {http.IncomingMessage} req
   * @return {*}  {http.RequestOptions}
   * @memberof Proxy
   */
  private _getHeaderOptionsByRequest(
    req: http.IncomingMessage
  ): http.RequestOptions {
    const options: http.RequestOptions = {
      headers: {
        ...req.headers,
        ...this._proxyConfig.extraTargetHeaders,
      },
      hostname: this._proxyConfig.target.url,
      port: this._proxyConfig.target.port,
      path: req.url,
      method: req.method,
    };
    return options;
  }

  /**
   * On events.
   *
   * @template K
   * @param {K} event
   * @param {(...args: Parameters<TProxyEvents[K]>) => void} listener
   * @return {*}
   * @memberof Proxy
   */

  public on<K extends keyof TProxyEvents>(
    event: K,
    listener: (...args: Parameters<TProxyEvents[K]>) => void
  ) {
    return this._events.on(event, listener);
  }
 

  /**
   * Once events.
   *
   * @template K
   * @param {K} event
   * @param {(...args: Parameters<TProxyEvents[K]>) => void} listener
   * @return {*}
   * @memberof Proxy
   */

  public once<K extends keyof TProxyEvents>(
    event: K,
    listener: (...args: Parameters<TProxyEvents[K]>) => void
  ) {
    return this._events.once(event, listener);
  }
}
