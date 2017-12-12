import {ModuleWithProviders, NgModule} from '@angular/core';
import {EventLogger, EventLoggerConfig} from "./Service/EventLogger";
import {NgCoreModule} from "@ng-app-framework/core";


@NgModule({
    imports  : [
        NgCoreModule
    ],
    providers: [
        EventLogger,
        EventLoggerConfig
    ]
})
export class NgLoggingModule {

    constructor(logger: EventLogger) {

    }

    static forRoot(logToConsole: boolean): ModuleWithProviders {
        return {
            ngModule : NgLoggingModule,
            providers: [
                {
                    provide : EventLoggerConfig,
                    useValue: {logToConsole: logToConsole}
                }
            ]
        };
    }
}

