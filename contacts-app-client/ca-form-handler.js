/**
 * Created by ekoodi on 21.3.2017.
 */

contactsApp.contactFormView = (function(){

    return{
        validateForm: function(){
            var form = document.getElementById("ca-contact-form");
            return form.reportValidity();
        },
        resetForm: function(){
            var form = document.getElementById("ca-contact-form");
            form.reset();
        },
        getContact: function(){
            var contact = contactsApp.contact(
                document.getElementById("ca-contact-form-first-name").value,
                document.getElementById("ca-contact-form-last-name").value,
                document.getElementById("ca-contact-form-phone").value,
                document.getElementById("ca-contact-form-street-address").value,
                document.getElementById("ca-contact-form-city").value
            );
            return contact;
        },
        setContact: function(contact){
            document.getElementById("ca-contact-form-first-name").value = contact.firstName;
            document.getElementById("ca-contact-form-last-name").value = contact.lastName;
            document.getElementById("ca-contact-form-phone").value = contact.phone;
            document.getElementById("ca-contact-form-street-address").value = contact.streetAddress;
            document.getElementById("ca-contact-form-city").value = contact.city;
        },
        setEditMode: function(index){
            document.getElementById("ca-contact-form-title-text").innerHTML = "Edit contact";
            document.getElementById("ca-contact-form-action-button").innerHTML = "Save";
            document.getElementById("ca-contact-form-action-button").onclick = function(){
                contactsApp.presenter.updateContact(index);
            };
        },
        setCreateMode: function(){
            document.getElementById("ca-contact-form-title-text").innerHTML = "Create contact";
            document.getElementById("ca-contact-form-action-button").innerHTML = "Create";
            document.getElementById("ca-contact-form-action-button").onclick = function(){
                contactsApp.presenter.createContact();
            };
        }

    };

})();
