import {ModuleWithProviders, NgModule} from '@angular/core';
import {EventLogger, EventLoggerConfig} from "./Service/EventLogger";
import {CoreModule} from "@ng-app-framework/core";


@NgModule({
    imports  : [
        CoreModule
    ],
    providers: [
        EventLogger,
        EventLoggerConfig
    ]
})
export class LoggingModule {

    constructor(logger: EventLogger) {

    }

    static forRoot(logToConsole: boolean): ModuleWithProviders {
        return {
            ngModule : LoggingModule,
            providers: [
                {
                    provide : EventLoggerConfig,
                    useValue: {logToConsole: logToConsole}
                }
            ]
        };
    }
}

