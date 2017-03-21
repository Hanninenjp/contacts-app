/**
 * Created by ekoodi on 21.3.2017.
 */

contactsApp.attributes = (function () {

    var canDelete = true;

    return {
        isCanDelete: function(){
            return canDelete;
        },
        setCanDelete: function(value){
            canDelete = value;
        }
    };
})();