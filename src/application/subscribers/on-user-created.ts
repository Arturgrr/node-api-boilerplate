import { DomainEvents } from '@/domain/core/events/domain-events';
import { EventHandler } from '@/domain/core/events/event-handler';
import { UserCreatedEvent } from '@/domain/events/user-created-event';
import { ILoggerProvider } from '../providers/ILoggerProvider';
import { INotificationProvider } from '../providers/INotificationProvider';

export class OnUserCreated implements EventHandler {
  constructor(
    private notificationProvider: INotificationProvider,
    private logger: ILoggerProvider,
  ) {
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    DomainEvents.register(
      this.sendWelcomeNotification.bind(this),
      UserCreatedEvent.name, 
    );
  }

  private async sendWelcomeNotification({ user }: UserCreatedEvent) {
    this.logger.log(`[OnUserCreated]: Event received for user ${user.name}`);


    await this.notificationProvider.send({
      recipientId: user.id.toString(),
      title: `Bem-vindo(a) ao sistema, ${user.name}!`,
      content: 'Estamos muito felizes em ter você conosco. Explore a plataforma!',
    });
  }
}