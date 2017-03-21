/**
 * Created by ekoodi on 21.3.2017.
 */

function updateContactsTable(){

    //Clear table body
    var table = document.getElementById("contactTableBody");
    while (table.rows.length > 0){
        table.deleteRow(0);
    }
    //Add contact rows
    //Add check for null!!!
    var contacts = contactsApp.contacts.getContacts();

    for (var i = 0; i < contacts.length; i++){
        addContactsTableRow(contacts[i]);
    }
}

function addContactsTableRow(contact) {

    var contactViewData = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        address: contact.streetAddress + ", " + contact.city
    };

    //Get table body
    var table = document.getElementById("contactTableBody");

    //Insert row in the end of the body
    var row = table.insertRow(-1);

    //Insert contact data cells in the row
    var contactFirstName = row.insertCell(0);
    var contactLastName = row.insertCell(1);
    var contactPhone = row.insertCell(2);

    //Add contact view data
    contactFirstName.innerHTML = contactViewData.firstName;
    contactLastName.innerHTML = contactViewData.lastName;
    contactPhone.innerHTML = contactViewData.phone;

    //Add address cell with anchor tag
    var addressCell = row.insertCell(3);
    var link = document.createElement("a");
    link.setAttribute("href", "https://www.google.fi/maps/place/" + contact.streetAddress + ",+" + contact.city);
    link.setAttribute("target", "_blank");
    //link.className = "class";
    var text = document.createTextNode(contactViewData.address);
    link.appendChild(text);
    addressCell.appendChild(link);

    //Add edit button
    var editCell = row.insertCell(4);
    var editButton = document.createElement('input');
    editButton.type = "button";
    editButton.className = "tableButton tableEditButton";
    editButton.value = "Edit";
    editButton.onclick = function(){
        editContact(row.rowIndex - 1);
    };
    editCell.appendChild(editButton);

    //Add delete button
    var deleteCell = row.insertCell(5);
    var deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.className = "tableButton tableDeleteButton";
    deleteButton.value = "Delete";
    deleteButton.onclick = function() {
        deleteContact(row.rowIndex - 1);
    };
    deleteCell.appendChild(deleteButton);

}