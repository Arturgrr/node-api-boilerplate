import { OnUserCreated } from '@/application/subscribers/on-user-created';
import { KafkaQueueProvider } from '@/infra/messaging/kafka/kafkaQueueProvider';
import { PinoLoggerProvider } from '@/infra/providers/PinoLoggerProvider';

export function makeOnUserCreatedSubscriber() {
  const loggerProvider = new PinoLoggerProvider();
  const queueProvider = new KafkaQueueProvider();
  const subscriber = new OnUserCreated(loggerProvider, queueProvider);
  
  return subscriber;
}