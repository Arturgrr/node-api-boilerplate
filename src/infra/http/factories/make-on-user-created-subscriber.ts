import { OnUserCreated } from '@/application/subscribers/on-user-created';
import { KafkaQueueProvider } from '@/infra/messaging/kafka/kafkaQueueProvider';
import { ConsoleLoggerProvider } from '@/infra/providers/ConsoleLoggerProvider';

export function makeOnUserCreatedSubscriber() {
  const loggerProvider = new ConsoleLoggerProvider();
  const queueProvider = new KafkaQueueProvider();
  const subscriber = new OnUserCreated(loggerProvider, queueProvider);
  
  return subscriber;
}