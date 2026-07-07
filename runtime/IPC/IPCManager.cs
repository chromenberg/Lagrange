using System.Net;
using System.Net.Sockets;
namespace Wyvern.IPC;

public class MessageEventArgs(string message) : EventArgs {
    public string Message { get; } = message;
}

public class IPCManager(string host, int port)
{
    public readonly TcpListener server =
        new(IPAddress.Parse(host), port);


    // Connect to a process via its ipc socket
    public void Start()
    {
        Console.WriteLine($"Wyvern Daemon started on {host}:{port}");

 
    }
}
