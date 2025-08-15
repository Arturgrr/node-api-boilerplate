export interface IQueueProvider {
  publish(topic: string, payload: unknown): Promise<void>;
}