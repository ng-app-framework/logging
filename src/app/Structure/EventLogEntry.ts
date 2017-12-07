export interface EventLogEntry {
    object: string;
    method: string;
    params?: any;
    metaData?: any;
    result?: any;
}
