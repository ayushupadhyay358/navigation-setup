import { LightningElement, api } from 'lwc';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import ACCOUNT_FAX from '@salesforce/schema/Account.Fax';
import ACCOUNT_WEBSITE from '@salesforce/schema/Account.Website';
import ACCOUNT_EMAIL from '@salesforce/schema/Account.Email__c';

export default class ContactInformation extends LightningElement {
    FIELDS = [ACCOUNT_PHONE, ACCOUNT_FAX, ACCOUNT_WEBSITE, ACCOUNT_EMAIL];

    @api recordId;
    @api objectApiName;

    get isFormReady() {
        return this.recordId && this.objectApiName;
    }
}