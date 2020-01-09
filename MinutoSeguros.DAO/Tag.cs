using System;
using System.Collections.Generic;
using System.Text;

namespace MinutoSeguros.DAO
{
    public class Tag
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual IList<CloudTag> CloudTags { get; set; }
    }
    public class TagDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Counter { get; set; }
    }
}
