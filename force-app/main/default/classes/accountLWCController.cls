public with sharing class accountLWCController {
    public accountLWCController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String accountId){
        try {
            List<Contact> contList = [Select FirstName,LastName,Account.Name,Phone,Email,Id from Contact where AccountId = :accountId];
            System.debug(contList);
            return contList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}