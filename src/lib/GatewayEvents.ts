export interface GatewayEventPayload {
    opCode?: number
    data?: object | number,
    sequenceNumber?: number,
    eventType?: string
}
export class GatewayEvent {
    private payload: GatewayEventPayload;
    constructor(payload:GatewayEventPayload) {
        this.payload = payload;
    }

    public setType(type: string): GatewayEvent {
        this.payload.eventType = type;
        return this;
    }
    public setOpcode(opCode: number): GatewayEvent {
        this.payload.opCode = opCode;
        return this;
    }
    public setData(data: object | number): GatewayEvent {
        this.payload.data = data;
        return this;
    }
    public setSequence(sequenceNumber: number): GatewayEvent {
        this.payload.sequenceNumber = sequenceNumber;
        return this;
    }

    public toJSON(): string {
        return JSON.stringify(this.payload);
    }
}

export enum GatewayEventOpCodes {
    DISPATCH,
    HEARTBEAT,
    IDENTIFY,
    UPDATE_PRESENCE,
    UPDATE_VOICE_STATE,
    RESUME = 6,
    RECONNECT,
    INVALID_SESSION = 9,
    HELLO = 10,
    REQUEST_GUILD_MEMBERS = 8,
    REQUEST_SOUNDBOARD_SOUNDS = 31
}

export enum GatewayEventTypes {
    READY = "READY",
    RESUMED = "RESUMED",
    RATE_LIMITED = "RATE_LIMITED",
    CHANNEL_CREATE = "CHANNEL_CREATE",
    CHANNEL_UPDATE = "CHANNEL_UPDATE",
    CHANNEL_DELETE = "CHANNEL_DELETE",
    CHANNEL_PINS_UPDATE = "CHANNEL_PINS_UPDATE",
    THREAD_CREATE = "THREAD_CREATE",
    THREAD_UPDATE = "THREAD_UPDATE",
    THREAD_DELETE = "THREAD_DELETE",
    THREAD_LIST_SYNC = "THREAD_LIST_SYNC",
    THREAD_MEMBER_UPDATE = "THREAD_MEMBER_UPDATE",
    THREAD_MEMBERS_UPDATE = "THREAD_MEMBERS_UPDATE",
    GUILD_CREATE = "GUILD_CREATE",
    GUILD_UPDATE = "GUILD_UPDATE",
    GUILD_DELETE = "GUILD_DELETE",
    GUILD_AUDIT_LOG_ENTRY_CREATE = "GUILD_AUDIT_LOG_ENTRY_CREATE",
    GUILD_BAN_ADD = "GUILD_BAN_ADD",
    GUILD_BAN_REMOVE = "GUILD_BAN_REMOVE",
    GUILD_MEMBER_ADD = "GUILD_MEMBER_ADD",
    GUILD_MEMBER_REMOVE = "GUILD_MEMBER_REMOVE",
    GUILD_MEMBER_UPDATE = "GUILD_MEMBER_UPDATE",
    GUILD_MEMBERS_CHUNK = "GUILD_MEMBERS_CHUNK",
    GUILD_ROLE_CREATE = "GUILD_ROLE_CREATE",
    GUILD_ROLE_UPDATE = "GUILD_ROLE_UPDATE",
    GUILD_ROLE_DELETE = "GUILD_ROLE_DELETE",
    INVITE_CREATE = "INVITE_CREATE",
    INVITE_DELETE = "INVITE_DELETE",
    MESSAGE_CREATE = "MESSAGE_CREATE",
    MESSAGE_UPDATE = "MESSAGE_UPDATE",
    MESSAGE_DELETE = "MESSAGE_DELETE",
    MESSAGE_DELETE_BULK = "MESSAGE_DELETE_BULK",
    MESSAGE_REACTION_ADD = "MESSAGE_REACTION_ADD",
    MESSAGE_REACTION_REMOVE = "MESSAGE_REACTION_REMOVE",
    MESSAGE_REACTION_REMOVE_ALL = "MESSAGE_REACTION_REMOVE_ALL",
    MESSAGE_REACTION_REMOVE_EMOJI = "MESSAGE_REACTION_REMOVE_EMOJI",
    PRESENCE_UPDATE = "PRESENCE_UPDATE",
    TYPING_START = "TYPING_START",
    USER_UPDATE = "USER_UPDATE"
}

export enum GatewayEventErrorCodes {

}