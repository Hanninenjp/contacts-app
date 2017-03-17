/**
 * Created by ekoodi on 16.3.2017.
 */

window.onload = function (){
    //Load contacts from local storage
    //Error handling should be added!
    loadContacts();
    //Set form action button event handler
    var button = document.querySelector("#contactFormActionButton");
    button.onclick = function() {
        contactSubmit();
    }
}

var contactsArray = [];
var canDelete = true;

function contactSubmit() {

    /*
    var contact = {
        firstName: document.getElementById("contactFirstName").value,
        lastName: document.getElementById("contactLastName").value,
        phone: document.getElementById("contactPhone").value,
        address: document.getElementById("contactAddress").value,
        city: document.getElementById("contactCity").value
    };
    */

    //Validate form
    if(!document.contactForm.checkValidity()){
        return false;
    }

    //Get contact data from form
    //This could be done differently
    var contactData = {
        firstName: document.contactForm.contactFields.elements["contactFirstName"].value,
        lastName: document.contactForm.contactFields.elements["contactLastName"].value,
        phone: document.contactForm.contactFields.elements["contactPhone"].value,
        address: document.contactForm.contactFields.elements["contactAddress"].value,
        city: document.contactForm.contactFields.elements["contactCity"].value
    };

    //Store contacts to array and local storage
    contactsArray.push(contactData);
    storeContacts();

    //Update contacts table
    updateContacts();

    //Reset contact form
    document.contactForm.reset();

    return false;
}

function storeContacts() {

    //!!!Add check for browser support!!!

    //Store contacts to local storage
    localStorage.clear();
    localStorage.setItem("contactsArray", JSON.stringify(contactsArray));
    //console.log("Array: " + contactsArray);
    //console.log("Storage: " + JSON.parse(localStorage.getItem("contactsArray")));
}

function loadContacts() {

    //!!!Add check for browser support!!!

    //Get contacts from local storage
    var storageItem = localStorage.getItem("contactsArray");
    if (storageItem !== null){
        contactsArray = JSON.parse(storageItem);
        if (contactsArray !== null){
            for(var i = 0; i < contactsArray.length; i++){
                addContact(contactsArray[i]);
            }
        }
    }
}

function clearStorage() {
    //For development time testing purposes
    localStorage.clear();
}

function addContact(contactData) {

    var contactViewData = {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        phone: contactData.phone,
        address: contactData.address + ", " + contactData.city
    };

    //Get table body
    var table = document.getElementById("contactTableBody");

    //Insert row in the end of the body
    var row = table.insertRow(-1);

    //Insert contact data cells in the row
    var contactFirstName = row.insertCell(0);
    var contactLastName = row.insertCell(1);
    var contactPhone = row.insertCell(2);
    var contactAddress = row.insertCell(3);

    //Add contact view data
    contactFirstName.innerHTML = contactViewData.firstName;
    contactLastName.innerHTML = contactViewData.lastName;
    contactPhone.innerHTML = contactViewData.phone;
    contactAddress.innerHTML = contactViewData.address;
    contactAddress.className = "tableAddress";
    //Add event handler for opening map
    contactAddress.onclick = function() {
        openMap(row.rowIndex - 1);
    }

    //Add edit button
    var editCell = row.insertCell(4);
    var editButton = document.createElement('input');
    editButton.type = "button";
    editButton.className = "tableButton tableEditButton";
    editButton.value = "Edit";
    editButton.onclick = function(){
        editContact(row.rowIndex -1);
    }
    editCell.appendChild(editButton);

    //Add delete button
    var deleteCell = row.insertCell(5);
    var deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.className = "tableButton tableDeleteButton";
    deleteButton.value = "Delete";
    deleteButton.onclick = function() {
        deleteContact(row.rowIndex - 1);
    }
    deleteCell.appendChild(deleteButton);

}

function updateContacts(){
    //Clear table and add contact elements from array
    var table = document.getElementById("contactTableBody");
    while (table.rows.length > 0){
        table.deleteRow(0);
    }
    //Add check for null!!!
    for (var i = 0; i < contactsArray.length; i++){
        addContact(contactsArray[i]);
    }
}

function deleteContact(index){
    if(canDelete === true){
        //Remove contact element
        contactsArray.splice(index, 1);
        //Clear table and add contact elements from array
        var table = document.getElementById("contactTableBody");
        while (table.rows.length > 0){
            table.deleteRow(0);
        }
        //Add check for null!!!
        for (var i = 0; i < contactsArray.length; i++){
            addContact(contactsArray[i]);
        }
    }
    else{
        alert("Finish Edit first!");
    }
}

function editContact(index){
    //Disable all deletes during edit
    canDelete = false;
    //Set form legend and action button text to reflect edit
    var legend = document.querySelector("#contactLegend");
    legend.innerHTML = "Edit contact";
    var button = document.querySelector("#contactFormActionButton");
    button.value = "Save";

    //Set event handler
    button.onclick = function() {
        saveContact(index);
    }

    //Set form fields
    document.contactForm.contactFields.elements["contactFirstName"].value = contactsArray[index].firstName;
    document.contactForm.contactFields.elements["contactLastName"].value = contactsArray[index].lastName;
    document.contactForm.contactFields.elements["contactPhone"].value = contactsArray[index].phone;
    document.contactForm.contactFields.elements["contactAddress"].value = contactsArray[index].address;
    document.contactForm.contactFields.elements["contactCity"].value = contactsArray[index].city;
}

function saveContact(index){

    //Validate form
    if(!document.contactForm.checkValidity()){
        return false;
    }

    var contactData = {
        firstName: document.contactForm.contactFields.elements["contactFirstName"].value,
        lastName: document.contactForm.contactFields.elements["contactLastName"].value,
        phone: document.contactForm.contactFields.elements["contactPhone"].value,
        address: document.contactForm.contactFields.elements["contactAddress"].value,
        city: document.contactForm.contactFields.elements["contactCity"].value
    };

    //Update contact element and store contacts
    contactsArray[index] = contactData;
    storeContacts();

    //Update contacts table
    updateContacts();

    //Reset form
    document.contactForm.reset();

    //Reset event handler
    var button = document.querySelector("#contactFormActionButton");
    //button.value = "Create";
    //button.onclick = null;
    button.onclick = function() {
        contactSubmit();
    }
    //Enable deletes after edit is completed
    canDelete = true;
    return false;
}

function openMap(index){
    address = contactsArray[index].address + ",+" + contactsArray[index].city;
    window.open("https://www.google.fi/maps/place/" + address);
    //alert(address);
}

/* About MDL:
 https://getmdl.io/started/index.html#dynamic
 Material Design Lite will automatically register and render all elements marked with MDL classes upon page load. However in the case where you are creating DOM elements dynamically you need to register new elements using the upgradeElement function. Here is how you can dynamically create the same raised button with ripples shown in the section above:

 <div id="container"/>
 <script>
 var button = document.createElement('button');
 var textNode = document.createTextNode('Click Me!');
 button.appendChild(textNode);
 button.className = 'mdl-button mdl-js-button mdl-js-ripple-effect';
 componentHandler.upgradeElement(button);
 document.getElementById('container').appendChild(button);
 </script>
 */