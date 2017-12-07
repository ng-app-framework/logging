import {Log} from "../../src/app/Decorator/Log";
import {EventLogger} from "../../src/app/Service/EventLogger";

describe('Log Decorator', () => {
    class LogTest {

        @Log
        logThisMethod() {
            return 'Hi!';
        }

        @Log
        logThisFailure() {
            throw "Should be logged";
        }
    }

    it('Should send a Debug log event when calling a method', (done) => {

        let logMe = new LogTest();
        EventLogger.onDebug.first().subscribe((result: any) => {
            expect(result['object'] !== undefined).toBeTruthy('object');
            expect(result['method'] !== undefined).toBeTruthy('method');
            expect(result['result'] !== undefined).toBeTruthy('result');
            expect(result['status']).toEqual('Success');
            done();
        });
        logMe.logThisMethod();
    });
    it('Should send an Error log event when a method errors', (done) => {
        let logMe = new LogTest();
        EventLogger.onDebug.first().subscribe((result: any) => {
            expect(result['object'] !== undefined).toBeTruthy('object');
            expect(result['method'] !== undefined).toBeTruthy('method');
            expect(result['result'] !== undefined).toBeTruthy('result');
            expect(result['status']).toEqual('Error');
            done();
        });
        expect(() => {
            logMe.logThisFailure();
        }).toThrow();
    });
});
