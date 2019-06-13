import { Logger } from '@nestjs/common';

export class BackendLogger extends Logger {

    // tslint:disable-next-line: variable-name
    private _unit: string;

    public set unit(u: string) { this._unit = u; }
    public get unit(): string  { return this._unit; }

    private timeString(): string {
        return `${new Date(Date.now()).toTimeString()}`;
    }

    private format(message: string | any): string {
        return `[${this.timeString()}] [Kitchenman]: ${message}`;
    }

    error(message: any, trace?: string, context?: string): void {
        const formatted = this.format(message);
        super.error(formatted, trace, context);
    }
    log(message: any, context?: string): void {
        const formatted = this.format(message);
        super.log(formatted, context);
    }
    warn(message: any, context?: string): void {
        super.log(this.format(message), context);
    }
    debug(message: any, context?: string): void {
        super.debug(this.format(message), context);
    }
    verbose(message: any, context?: string): void {
        super.verbose(this.format(message), context);
    }
}
