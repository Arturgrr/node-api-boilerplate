import { ILoggerProvider } from "@/application/providers/ILoggerProvider";
import pino, { Logger } from "pino";

export class PinoLoggerProvider implements ILoggerProvider {
  private logger: Logger;

  constructor() {
    this.logger = pino({
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    });
  }
  
  log(message: string, metadata?: Record<string, unknown>): void {
    this.logger.info(metadata, message);
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    this.logger.warn(metadata, message);
  }

  error(message: string, error?: Error, metadata?: Record<string, unknown>): void {
    this.logger.error({err: error, ...metadata}, message);
  }
}