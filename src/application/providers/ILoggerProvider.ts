export interface ILoggerProvider {
    log(message: string, metadata?: Record<string, unknown>): void;
    warn(message: string, metadata?: Record<string, unknown>): void;
    error(message: string, error?: Error, metadata?: Record<string, unknown>): void;
  }