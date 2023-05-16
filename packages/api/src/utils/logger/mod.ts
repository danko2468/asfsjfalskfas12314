import { Logger } from "./logger.ts";

const loggerPool = new Map<string, Logger>();

export function getLogger(context: string): Logger {
  if (!loggerPool.has(context)) {
    loggerPool.set(context, new Logger(context));
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return loggerPool.get(context)!;
}

export function useLogger(logger: Logger, functionName: string) {
  const logArgs = useLogArgs(logger, functionName);
  const logError = useLogError(logger, functionName);

  return { logArgs, logError };
}

function useLogArgs(logger: Logger, functionName: string) {
  const logArgs = (...args: any[]) => {
    const contextString = `${functionName}(${Array(args.length).fill("%o").join(", ")})`;
    logger.info(contextString, ...args);
  };

  return logArgs;
}

function useLogError(logger: Logger, functionName: string) {
  const logFromError = (error: unknown) => {
    logger.error(
      `${functionName} - throw ${(error as Error)?.constructor?.name ?? "unexpected error"}: %s`,
      (error as Error).message
    );
  };

  return logFromError;
}
