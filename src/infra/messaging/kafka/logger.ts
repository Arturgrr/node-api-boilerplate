import { ILoggerProvider } from '@/application/providers/ILoggerProvider';
import { LogEntry, logLevel } from 'kafkajs';

const toPinoLogLevel = (level: logLevel): keyof ILoggerProvider | null => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return 'error';
    case logLevel.WARN:
      return 'warn';
    case logLevel.INFO:
      return 'log';
    case logLevel.DEBUG:
      return null;
  }
};

export const KafkaJSLogCreator = (logger: ILoggerProvider) => {
  return (level: logLevel) => {
    return ({ namespace, level, label, log }: LogEntry) => {
      const { message, ...extra } = log;
      const pinoLevel = toPinoLogLevel(level);

      if (!pinoLevel) {
        return;
      }

      const metadata = {
        kafka_namespace: namespace,
        kafka_label: label,
        ...extra,
      };

      const formattedMessage = `[Kafka] ${message}`;

      if (pinoLevel === 'error') {
        logger.error(formattedMessage, new Error(message), metadata);
      } else {
        logger[pinoLevel](formattedMessage, metadata);
      }
    };
  };
};