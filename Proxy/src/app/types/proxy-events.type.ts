import { TProxyRequestEvent } from "./proxy-request-event.type";
 
export type TProxyEvents = {
  started: () => void;
  "new-request": (request: TProxyRequestEvent) => void;
  "end-request": (status: number) => void;
  "target-called": () => void;
  "target-body": (body: string) => void;
  "target-error": () => void;
  "target-end": (status: number) => void;
  "source-body": (body: string) => void;
};

export type TProxyEventsEmptyProps = Record<keyof TProxyEvents, undefined>;
