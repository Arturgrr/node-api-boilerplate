import { ILoggerProvider } from '@/application/providers/ILoggerProvider';
import { DomainEvents } from '@/domain/core/events/domain-events';
import { EventHandler } from '@/domain/core/events/event-handler';
import { UserCreatedEvent } from '@/domain/events/user-created-event';


export class OnUserCreated implements EventHandler {
  constructor(
    private logger: ILoggerProvider,
    ) {
    this.setupSubscriptions();
  }

  public setupSubscriptions(): void {
    DomainEvents.register(
      (event) => this.logger.log(`[OnUserCreated]: Event received for user ${event.user.name}`),
      UserCreatedEvent.name, 
    );
  }
}