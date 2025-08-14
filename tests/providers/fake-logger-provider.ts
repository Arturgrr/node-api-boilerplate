import { ILoggerProvider } from '../../src/application/providers/ILoggerProvider';

export class FakeLoggerProvider implements ILoggerProvider {
  log(message: string, metadata?: Record<string, unknown>): void {
  }
  
  warn(message: string, metadata?: Record<string, unknown>): void {
  }
  
  error(message: string, error?: Error, metadata?: Record<string, unknown>): void {
  }
}