using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using MinutoSeguros.DAO;

namespace MinutoSeguros.BLL
{
    public class RestrictedTermBusiness
    {
        private string[] arrayElements = ",|!|?|:|.".Split('|');
        private string regexTerms = @"\t|\n|\r";
        private string description = string.Empty;

        public void CountProcess(ref List<Post> posts, List<RestrictedTerm> terms)
        {
            terms.ForEach(t => t.Name = t.Name.ToLower());
            foreach (var element in arrayElements)
                posts.ForEach(p => {
                    description = Regex.Replace(p.Description.Replace(element, ""), regexTerms, "");
                    p.WordCounter = description.ToLower().Split(' ').Count(w => !terms.Exists(t => t.Name.ToLower().Contains(w)));
                });
        }
        
        public void RankProcess(ref List<Post> posts, List<RestrictedTerm> terms, ref List<DAO.CloudTagDTO> cloudTags)
        {
            terms.ForEach(t => t.Name = t.Name.ToLower());
            List<string> items;
            
            foreach (var p in posts)
            {
                foreach (var e in arrayElements)
                    description = Regex.Replace((arrayElements[0] == e ? p.Description : description).Replace(e, ""), regexTerms, "");

                items = description.ToLower().Split(' ').OrderBy(i => i).ToList();
                items = items.Where(i => !terms.Exists(t => t.Name.ToLower().Contains(i))).ToList();

                cloudTags.AddRange(
                    items.Distinct().Select(
                        i => new CloudTagDTO()
                        {
                            PostID = p.ID,
                            Tag = i,
                            Counter = items.Count(w => w == i)
                        }
                    ).ToList()
                        .OrderByDescending(ctd => ctd.Counter)
                            .Take(10)
                );

            }
        }
        
    }
}
