import {EventLogEntry} from "./EventLogEntry";
import {ErrorFormat} from "./ErrorFormat";
export interface RemoteLogger {
    eventHistory: any[];
    handleError(error: ErrorFormat);
    handleDebug(logEntry: EventLogEntry);
    sendErrorReport(error: ErrorFormat);
    sendEventHistory();
}
