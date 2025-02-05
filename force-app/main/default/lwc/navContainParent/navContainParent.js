import { LightningElement, api, wire, track } from 'lwc';

import getConfigList from '@salesforce/apex/navContainerHelper.getConfigList';


export default class NavContainParent extends LightningElement {

    @api recordId;
    @api objectApiName;

    @track componentRef;

    // objectFields = [];
    listConfig;

    constructor() {
        super();
    }

    async connectedCallback() {
        console.log(this.objectApiName);
        //await this.fetchFieldData();
        await import("c/accountInformation")
        .then(({ default: ctor }) => (this.componentRef = ctor))
            .catch((error) => console.log("Error importing component"));
        await this.fetchListData();
    }


    fetchListData() {
        console.log('Fetching list data for object:', this.objectApiName);
        getConfigList({ objectName: this.objectApiName })
            .then((data) => {
                console.log('Data received:', data);
                this.listConfig = data;
                console.log('List config Data', JSON.stringify(this.listConfig));
            }).catch((error) => {
                console.error('Error fetching list config data:', JSON.stringify(error));
        });
    }

    async handleComponentChange(event) {
        const cmpRef = event.target.dataset.cmpname;
        console.log('cmpRef -',cmpRef);
        await import(cmpRef)
        .then(({ default: ctor }) => (this.componentRef = ctor))
            .catch((error) => console.log(JSON.stringify(error)));
    }

    handleListFocus(event) {
        event.target.classList.add("highlight");
    }

    handleListBlur(event) {
        event.target.classList.remove("highlight");
    }
}