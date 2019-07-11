
import { createLogger, Logger, transports, format } from 'winston';
import { LoggerService } from '@nestjs/common';
import { default as config } from '../km-config';

export class KitchenmanLogger implements LoggerService {

    private logger: Logger;

    constructor() {
        let prefix = '';
        if (process.env.PRODUCTION) {
            prefix = config.prodLoggingBaseDir;
        }

        this.logger = createLogger({
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: `${prefix}/kitchenman-api-error.log', level: 'error`,
                }),
                new transports.File({
                    filename: `${prefix}/kitchenman-api.log`,
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
