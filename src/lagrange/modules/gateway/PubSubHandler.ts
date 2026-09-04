import { PubSub } from "../../../core/pubsub/PubSub.js";

export const pubSub = new PubSub()

export function emitEvent(channelID: string, data: any) {
  pubSub.publish(channelID, data)
}