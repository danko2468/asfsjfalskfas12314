import { pino } from "pino";

import config from "~/config.ts";

const debugMode = config.NODE_ENV !== "production";

export class Logger {
  private readonly logger: pino.Logger;

  constructor(context: string) {
    this.logger = pino().child({ context });
    this.log = this.log.bind(this);
    this.info = this.info.bind(this);
    this.error = this.error.bind(this);
    this.warn = this.warn.bind(this);
  }

  log(message: any, ...optionalParams: any[]) {
    if (debugMode) {
      this.logger.info(message, ...optionalParams);
    }
  }

  info(message: any, ...optionalParams: any[]) {
    if (debugMode) {
      this.logger.info(message, ...optionalParams);
    }
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    if (debugMode) {
      this.logger.warn(message, ...optionalParams);
    }
  }
}
