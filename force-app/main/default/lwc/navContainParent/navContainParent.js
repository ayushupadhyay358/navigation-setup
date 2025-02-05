import { LightningElement, api, wire } from 'lwc';
import {getRecord} from 'lightning/uiRecordApi';
import getFieldData from '@salesforce/apex/navContainerHelper.getFieldData';

export default class NavContainParent extends LightningElement {

    @api recordId;
    @api objectApiName;

    componentRef;

    objectFields = [];

    constructor() {
        super();
    }


    @wire(getRecord,{ recordId: '$recordId', fields: '$objectFields'})
    getRecordData({ data, error }){
        if (data) {
            console.log("Record Data");
            console.log(JSON.stringify(data));
        }
        else if (error) {
            console.log(JSON.stringify(error));
        }
    }

    async connectedCallback() {
        //await this.fetchFieldData();
        await import("c/accountInformation")
        .then(({ default: ctor }) => (this.componentRef = ctor))
        .catch((error) => console.log("Error importing component"));
    }

    fetchFieldData() {
        getFieldData({ ObjectName: this.objectApiName })
            .then((data) => {
                this.objectFields = data; // Populate objectFields
                console.log('Field Data:', JSON.stringify(data));
            })
            .catch((error) => {
                console.error('Error fetching field data:', JSON.stringify(error));
            });
    }
}