using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MinutoSeguros.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly APIContext ctx;
        public PostController(APIContext context){ ctx = context; }
        
        [HttpGet]
        public async Task<List<DAO.PostDTO>> Get()
        {
            var mainObjects = await ctx.CloudTags.Include(p => p.Post).Include(t => t.Tag).ToListAsync();
            return 
            (
                from item in mainObjects.Select(p => p.Post).Distinct()
                select new DAO.PostDTO
                {
                    ID = item.ID,
                    Link = item.Link,
                    Title = item.Title,
                    Counter = item.WordCounter,
                    Tags = mainObjects
                            .Where(p => p.PostID == item.ID)
                                .Select(t => new DAO.TagDTO() {
                                    ID = t.TagID,
                                    Name = t.Tag.Name,
                                    Counter = t.Count
                                }).ToList()
                }
            ).ToList();
        }

    }
}