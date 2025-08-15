import {
    INotificationProvider,
    SendNotificationParams,
} from '@/application/providers/INotificationProvider';
  
  export class ConsoleNotificationProvider implements INotificationProvider {
    async send({
      recipientId,
      title,
      content,
    }: SendNotificationParams): Promise<void> {
      console.log('--- NOVA NOTIFICAÇÃO ---');
      console.log(`Para: ${recipientId}`);
      console.log(`Título: ${title}`);
      console.log(`Conteúdo: ${content}`);
      console.log('------------------------');
    }
  }