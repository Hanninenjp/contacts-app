/**
 * Created by ekoodi on 16.3.2017.
 */

window.onload = function (){
    //Load stored contacts
    loadContacts();
    //Set form action button event handler
    //This could be handled differently
    var button = document.querySelector("#contactFormActionButton");
    button.onclick = function() {
        createContact();
    };
};

function createContact(){
    if(!validateContactForm()){
        return false;
    }
    var contact = getContactFormContact();
    contactsApp.contacts.createContact(contact);
    updateContactsTable();
    resetContactForm();
    return false;
}

function editContact(index){
    contactsApp.attributes.setCanDelete(false);
    setContactFormEditMode(index);
    var contact = contactsApp.contacts.getContact(index);
    setContactFormContact(contact);
    return false;
}

function updateContact(index) {
    if(!validateContactForm()){
        return false;
    }
    var contact = getContactFormContact();
    contactsApp.contacts.updateContact(contact, index);
    updateContactsTable();
    resetContactForm();
    setContactFormCreateMode();
    contactsApp.attributes.setCanDelete(true);
    return false;
}

function deleteContact(index){
    if(contactsApp.attributes.isCanDelete()){
        contactsApp.contacts.deleteContact(index);
        updateContactsTable();
        return false;
    }
    else{
        alert("Finish Edit first!");
        return false;
    }
}

function loadContacts(){
    contactsApp.contacts.loadContacts();
    updateContactsTable();
}