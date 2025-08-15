import { IQueueProvider } from '@/application/providers/IQueueProvider';
import { Partitioners } from 'kafkajs';
import { kafka } from './client';

export class KafkaQueueProvider implements IQueueProvider {
  private producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner 

  });
  private isConnected = false;

  private async connect() {
    if (!this.isConnected) {
      await this.producer.connect();
      this.isConnected = true;
    }
  }

  async publish(topic: string, payload: unknown): Promise<void> {
    await this.connect();
    
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  }
}