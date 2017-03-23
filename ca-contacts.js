/**
 * Created by ekoodi on 20.3.2017.
 */

contactsApp.contacts = (function () {

    var contacts = [];

    return {
        createContact: function(contact){
            //Add contact to array
            contacts.push(contact);
            //Add array to local storage
            contactsApp.contactStore.saveContacts(contacts);
        },
        updateContact: function (contact, index){
            //Update contact in array
            contacts[index] = contact;
            //Add array to local storage
            contactsApp.contactStore.saveContacts(contacts);
        },
        deleteContact: function(index){
            //Delete contact from array
            contacts.splice(index, 1);
            //Add array to local storage
            contactsApp.contactStore.saveContacts(contacts);
        },
        getContact: function(index){
            //Get contact from array
            return contacts[index];
        },
        getContacts: function (){
            //Get contacts array
            return contacts;
        },
        loadContacts: function(){
            //Get contacts array from local storage
            contacts = contactsApp.contactStore.loadContacts();
        }
    };

})();