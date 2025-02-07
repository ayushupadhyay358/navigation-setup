import { LightningElement, api, wire, track } from 'lwc';

import getConfigList from '@salesforce/apex/navContainerHelper.getConfigList';


export default class NavContainParent extends LightningElement {

    @api recordId;
    @api objectApiName;

    @track componentRef;

    @track componentList = {};

    // objectFields = [];
    @track listConfig = [];

    constructor() {
        super();
    }

    async connectedCallback() {
        console.log(this.objectApiName);
        //await this.fetchFieldData();
        await this.fetchListData();

        this.componentRef = this.componentList[Object.keys(this.componentList)[0]];

        // await import("c/accountInformation")
        // .then(({ default: ctor }) => (this.componentRef = ctor))
        //     .catch((error) => console.log("Error importing component"));
    }


    async fetchListData() {
        console.log('Fetching list data for object:', this.objectApiName);
        await getConfigList({ objectName: this.objectApiName })
            .then((data) => {
                console.log('Data received:', data);
                this.listConfig = data;
                console.log('List config Data', JSON.stringify(this.listConfig));
                // this.listConfig.forEach(config => {
                //     const cmpRef = undefined;
                //     import(config.Component_Name__c)
                //         .then(({ default: ctor }) => (cmpRef = ctor))
                //         .catch((error) => console.log(JSON.stringify(error)));
                //     this.componentList[config.Component_Name__c] = cmpRef;
                // });

            }).catch((error) => {
                console.error('Error fetching list config data:', JSON.stringify(error));
            });
        
        for (const config of this.listConfig) {
            try {
                const module = await import(config.Component_Name__c);
                console.log('Module imported -',config.Component_Name__c)
                this.componentList[config.Component_Name__c] = module.default;
            } catch (error) {
                console.log(JSON.stringify(error));
            }
        }
    }

    async handleComponentChange(event) {
        const cmpRef = event.target.dataset.cmpname;
        // console.log('cmpRef -',cmpRef);
        // await import(cmpRef)
        // .then(({ default: ctor }) => (this.componentRef = ctor))
        //     .catch((error) => console.log(JSON.stringify(error)));
        this.componentRef = this.componentList[cmpRef];
    }

    handleMouseEnter(event) {
        event.target.classList.add("highlight");
        console.log(event.target.classList);
    }

    handleMouseLeave(event) {
        event.target.classList.remove("highlight");
        console.log(event.target.classList);
    }
}