import { pino } from "pino";

import config from "~/config.ts";

export class Logger {
  private readonly debugMode = config.NODE_ENV !== "production";
  private readonly logger: pino.Logger;

  constructor(context: string) {
    this.logger = pino().child({ context });
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.debugMode) {
      this.logger.debug(message, ...optionalParams);
    }
  }

  info(message: any, ...optionalParams: any[]) {
    if (this.debugMode) {
      this.logger.debug(message, ...optionalParams);
    }
  }
  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    if (this.debugMode) {
      this.logger.warn(message, ...optionalParams);
    }
  }
}
