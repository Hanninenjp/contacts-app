using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using contacts_app_server.Models;
using contacts_app_server.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace contacts_app_server.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {

        private readonly IContactsProvider _contactsService;

        public ContactsController(IContactsProvider contactsProvider)
        {
            _contactsService = contactsProvider;
        }
        
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
                //HTTP 400 Bad Request
                return BadRequest("Invalid");
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
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Contact contact)
        {
            if (contact == null)
            {
                //!!!
                //Implementation should be improved to properly handle cases where the received json does not define
                //values for all the properties, for example, json {"id":N}, where N is an id of an existing contact
                //has the effect that all the properties, except for id are assigned value null
                //!!!

                //HTTP 400 Bad Request
                return BadRequest("Invalid");
            }
            var result = _contactsService.UpdateContact(id, contact);
            if (result == null)
            {
                //HTTP 400 Bad Request
                return BadRequest("Invalid");
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
                //HTTP 400 Bad Request
                return BadRequest("Invalid");
            }
            else
            {
                /*
                //HTTP 204 No Content
                return new NoContentResult();
                */

                //HTTP 200 OK
                //Returns removed contact, this may be redundant
                return new JsonResult(result);
            }
        }
    }
}
