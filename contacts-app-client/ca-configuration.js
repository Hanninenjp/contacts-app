/**
 * Created by ekoodi on 23.3.2017.
 */

contactsApp.configuration = (function () {

    var contactApiEnabled = true;
    var contactApiUrl = 'http://localhost:51367/api/contacts';

    return {
        isContactApiEnabled: function(){
            return contactApiEnabled;
        },
        getContactApiUrl: function(){
            return contactApiUrl;
        }
    };
})();