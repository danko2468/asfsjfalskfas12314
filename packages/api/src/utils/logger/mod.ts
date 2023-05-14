import { Logger } from "./logger.ts";

const loggerPool = new Map<string, Logger>();

export function getLogger(context: string): Logger {
  if (!loggerPool.has(context)) {
    loggerPool.set(context, new Logger(context));
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return loggerPool.get(context)!;
}
