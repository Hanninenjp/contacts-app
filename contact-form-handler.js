/**
 * Created by ekoodi on 21.3.2017.
 */

function validateContactForm(){
    return document.contactForm.reportValidity();
}

function resetContactForm(){
    document.contactForm.reset();
}

function getContactFormContact(){

    var contact = contactsApp.contact(
        document.contactForm.contactFields.elements["contactFirstName"].value,
        document.contactForm.contactFields.elements["contactLastName"].value,
        document.contactForm.contactFields.elements["contactPhone"].value,
        document.contactForm.contactFields.elements["contactAddress"].value,
        document.contactForm.contactFields.elements["contactCity"].value
    );
    return contact;
}

function setContactFormContact(contact) {
    document.contactForm.contactFields.elements["contactFirstName"].value = contact.firstName;
    document.contactForm.contactFields.elements["contactLastName"].value = contact.lastName;
    document.contactForm.contactFields.elements["contactPhone"].value = contact.phone;
    document.contactForm.contactFields.elements["contactAddress"].value = contact.streetAddress;
    document.contactForm.contactFields.elements["contactCity"].value = contact.city;
}

function setContactFormEditMode(index){
    //Consider using different method in getting the DOM elements
    var legend = document.querySelector("#contactLegend");
    legend.innerHTML = "Edit contact";
    var button = document.querySelector("#contactFormActionButton");
    button.value = "Save";
    button.onclick = function(){
        updateContact(index);
    };
}

function setContactFormCreateMode(){
    var legend = document.querySelector("#contactLegend");
    legend.innerHTML = "New contact";
    var button = document.querySelector("#contactFormActionButton");
    button.value = "Create";
    button.onclick = function(){
        createContact();
    }
}

