
import { createLogger, Logger, transports, format } from 'winston';
import { LoggerService} from '@nestjs/common';

export class KitchenmanLogger implements LoggerService {

    private logger: Logger;

    constructor() {
        this.logger = createLogger({
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: 'kitchenman-api-error.log', level: 'error',
                }),
                new transports.File({
                    filename: 'kitchenman-api.log',
                }),
            ],
            format: format.combine(
                format.timestamp(),
                format.cli(),
            ),
        });
    }

    log(message: any, context?: string) {
        this.logger.info(message);
    }
    error(message: any, trace?: string, context?: string) {
        this.logger.error(message);
    }
    warn(message: any, context?: string) {
        this.logger.warn(message);
    }
    debug?(message: any, context?: string) {
        this.logger.debug(message);
    }
    verbose?(message: any, context?: string) {
        this.logger.verbose(message);
    }
}
