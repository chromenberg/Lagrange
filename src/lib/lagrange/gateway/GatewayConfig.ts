export const Gateway = {
  Socket: {
    Port: 81,
    Address: "192.168.0.40"
  },
  Sharding: {
    MaxSockets: 10,
    SocketCountWarning: 8,
    MaxSocketConnects: 3
  },
  Heartbeating: {
    ExpectedTimeBetweenBeat: 45_000,
    BeatTolerance: 500,
    DisconnectAfterPulseLostTime: 50_000,
  }
}
