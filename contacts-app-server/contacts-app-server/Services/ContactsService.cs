using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using contacts_app_server.Models;
using contacts_app_server.Interfaces;
using contacts_app_server.Data;

namespace contacts_app_server.Services
{

    //Exception handling is currently not implemented

    public class ContactsService : IContactsRepository
    {
        private ContactsContext _context;

        public ContactsService(ContactsContext context)
        {
            _context = context;
        }

        public List<Contact> GetContacts()
        {
            return _context.Contacts.ToList<Contact>();
        }

        public Contact GetContact(int id)
        {
            return _context.Contacts.Where<Contact>(c => c.id == id).FirstOrDefault();
        }

        public Contact CreateContact(Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return contact;
        }

        public Contact UpdateContact(int id, Contact contact)
        {
            if (id != contact.id)
            {
                return null;
            }
            if (_context.Contacts.Any<Contact>(c => c.id == contact.id))
            {
                _context.Contacts.Update(contact);
                _context.SaveChanges();
                return contact;
            }
            else
            {
                return null;
            }
        }

        public Contact DeleteContact(int id)
        {
            Contact contact = _context.Contacts.Where<Contact>(c => c.id == id).FirstOrDefault();
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                _context.SaveChanges();
            }
            return contact;
        }
    }
}
