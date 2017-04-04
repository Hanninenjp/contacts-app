/**
 * Created by ekoodi on 22.3.2017.
 */

contactsApp.contactApi = (function(){

    return {
        createContact: function(contact){
            return $.ajax({
                url: contactsApp.configuration.getContactApiUrl(),
                type: 'POST',
                data: JSON.stringify(contact),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        },
        updateContact: function(index, contact){
            return $.ajax({
                url: contactsApp.configuration.getContactApiUrl() + "/" + index,
                type: 'PUT',
                data: JSON.stringify(contact),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        },
        deleteContact: function(index){
            return $.ajax({
                url: contactsApp.configuration.getContactApiUrl() + "/" + index,
                type: 'DELETE'
            });
        },
        getContacts: function(){
            return $.ajax({
                url: contactsApp.configuration.getContactApiUrl(),
                type: 'GET'
            });
        }
    };

})();