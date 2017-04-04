/**
 * Created by ekoodi on 22.3.2017.
 */

contactsApp.presenter = (function () {

    window.addEventListener("load", initContactsApp);

    function initContactsApp(){
        contactsApp.contacts.loadContacts(contactsUpdated);
        contactsApp.contactFormView.setCreateMode();
    }

    function contactsUpdated(contacts){
        contactsApp.contactTableView.updateTable(contacts);
    }

    return{
        createContact: function(){
            if(!contactsApp.contactFormView.validateForm()){
                return false;
            }
            var contact = contactsApp.contactFormView.getContact();
            contactsApp.contacts.createContact(contact, contactsUpdated);
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
            contactsApp.contactFormView.resetForm();
            contactsApp.contactFormView.setCreateMode();
            contactsApp.contacts.updateContact(contact, index, contactsUpdated);
            contactsApp.attributes.setCanDelete(true);
            return false;
        },
        deleteContact: function (index) {
            if(contactsApp.attributes.isCanDelete()){
                contactsApp.contacts.deleteContact(index, contactsUpdated);
                return false;
            }
            else{
                alert("Finish Edit first!");
                return false;
            }
        }
    };

})();