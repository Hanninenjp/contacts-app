using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using contacts_app_server.Models;

namespace contacts_app_server.Services
{
    public class ContactsService
    {
        //At this phase simply a list is used to store contacts
        private static List<Contact> _contactsList = new List<Contact>();

        public ContactsService()
        {
            //Generate contacts for development time testing purposes

            for (int i = 0; i < 5; i++)
            {
                Contact contact = new Contact();
                contact.lastName = String.Format("Last{0}", i);
                _contactsList.Add(contact);
            }

        }

        public Contact GetContact(int id)
        {
            return _contactsList.ElementAtOrDefault(id);
        }

        public List<Contact> GetContacts()
        {
            return _contactsList;
        }

        public Contact CreateContact(Contact contact)
        {
            //Returning contact may be redundant
            //Depends on the next phase specifications
            _contactsList.Add(contact);
            return contact;
        }

        public Contact UpdateContact(int id, Contact contact)
        {
            //Returning contact may be redundant
            //Depends on the next phase specifications
            if (IsContact(id))
            {
                _contactsList[id] = contact;
                return contact;
            }
            else
            {
                return null;
            }
        }

        public Contact DeleteContact(int id)
        {
            //Returning contact may be redundant
            //Depends on the next phase specifications
            if (IsContact(id))
            {
                Contact contact = _contactsList.ElementAtOrDefault(id);
                _contactsList.RemoveAt(id);
                return contact;
            }
            else
            {
                return null;
            }
        }

        public bool IsContact(int id)
        {
            return _contactsList.ElementAtOrDefault(id) != null;
        }
    }
}
