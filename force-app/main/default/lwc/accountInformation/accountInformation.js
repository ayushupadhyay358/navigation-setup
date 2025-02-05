import { LightningElement,api } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_PARENT from '@salesforce/schema/Account.ParentId';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_NUMBER from '@salesforce/schema/Account.AccountNumber';
import ACCOUNT_ACTIVE from '@salesforce/schema/Account.Active__c';
import ACCOUNT_OWNER from '@salesforce/schema/Account.OwnerId';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
import ACCOUNT_OWNERSHIP from '@salesforce/schema/Account.Ownership';
import ACCOUNT_SITE from '@salesforce/schema/Account.Site';

export default class AccountInformation extends LightningElement {
    @api recordId;
    @api objectApiName;
    FIELDS = [ACCOUNT_NAME, ACCOUNT_ACTIVE, ACCOUNT_PARENT, ACCOUNT_OWNER, ACCOUNT_INDUSTRY, ACCOUNT_RATING, ACCOUNT_TYPE, ACCOUNT_OWNERSHIP, ACCOUNT_NUMBER, ACCOUNT_SITE];
    connectedCallback() {
        console.log("Hello");
    }

    get isFormReady() {
        return this.recordId && this.objectApiName;
    }
}