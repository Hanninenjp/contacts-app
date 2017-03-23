/**
 * Created by ekoodi on 22.3.2017.
 */

contactsApp.presenter = (function () {

    window.addEventListener("load", initContactsApp);

    function initContactsApp(){
        contactsApp.contacts.loadContacts();
        var contacts = contactsApp.contacts.getContacts();
        contactsApp.contactTableView.updateTable(contacts);
        contactsApp.contactFormView.setCreateMode();
    }

    return{
        createContact: function(){
            if(!contactsApp.contactFormView.validateForm()){
                return false;
            }
            var contact = contactsApp.contactFormView.getContact();
            contactsApp.contacts.createContact(contact);
            var contacts = contactsApp.contacts.getContacts();
            contactsApp.contactTableView.updateTable(contacts);
            contactsApp.contactFormView.resetForm();
            return false;
        },
        editContact: function (index) {
            contactsApp.attributes.setCanDelete(false);
            contactsApp.contactFormView.setEditMode(index);
            var contact = contactsApp.contacts.getContact(index);
            contactsApp.contactFormView.setContact(contact);
            return false;
        },
        updateContact: function (index) {
            if(!contactsApp.contactFormView.validateForm()){
                return false;
            }
            var contact = contactsApp.contactFormView.getContact();
            contactsApp.contacts.updateContact(contact, index);
            var contacts = contactsApp.contacts.getContacts();
            contactsApp.contactTableView.updateTable(contacts);
            contactsApp.contactFormView.resetForm();
            contactsApp.contactFormView.setCreateMode();
            contactsApp.attributes.setCanDelete(true);
            return false;
        },
        deleteContact: function (index) {
            if(contactsApp.attributes.isCanDelete()){
                contactsApp.contacts.deleteContact(index);
                var contacts = contactsApp.contacts.getContacts();
                contactsApp.contactTableView.updateTable(contacts);
                return false;
            }
            else{
                alert("Finish Edit first!");
                return false;
            }
        }
    };

})();