using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Diagnostics;
using contacts_app_server.Models;
using contacts_app_server.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace contacts_app_server.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AccountsController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        // POST api/accounts
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Registration failed");
            }

            //Following could be refactored
            ApplicationUser user = new ApplicationUser();
            user.UserName = model.email;
            user.Email = model.email;
            user.firstName = model.firstName;
            user.lastName = model.lastName;

            //UserManager creates the user in the database
            var result = await _userManager.CreateAsync(user, model.password);
            if (!result.Succeeded)
            {
                return BadRequest("Registration failed");
            }

            //Alternatively
            //return new OkResult();

            return new JsonResult(model);
        }
    }
}
