using System;
using System.Collections.Generic;
using System.Text;

namespace MinutoSeguros.DAO
{
    public class CloudTag
    {
        public int ID { get; set; }
        public int Count { get; set; }
        
        public Post Post { get; set; }
        public int PostID { get; set; }
        
        public Tag Tag { get; set; }
        public int TagID { get; set; }
    }

    public class CloudTagDTO
    {
        public int PostID { get; set; }
        public string Tag { get; set; }
        public int Counter { get; set; }
    }

}
