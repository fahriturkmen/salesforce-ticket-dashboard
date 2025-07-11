public with sharing class SupportTicketController {
    @AuraEnabled(cacheable=true)
    public static List<Support_Ticket__c> getRecentTickets() {
        return [
            SELECT Id, Name, Subject__c, Status__c, Priority__c
            FROM Support_Ticket__c
            ORDER BY CreatedDate DESC
            LIMIT 10
        ];
    }
}