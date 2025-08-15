import { DomainEvents } from '@/domain/core/events/domain-events';
import { EventHandler } from '@/domain/core/events/event-handler';
import { UserCreatedEvent } from '@/domain/events/user-created-event';
import { ILoggerProvider } from '../providers/ILoggerProvider';
import { IQueueProvider } from '../providers/IQueueProvider';

interface WelcomeNotificationPayload {
  user: {
    id: { toString: () => string };
    name: string;
    email: string;
  };
}

export class OnUserCreated implements EventHandler {
  constructor(
    private logger: ILoggerProvider,
    private queueProvider: IQueueProvider,
  ) {
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    DomainEvents.register(
      this.handle.bind(this),
      UserCreatedEvent.name, 
    );
  }

  public async handle({ user }: WelcomeNotificationPayload) {
    this.logger.log(`[OnUserCreated]: Event received for user ${user.name}`);

    await this.queueProvider.publish(UserCreatedEvent.name, {
      user,
    });
  }
}