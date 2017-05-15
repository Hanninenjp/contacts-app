using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using contacts_app_server.Models;

namespace contacts_app_server.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ContactsContext context)
        {
            context.Database.EnsureCreated();

            if (context.Contacts.Any())
            {
                return;
            }

            var contacts = new Contact[]
            {
                new Contact{firstName="First", lastName="Contact", phone="0401234567", streetAddress="Laserkatu 10", city="Lappeenranta"},
                new Contact{firstName="Second", lastName="Contact", phone="0401234567", streetAddress="Laserkatu 10", city="Lappeenranta"},
                new Contact{firstName="Third", lastName="Contact", phone="0401234567", streetAddress="Laserkatu 10", city="Lappeenranta"}
            };
            foreach(Contact c in contacts)
            {
                context.Contacts.Add(c);
            }
            context.SaveChanges();
        }
    }
}
