using Chat.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Chat.Hubs
{
    public class ChatHub : Hub
    {

        public async Task SendMessage(ChatMessage chat)
        {

            await Clients.All.SendAsync("Receive", chat);

        }
    }
}