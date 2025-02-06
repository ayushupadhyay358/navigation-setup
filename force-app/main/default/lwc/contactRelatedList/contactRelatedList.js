import { LightningElement,api,wire } from 'lwc';
import getContacts from '@salesforce/apex/accountLWCController.getContacts';
export default class ContactRelatedList extends LightningElement {
    @api recordId;
    @api objectApiName;
    contactData;

    columns = [{ label: 'First Name', fieldName: 'FirstName', type: 'text' },
        { label: 'Last Name', fieldName: 'LastName', type: 'text' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        { label: 'Account', fieldName: 'accountURL', type: 'url', typeAttributes:{label :{fieldName: 'accountName'}, target:'_blank'}}
    ];

    @wire(getContacts,{ accountId: '$recordId' })
    handleContacts({ data, error }) {
        if (data) {
            this.contactData = data.map((record) => {
                const accountName = record.Account.Name;
                const accountURL = `/lightning/r/${record.AccountId}/view`
                return { ...record, accountName, accountURL};
            });
            console.log('Contact Data received -', JSON.stringify(data));
        } else if (error) {
            console.log('Error fetching Contact Data -', JSON.stringify(error));
        }
    }
}