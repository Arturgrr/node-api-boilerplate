import { INotificationProvider, SendNotificationParams } from '../../src/application/providers/INotificationProvider';

export class InMemoryNotificationProvider implements INotificationProvider {
    public notifications: SendNotificationParams[] = [];
  
    async send(params: SendNotificationParams): Promise<void> {
      this.notifications.push(params);
    }
  }