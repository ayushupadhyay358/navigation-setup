public with sharing class navContainerHelper {
    public navContainerHelper() {

    }

    @AuraEnabled(cacheable=true)
    public static List<List_Configuration__c> getConfigList(String objectName){
        try {
            System.debug('Object Name received: ' + objectName);
            List<List_Configuration__c> configList = [
                SELECT Component_Name__c, Label__c, Order__c 
                FROM List_Configuration__c 
                WHERE Object_API_Name__c = :objectName
                ORDER BY Order__c ASC // Sort by Order__c
            ];
            System.debug('Config List: ' + configList);
            return configList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getFieldData(String objectName){
        try {
            List<String> fields = new List<String>();
            Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(objectName); // Getting the sObject type for the object for which the fields need to be fetched
            Schema.DescribeSObjectResult result = sObjectType.getDescribe(); // Getting sobject result to fetch the fields property
            Map<String, Schema.SObjectField> fieldMap = result.fields.getMap(); // Getting a map of fields for the object

            for(String field : fieldMap.keySet()) {
                Schema.SObjectField sobjField = fieldMap.get(field);
                String FieldName = sobjField.getDescribe().getName();
	            fields.add(ObjectName + '.' + FieldName);
            }
            System.debug(fields);
            return fields;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}