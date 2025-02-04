import { LightningElement, api, wire } from 'lwc';
import getRecord from 'lightning/uiRecordApi';

export default class NavContainParent extends LightningElement {

    @api recordId;
    @api objectApiName;

    @wire(getRecord,{ recordId: '$recordId', fields: ['Account.FirstName']})
    getRecordData({ data, error }){
        if (data) {
            console.log(JSON.stringify(data));
        }
        else if (error) {
            console.log(JSON.stringify(error));
        }
    }
}