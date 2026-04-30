export const Gateway = {
    Socket: {
        Port: 81,
        Address: "127.0.0.1"
    },
    Sharding: {
        MaxSockets: 10,
        SocketCountWarning: 8,
        MaxSocketConnects: 3
    },
    Heartbeating: {
        ExpectedTimeBetweenBeat: 5_000,
        BeatTolerance: 500,
        DisconnectAfterPulseLostTime: 30_000,
    }
}
