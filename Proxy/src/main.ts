import { APP_CONFIG } from "./app/config/config";
import { PrettyConsole } from "./app/pretty-console";
import { Proxy } from "./app/proxy";
import { TConfig } from "./app/types/config.type";
import { ProxyLogUtil } from "./app/utils/proxy-log.util";

const config: TConfig = APP_CONFIG;
const proxy = new Proxy(config.proxy);

ProxyLogUtil.logLogo();

 proxy.on("started", () => {
  PrettyConsole.info(
    `Proxy server listening on 'http://localhost:${config.proxy.port}'`
  );
  ProxyLogUtil.twirlTimer();
});

 

proxy.on("new-request", (request) => {
  const now = new Date();
  const method = request.method || "";
  const path = request.path || "";
  
  ProxyLogUtil.logRequest(now, method, path);
  
  if (config.proxy.log.headers) {
    ProxyLogUtil.logData(new Date(), "HEADERS", path, request.headers);
  }

  if (config.proxy.log.sourceBody) {
    proxy.once("source-body", (body) => {
      ProxyLogUtil.logData(new Date(), "SOURCE BODY", path, body);
    });
  }

  if (config.proxy.log.targetBody) {
    proxy.once("target-body", (body) => {
      ProxyLogUtil.logData(new Date(), "TARGET BODY", path, body);
    });
  }

  proxy.once("end-request", (status) => {
    const completedTime = new Date();
    const duration = (completedTime.getTime() - now.getTime()) / 1000;
    ProxyLogUtil.logStatus(completedTime, "COMPLETED", path, status, duration);
  });

  proxy.once("target-error", () => {
    PrettyConsole.error(
      `The target '${config.proxy.target.url}:${config.proxy.target.port}' is correct?`
    );
  });
});
