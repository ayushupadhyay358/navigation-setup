public with sharing class navContainerHelper {
    public navContainerHelper() {

    }

    @AuraEnabled
    public static List<String> methodName(String ObjectName){
        try {
            List<String> fields = new List<String>();
            Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(ObjectName); // Getting the sObject type for the object for which the fields need to be fetched
            Schema.DescribeSObjectResult result = sObjectType.getDescribe(); // Getting sobject result to fetch the fields property
            Map<String, Schema.SObjectField> fieldMap = result.fields.getMap(); // Getting a map of fields for the object

            for(String field : fieldMap.keySet()) {
                Schema.SObjectField sobjField = fieldMap.get(field);
                String FieldName = sobjField.getDescribe().getName();
	            fields.add(FieldName);
            }

            return fields;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}