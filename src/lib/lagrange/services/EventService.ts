import { PubSub } from "../../core/pubsub/PubSub.js";
import type { GatewayEventPayload } from "../modules/events/GatewayEvents.js";

export const eventPublisher = new PubSub()

export function emitEvent(eventName: string, data: {}) {
  eventPublisher.publish(eventName, data)
}
