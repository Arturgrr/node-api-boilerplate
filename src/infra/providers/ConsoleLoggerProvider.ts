import { ILoggerProvider } from "@/application/providers/ILoggerProvider";

export class ConsoleLoggerProvider implements ILoggerProvider {
  log(message: string, metadata?: Record<string, unknown>): void {
    console.log(message);
  }

  warn(message: string, metadata?: Record<string, unknown>): void {
    console.warn(message);
  }

  error(message: string, error?: Error, metadata?: Record<string, unknown>): void {
    console.error(message);
  }
}