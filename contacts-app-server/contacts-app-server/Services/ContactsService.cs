using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using contacts_app_server.Models;
using contacts_app_server.Interfaces;

namespace contacts_app_server.Services
{
    public class ContactsService : IContactsProvider
    {
        //At this phase simply a list is used to store contacts
        private List<Contact> _contactsList = new List<Contact>();

        public ContactsService()
        {
            //No action needed
        }

        public List<Contact> GetContacts()
        {
            return _contactsList;
        }

        public Contact GetContact(int id)
        {
            //Add exception handling
            return _contactsList.Where(c => c.id == id).FirstOrDefault();
        }

        public Contact CreateContact(Contact contact)
        {
            //Add exception handling
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
        }

        public Contact UpdateContact(Contact contact)
        {
            //Add exception handling
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
        }

        public Contact DeleteContact(int id)
        {
            //Add exception handling
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
        }
    }
}
