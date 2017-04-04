using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using contacts_app_server.Models;
using contacts_app_server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace contacts_app_server.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {

        private static ContactsService _contactsService = new ContactsService();
        
        // GET: api/contacts
        [HttpGet]
        public IActionResult Get()
        {
            var result = _contactsService.GetContacts();
            //HTTP 200 OK
            return new JsonResult(result);
        }

        // GET api/contacts/id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _contactsService.GetContact(id);
            if (result == null)
            {
                //HTTP 404 Not Found
                return NotFound();
            }
            else
            {
                //HTTP 200 OK
                return new JsonResult(result);
            }
        }

        // POST api/contacts
        [HttpPost]
        public IActionResult Create([FromBody] Contact contact)
        {
            if (contact == null)
            {
                //HTTP 400 Bad Request
                return BadRequest("Invalid");
            }
            var result = _contactsService.CreateContact(contact);
            //HTTP 200 OK
            //Returns created contact, this may be redundant
            return new JsonResult(result);
        }

        // PUT api/contacts/id
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Contact contact)
        {
            if (contact == null)
            {
                //HTTP 400 Bad Request
                return BadRequest("Invalid");
                //Note: empty JSON {} in the request body is not rejected by the parser, but target object is created with default values
                //In the present implementation {} in the request body has the effect that contact is updated and the result will be (in JSON)
                //{ "firstName":"First","lastName":"Last","phone":"Phone","streetAddress":"Address","city":"City"}
            }
            var result = _contactsService.UpdateContact(id, contact);
            if (result == null)
            {
                //HTTP 404 Not Found
                return NotFound();
            }
            else
            {
                //HTTP 200 OK
                //Returns updated contact, this may be redundant
                return new JsonResult(result);
            }
        }

        // DELETE api/contacts/id
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _contactsService.DeleteContact(id);
            if (result == null)
            {
                //HTTP 404 Not Found
                return NotFound();
            }
            else
            {
                //HTTP 200 OK
                //Returns deleted contact, this may be redundant
                //return new JsonResult(result);

                //HTTP 204 No Content
                return new NoContentResult();
            }
        }
    }
}
