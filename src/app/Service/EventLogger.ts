import {EventEmitter, Injectable} from "@angular/core";
import {EventLogEntry} from "../Structure/EventLogEntry";
import {RemoteLogger} from "../Structure/RemoteLogger";
import {ErrorFormat} from "../Structure/ErrorFormat";
import {UnsubscribeAll, Value} from "@ng-app-framework/core";

export class EventLoggerConfig {
    logToConsole = false;
}

@Injectable()
export class EventLogger {

    static onDebug                       = new EventEmitter<any>();
    static onError                       = new EventEmitter<any>();
           remoteLoggers: RemoteLogger[] = [];

    constructor(public config: EventLoggerConfig = new EventLoggerConfig()) {
        EventLogger.onDebug.takeUntil(UnsubscribeAll).subscribe((message: any) => this.handleDebug(message));
        EventLogger.onError.takeUntil(UnsubscribeAll).subscribe((message: any) => this.handleError(message));
    }

    handleError(message: any) {
        if (this.config.logToConsole === true) {
            window.console.error(message);
        }
        if (Value.hasArrayElements(this.remoteLoggers)) {
            for (let logger of this.remoteLoggers) {
                logger.handleError(<ErrorFormat>message.data);
            }
        }
    }

    handleDebug(message: any) {
        if (this.config.logToConsole === true) {
            window.console.info(message);
        }
        if (Value.hasArrayElements(this.remoteLoggers)) {
            for (let logger of this.remoteLoggers) {
                logger.handleDebug(<EventLogEntry>message);
            }
        }
    }
}
