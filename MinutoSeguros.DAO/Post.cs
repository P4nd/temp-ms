using System;
using System.Collections.Generic;
using System.Text;

namespace MinutoSeguros.DAO
{
    public class Post
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public string Description { get; set; }
        public int WordCounter { get; set; }
        public virtual IList<CloudTag> CloudTags { get; set; }
    }
    public class PostDTO
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public int Counter { get; set; }
        public List<TagDTO> Tags { get; set; }
    }
}
