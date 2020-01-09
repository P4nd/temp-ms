using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinutoSeguros.BLL;

namespace MinutoSeguros.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SetupController : ControllerBase
    {
        private readonly APIContext ctx;
        public SetupController(APIContext context) { ctx = context; }

        [HttpGet("one")]
        public async Task<bool> GetOne() {
            ctx.Posts.RemoveRange(ctx.Posts);
            ctx.Tags.RemoveRange(ctx.Tags);
            ctx.CloudTags.RemoveRange(ctx.CloudTags);
            return (await ctx.SaveChangesAsync() >= 1);
        }

        [HttpGet("two")]
        public async Task<bool> GetTwo() {
            var postBusiness = new BLL.PostBusiness();
            List<DAO.Post> ldp = await postBusiness.Read();
            if (ldp.Count() == 0) return false;
            await ctx.Posts.AddRangeAsync(ldp);
            return (await ctx.SaveChangesAsync() >= 1);
        }

        [HttpGet("three")]
        public async Task<bool> GetThree() {
            var posts = await ctx.Posts.ToListAsync();
            var terms = await ctx.RestrictedTerms.ToListAsync();          
            var restrictedTermBusiness = new RestrictedTermBusiness();
            restrictedTermBusiness.CountProcess(ref posts, terms);
            return (await ctx.SaveChangesAsync() >= 1);
        }

        [HttpGet("four")]
        public async Task<bool> GetFour() {
            var posts = await ctx.Posts.ToListAsync();
            var terms = await ctx.RestrictedTerms.ToListAsync();
            var cloudTagsDTO = new List<DAO.CloudTagDTO>();
            var restrictedTermBusiness = new RestrictedTermBusiness();
            restrictedTermBusiness.RankProcess(ref posts, terms, ref cloudTagsDTO);
            int countOccurrences = 0;

            using (var ctxTrans = ctx.Database.BeginTransaction())
            {
                var cloudTags = new List<DAO.CloudTag>();

                foreach (var ctd in cloudTagsDTO) {
                    cloudTags.Add(new DAO.CloudTag() {
                        Tag = new DAO.Tag() { Name = ctd.Tag },
                        PostID = ctd.PostID,
                        Count = ctd.Counter
                    });
                }

                await ctx.CloudTags.AddRangeAsync(cloudTags);
                countOccurrences += await ctx.SaveChangesAsync();
                ctxTrans.Commit();
            }

            return countOccurrences > 0;
        }
    }
}