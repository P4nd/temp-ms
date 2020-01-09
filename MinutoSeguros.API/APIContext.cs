using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MinutoSeguros.API
{
    public class APIContext : DbContext
    {
        public DbSet<DAO.Post> Posts { get; set; }
        public DbSet<DAO.Tag> Tags { get; set; }
        public DbSet<DAO.CloudTag> CloudTags { get; set; }
        public DbSet<DAO.RestrictedTerm> RestrictedTerms { get; set; }

        public APIContext(DbContextOptions<APIContext> options) : base(options){}

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.Entity<DAO.Post>().HasKey(x => x.ID);
            builder.Entity<DAO.Tag>().HasKey(x => x.ID);
            builder.Entity<DAO.RestrictedTerm>().HasKey(x => x.ID);

            builder.Entity<DAO.CloudTag>(e => {
                e.HasKey(x => x.ID);
                e.HasOne(p => p.Post).WithMany(pcts => pcts.CloudTags);
                e.HasOne(p => p.Post).WithMany(pcts => pcts.CloudTags);
            });
            
            base.OnModelCreating(builder);

        }

    }
}
