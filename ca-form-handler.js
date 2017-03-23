/**
 * Created by ekoodi on 21.3.2017.
 */

contactsApp.contactFormView = (function(){

    return{
        validateForm: function(){
            var form = document.getElementById("contactForm");
            return form.reportValidity();
        },
        resetForm: function(){
            var form = document.getElementById("contactForm");
            form.reset();
        },
        getContact: function(){
            var form = document.getElementById("contactForm");
            var contact = contactsApp.contact(
                form.elements["contactFirstName"].value,
                form.elements["contactLastName"].value,
                form.elements["contactPhone"].value,
                form.elements["contactAddress"].value,
                form.elements["contactCity"].value
            );
            return contact;
        },
        setContact: function(contact){
            var form = document.getElementById("contactForm");
            form.elements["contactFirstName"].value = contact.firstName;
            form.elements["contactLastName"].value = contact.lastName;
            form.elements["contactPhone"].value = contact.phone;
            form.elements["contactAddress"].value = contact.streetAddress;
            form.elements["contactCity"].value = contact.city;
        },
        setEditMode: function(index){
            var form = document.getElementById("contactForm");
            //Accessing form, fieldset legend through directly through form does not work as expected
            var legend = document.getElementById("contactLegend");
            legend.innerHTML = "Edit contact";
            form.elements["contactFormActionButton"].value = "Save";
            form.elements["contactFormActionButton"].onclick = function(){
                //alert("contactFormView:editMode:onclick");
                contactsApp.presenter.updateContact(index);
            };
        },
        setCreateMode: function(){
            var form = document.getElementById("contactForm");
            var legend = document.getElementById("contactLegend");
            legend.innerHTML = "Create contact";
            form.elements["contactFormActionButton"].value = "Create";
            form.elements["contactFormActionButton"].onclick = function(){
                //alert("contactFormView:createMode:onclick");
                contactsApp.presenter.createContact();
            };
        }
    };

})();
