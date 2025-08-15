import { userCreatedConsumer } from './user-created-consumer';

export async function startKafkaConsumers() {    
  const userCreatedConsumerInstance = await userCreatedConsumer();

  return [userCreatedConsumerInstance];
}   