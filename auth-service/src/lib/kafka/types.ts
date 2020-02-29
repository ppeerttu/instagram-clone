
/**
 * Domain event type
 */
export enum DomainEventType {
    Created = "CREATED",
    Updated = "UPDATED",
    Deleted = "DELETED",
}

/**
 * Domain event type.
 */
export interface DomainEvent {

    /**
     * The domain event type
     */
    type: DomainEventType;

    /**
     * Data
     */
    data: any;
}
