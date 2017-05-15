using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using contacts_app_server.Models;
using contacts_app_server.Interfaces;
using contacts_app_server.Data;

namespace contacts_app_server.Services
{
    public class ContactsService : IContactsRepository
    {
        //At this phase simply a list is used to store contacts
        //Old
        //private List<Contact> _contactsList = new List<Contact>();
        //End old

        //Database context
        private ContactsContext _context;

        public ContactsService(ContactsContext context)
        {
            _context = context;
        }

        public List<Contact> GetContacts()
        {
            //Old
            //return _contactsList;
            //End old

            //Db
            return _context.Contacts.ToList<Contact>();
            //End db
        }

        public Contact GetContact(int id)
        {
            //Add exception handling

            //Old
            //return _contactsList.Where(c => c.id == id).FirstOrDefault();
            //End old

            //Db
            return _context.Contacts.Where<Contact>(c => c.id == id).FirstOrDefault();
            //End db
        }

        public Contact CreateContact(Contact contact)
        {
            //Add exception handling

            //Old
            /*
            if (_contactsList.Count > 0)
            {
                int maxId = _contactsList.Select(c => c.id).Max();
                contact.id = maxId + 1;
            }
            else
            {
                contact.id = 1;
            }
            _contactsList.Add(contact);
            return contact;
            */
            //End old

            //Db
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return contact;
            //End db
        }

        public Contact UpdateContact(int id, Contact contact)
        {
            //Add exception handling

            //Old
            /*
            if (id != contact.id)
            {
                return null;
            }
            if (_contactsList.Exists(c => c.id == contact.id))
            {
                int index = _contactsList.FindIndex(c => c.id == contact.id);
                _contactsList[index] = contact;
                return contact;
            }
            else
            {
                return null;
            }
            */
            //End old

            //Db
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
            //End db

        }

        public Contact DeleteContact(int id)
        {
            //Add exception handling

            //Old
            /*
            if (_contactsList.Exists(c => c.id == id))
            {
                int index = _contactsList.FindIndex(c => c.id == id);
                Contact contact = _contactsList.ElementAtOrDefault(index);
                _contactsList.RemoveAt(index);
                return contact;
            }
            else
            {
                return null;
            }
            */
            //End old

            //Db
            Contact contact = _context.Contacts.Where<Contact>(c => c.id == id).FirstOrDefault();
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                _context.SaveChanges();
            }
            return contact;
            //End db

        }
    }
}
