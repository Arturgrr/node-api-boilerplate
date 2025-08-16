import { ConsoleNotificationProvider } from '@/infra/providers/ConsoleNotificationProvider';
import { PinoLoggerProvider } from '@/infra/providers/PinoLoggerProvider';
import { kafka } from '../client';

export async function userCreatedConsumer() {
  const consumer = kafka.consumer({ groupId: 'notification-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'UserCreatedEvent', fromBeginning: true });

  const logger = new PinoLoggerProvider();
  const notificationProvider = new ConsoleNotificationProvider();

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      logger.log(`[Kafka Consumer]: Message received on topic ${topic}`);

      try {
        const rawPayload = JSON.parse(message.value!.toString());
        const { user } = rawPayload;

        await notificationProvider.send({
          recipientId: user._id.value,
          title: `Bem-vindo(a) ao sistema, ${user.props.name}!`,
          content:
            'Estamos muito felizes em ter você conosco. Explore a plataforma!',
        });
      } catch (error) {
        logger.error(
          '[Kafka Consumer]: Error processing message.',
          error as Error,
        );
      }
    },
  });

  return consumer;
}