import {EventLogger} from "../Service/EventLogger";
import {Value} from "@ng-app-framework/core";

export function Log(target: any, propertyName: string, descriptor: any) {
    let method = descriptor.value;

    function logResult(object: any, args: any, type, result) {
        EventLogger.onDebug.emit({
            object: object.constructor._name || object.constructor.name,
            method: propertyName,
            status: type,
            params: args,
            result: result
        });
    }

    descriptor.value = function (...args: any[]) {
        try {
            let result = method.apply(this, arguments);
            logResult(this, args, 'Success', Value.coalesce(result, null));
            return result;
        } catch (e) {
            logResult(this, args, 'Error', e);
            throw e;
        }
    };

}
