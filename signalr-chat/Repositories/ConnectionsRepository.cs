using System.Collections.Generic;
using System.Linq;
using Chat.Models;

namespace Chat.Repositories
{
    public class ConnectionsRepository
    {
        private readonly Dictionary<string, string> connections =
            new Dictionary<string, string>();


        public void Add(string uniqueID, string user)
        {
            if (!connections.ContainsKey(uniqueID))
                connections.Add(uniqueID, user);
        }

        public string GetUserId(string id)
        {
            return connections.Where(c => c.Value == id).FirstOrDefault().Key;
        }

        public List<string> GetAllUser()
        {
            return (from con in connections
                    select con.Value
            ).ToList();
        }
    }
}