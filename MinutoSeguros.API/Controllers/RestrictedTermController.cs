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
    public class RestrictedTermController : ControllerBase
    {
        private readonly APIContext ctx;
        public RestrictedTermController(APIContext context){ ctx = context; }
        
        [HttpGet]
        public async Task<IList<DAO.RestrictedTerm>> Get()
        {
            return await ctx.RestrictedTerms.ToListAsync();
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] DAO.RestrictedTerm term)
        {
            if (String.IsNullOrWhiteSpace(term.Name) || String.IsNullOrEmpty(term.Name))
                return BadRequest("Your parameters are incorrect");

            var objTemp = await ctx.RestrictedTerms.FirstOrDefaultAsync(x => x.Name == term.Name);

            if (objTemp != null)
                return BadRequest("Item already exists");

            ctx.Add(term);

            return Ok(await ctx.SaveChangesAsync() >= 1 ? "Item added successfully" : "Item hasn't been added");
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            var currentItem = await ctx.RestrictedTerms.FindAsync(id.Value);

            if (currentItem == null)
                return NotFound("Item not found");

            ctx.RestrictedTerms.Remove(currentItem);

            if (await ctx.SaveChangesAsync() >= 1)
                return Ok("Item removed successfully");

            return UnprocessableEntity("Your item wasn't removed");
        }

    }
}