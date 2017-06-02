using System.ComponentModel.DataAnnotations;

namespace contacts_app_server.Models
{
    public class ApplicationUserModel
    {
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string firstName { get; set; }
        [Required]
        public string lastName { get; set; }
    }
}
