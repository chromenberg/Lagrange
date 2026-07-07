using System.Net.WebSockets.Server;
namespace Wyvern;



class Daemon
{
    public static void Main()
    {
        var a = new WebSocketSer
        server.Start();
        server.AddWebSocketService<SocketListener>("/message");
    }

}
