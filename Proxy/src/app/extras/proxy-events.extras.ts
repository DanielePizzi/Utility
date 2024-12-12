import { EventEmitter } from "stream";
import {
    TProxyEvents,
    TProxyEventsEmptyProps,
} from "./types/proxy-events.type";

export class ProxyEvents extends EventEmitter {
    emit<K extends keyof TProxyEvents>(
        event: K,
        ...args: Parameters<TProxyEvents[K]>
    ): boolean {
        return super.emit(event, ...args);
    }

    on<K extends keyof TProxyEvents>(
        event: K,
        listener: (...args: Parameters<TProxyEvents[K]>) => void
    ): this {
        return super.on(event, listener);
    }

    once<K extends keyof TProxyEvents>(
        event: K,
        listener: (...args: Parameters<TProxyEvents[K]>) => void
    ): this {
        return super.once(event, listener);
    }

    removeAllListeners<K extends keyof TProxyEvents>(event?: K): this {
        return super.removeAllListeners(event);
    }

    removeAllListenersExcept<K extends keyof TProxyEvents>(except: K[]): this {
        const keys: (keyof TProxyEvents)[] = this._getEventKeys();

        for (const k of keys) {
            if (!except.find((e) => e === k)) {
                super.removeAllListeners(k);
            }
        }

        return this;
    }

    private _getEventKeys(): (keyof TProxyEvents)[] {
        const emptyEvents: TProxyEventsEmptyProps = {
            "end-request": undefined,
            started: undefined,
            "new-request": undefined,
            "request-called": undefined,
            "target-body": undefined,
            "target-end": undefined,
            "target-begin": undefined,
            "source-body": undefined,
        };

        const keys = Object.keys(emptyEvents) as (keyof TProxyEvents)[];
        return keys;
    }
}
