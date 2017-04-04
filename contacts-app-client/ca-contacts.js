/**
 * Created by ekoodi on 20.3.2017.
 */

contactsApp.contacts = (function () {

    var contacts = [];

    return {
        createContact: function(contact, contactsUpdated){
            if(contactsApp.configuration.isContactApiEnabled()){
                contactsApp.contactApi.createContact(contact)
                    //Alternatively
                    //.done(function(data, status, jqxhr) {apiContactCreated(data, status, jqxhr, contactsUpdated)}) + "private" function apiContactCreated
                    .done(function(data){
                        contacts.push(data);
                        contactsUpdated(contacts);
                    })
                    .fail(function() {
                        //Error handling could be improved
                        alert("Updating contacts failed!");
                    });
            }
            else{
                contacts.push(contact);
                contactsApp.contactStore.saveContacts(contacts);
                contactsUpdated(contacts);
            }
        },
        updateContact: function (contact, index, contactsUpdated){
            if(contactsApp.configuration.isContactApiEnabled()){
                contactsApp.contactApi.updateContact(index, contact)
                    .done(function(data){
                        contacts[index] = data;
                        contactsUpdated(contacts);
                    })
                    .fail(function() {
                        //Error handling could be improved
                        alert("Updating contacts failed!");
                    });
            }
            else{
                contacts[index] = contact;
                contactsApp.contactStore.saveContacts(contacts);
                contactsUpdated(contacts);
            }

        },
        deleteContact: function(index, contactsUpdated){
            if(contactsApp.configuration.isContactApiEnabled()){
                contactsApp.contactApi.deleteContact(index)
                    .done(function(){
                        contacts.splice(index, 1);
                        contactsUpdated(contacts);
                    })
                    .fail(function(){
                        //Error handling could be improved
                        alert("Updating contacts failed!");
                    });
            }
            else{
                contacts.splice(index, 1);
                contactsApp.contactStore.saveContacts(contacts);
                contactsUpdated(contacts);
            }

        },
        getContact: function(index){
            //Uses locally cached contacts
            return contacts[index];
        },
        loadContacts: function(contactsUpdated){
            if(contactsApp.configuration.isContactApiEnabled()){
                contactsApp.contactApi.getContacts()
                    .done(function(data){
                        contacts = data;
                        contactsUpdated(contacts);
                    })
                    .fail(function(){
                        //Error handling could be improved!
                        alert("Loading contacts failed!");
                    });
            }
            else{
                contacts = contactsApp.contactStore.loadContacts();
                contactsUpdated(contacts);
            }
        }
    };

})();