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

        //Add service using dependency injection framework
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
            //Returns created contact, with assigned id
            return new JsonResult(result);
        }

        // PUT api/contacts
        [HttpPut]
        public IActionResult Update([FromBody] Contact contact)
        {
            if (contact == null)
            {
                //HTTP 400 Bad Request
                return BadRequest("Invalid");
            }
            var result = _contactsService.UpdateContact(contact);
            if (result == null)
            {
                //Using 404 might not be correct, check the proper status code usage!
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
                //Using 404 might not be correct, check the proper status code usage!
                //HTTP 404 Not Found
                return NotFound();
            }
            else
            {
                //HTTP 204 No Content
                return new NoContentResult();
            }
        }
    }
}
