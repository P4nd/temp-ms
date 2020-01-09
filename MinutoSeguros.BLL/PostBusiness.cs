using Microsoft.EntityFrameworkCore;
using MinutoSeguros.DAO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MinutoSeguros.BLL
{
    public class PostBusiness
    {

        public async Task<List<Post>> Read()
        {
            using (var client = new HttpClient())
            {
                string xmlFile = await client.GetStringAsync("https://www.minutoseguros.com.br/blog/feed/");
                XDocument xd = XDocument.Parse(xmlFile);
                var postLists = new List<Post>();
                foreach(var item in xd.Root.Element("channel").Elements("item"))
                {
                    postLists.Add(new Post() {
                        Title = item.Element("title").Value,
                        Link = item.Element("link").Value,
                        Description = Regex.Replace(item.Element("description").Value, @"<[^>]+>", "").Trim()
                    });
                    if (postLists.Count >= 10) break;
                }
                return postLists;
            }            
        }
        
    }
}
