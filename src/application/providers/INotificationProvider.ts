export interface SendNotificationParams {
    recipientId: string;
    title: string;
    content: string;
  }
  
  export interface INotificationProvider {
    send(params: SendNotificationParams): Promise<void>;
  }