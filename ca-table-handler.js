/**
 * Created by ekoodi on 21.3.2017.
 */

contactsApp.contactTableView = (function () {

    function addRow(contact){
        //alert(JSON.stringify(contact));
        //Get table body
        var table = document.getElementById("contactTableBody");

        //Insert row in the end of the body
        var row = table.insertRow(-1);

        //Insert contact data cells in the row
        var firstNameCell = row.insertCell(0);
        var lastNameCell = row.insertCell(1);
        var phoneCell = row.insertCell(2);

        //Add contact view data
        firstNameCell.innerHTML = contact.firstName;
        lastNameCell.innerHTML = contact.lastName;
        phoneCell.innerHTML = contact.phone;

        //Add address cell with anchor tag
        var addressCell = row.insertCell(3);
        var link = document.createElement("a");
        link.setAttribute("href", "https://www.google.fi/maps/place/" + contact.streetAddress + ",+" + contact.city);
        link.setAttribute("target", "_blank");
        //link.className = "class";
        var text = document.createTextNode(contact.streetAddress + ", " + contact.city);
        link.appendChild(text);
        addressCell.appendChild(link);

        //Add edit button
        var editCell = row.insertCell(4);
        var editButton = document.createElement('input');
        editButton.type = "button";
        editButton.className = "tableButton tableEditButton";
        editButton.value = "Edit";
        editButton.onclick = function(){
            contactsApp.presenter.editContact(row.rowIndex - 1);
        };
        editCell.appendChild(editButton);

        //Add delete button
        var deleteCell = row.insertCell(5);
        var deleteButton = document.createElement('input');
        deleteButton.type = "button";
        deleteButton.className = "tableButton tableDeleteButton";
        deleteButton.value = "Delete";
        deleteButton.onclick = function() {
            contactsApp.presenter.deleteContact(row.rowIndex - 1);
        };
        deleteCell.appendChild(deleteButton);
    }

    return {
        updateTable: function(contacts){
            //alert(JSON.stringify(contacts));
            //Clear table body
            var table = document.getElementById("contactTableBody");
            while (table.rows.length > 0){
                table.deleteRow(0);
            }
            //Add contact rows
            for (var i = 0; i < contacts.length; i++){
                addRow(contacts[i]);
            }
        }
    };

})();
