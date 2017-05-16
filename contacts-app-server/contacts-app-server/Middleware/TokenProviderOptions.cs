using System;
using Microsoft.IdentityModel.Tokens;

namespace contacts_app_server.Middleware
{
    public class TokenProviderOptions
    {
        public string Path { get; set; } = "/token"; //Fix the path in the final version!!!

        public string Issuer { get; set; }

        public string Audience { get; set; }

        public TimeSpan Expiration { get; set; } = TimeSpan.FromMinutes(60);

        public SigningCredentials SigningCredentials { get; set; }
    }
}
