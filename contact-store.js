/**
 * Created by ekoodi on 20.3.2017.
 */

contactsApp.contactStore = (function(){

    var contactLocalStorageKey = 'ca-contacts';

    if(!localStorage.getItem(contactLocalStorageKey)){
        //Store key to the local storage, with empty table
        localStorage.setItem(contactLocalStorageKey, JSON.stringify([]));
    }

    function loadContactsFromLocalStorage(){
        var storageElement = localStorage.getItem(contactLocalStorageKey);
        return JSON.parse(storageElement);
    }

    function saveContactsToLocalStorage (contacts){
        localStorage.setItem(contactLocalStorageKey, JSON.stringify(contacts));
    }

    return {
        saveContacts: function (contacts){
            saveContactsToLocalStorage(contacts);
        },
        loadContacts: function(){
            var contacts = loadContactsFromLocalStorage();
            return contacts;
        }
    };

})();