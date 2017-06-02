using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace contacts_app_server.Models
{
    public class Contact
    {
        [Key]
        [Required]
        public int id { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
        [Required]
        public string phone { get; set; }
        [Required]
        public string streetAddress { get; set; }
        [Required]
        public string city { get; set; }
    }
}
