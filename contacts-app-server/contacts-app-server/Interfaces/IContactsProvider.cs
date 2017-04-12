using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using contacts_app_server.Models;

namespace contacts_app_server.Interfaces
{
    public interface IContactsProvider
    {
        List<Contact> GetContacts();
        Contact GetContact(int id);
        Contact CreateContact(Contact contact);
        Contact UpdateContact(Contact contact);
        Contact DeleteContact(int id);
    }
}
