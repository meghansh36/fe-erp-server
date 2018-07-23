import * as _ from 'lodash';
import { Injectable } from '@angular/core';

@Injectable()
export class FeFormJsonService {

    MasterJSON = {
        id: '',
        code: '',
        formLabel: '',
        name: '',
        type: '',
        disabled: false,
        hidden: false,
        disableCondition: '',
        showCondition: '',
        active: true,
        help: '',
        components: {},
        buttons: {}
    };

    finalJSON;
    DOMComponentArray: any = [];

    getMasterJSON() {
        return this.MasterJSON;
    }

    setMasterJSON(masterJson) {
        this.MasterJSON = masterJson;
    }

    addComponentToMasterJSON(key, componentRef, parent, index) {
        /* let targetClassesArr;
        if (populateMasterForm) {
            targetClassesArr = [parent.className];
            componentRef.parentClass = targetClassesArr[0];
        } else {
            targetClassesArr = parent.className.trim().split(" ");
            componentRef.parentClass = targetClassesArr[1];
        }

        componentRef.parent = parent.id;
        componentRef.order = index;
        if (_.includes(targetClassesArr, 'customDropZone') || _.includes(targetClassesArr, 'FSTdropZone')) {
            this.MasterJSON.components = _.merge(this.MasterJSON.components, {[key]: componentRef});
        } else if (_.includes(targetClassesArr, 'buttonDropZone')) {
            this.MasterJSON.buttons = _.merge(this.MasterJSON.buttons, {[key]: componentRef});
        }

        if (parent.id !== 'root_drop') {
            this.MasterJSON.components[parent.id].components[index] 
        } */

        if (parent === 'root_drop') {
            this.MasterJSON.components = _.merge(this.MasterJSON.components, { [key]: componentRef });
            this.MasterJSON.components[key].instance.properties.key = key;
            this.MasterJSON.components[key].instance.properties.order = index;
            this.MasterJSON.components[key].instance.properties.parent = parent;
            this.MasterJSON.components[key].instance.properties.componentName = componentRef.componentType.name;
        } else if (parent === 'button_drop') {
            this.MasterJSON.buttons = _.merge(this.MasterJSON.buttons, { [key]: componentRef });
            this.MasterJSON.buttons[key].instance.properties.key = key;
            this.MasterJSON.buttons[key].instance.properties.order = index;
            this.MasterJSON.buttons[key].instance.properties.parent = parent;
            this.MasterJSON.buttons[key].instance.properties.componentName = componentRef.componentType.name;
        } else {
            // create flat json
            this.MasterJSON.components = _.merge(this.MasterJSON.components, { [key]: componentRef });
            this.MasterJSON.components[key].instance.properties.key = key;
            this.MasterJSON.components[key].instance.properties.order = index;
            this.MasterJSON.components[key].instance.properties.parent = parent;
            this.MasterJSON.components[key].instance.properties.componentName = componentRef.componentType.name;
            // copy to container component array
            // tslint:disable-next-line:max-line-length
            this.MasterJSON.components[parent].instance.properties.components.splice(index, 0, this.MasterJSON.components[key].instance.properties);
            console.log("possible error in addComponent", this.MasterJSON.components[parent].instance.properties);
            //this.MasterJSON.components[parent].instance.properties.components.splice(index, 0, key);
            
        }
    }

    removeComponent(key) {
        // tslint:disable-next-line:forin
        let parent = this.MasterJSON.components[key];
        if (parent === undefined) {
            parent = this.MasterJSON.buttons[key].instance.properties.parent;
        } else {
            parent = this.MasterJSON.components[key].instance.properties.parent;
        }
        if (parent !== 'button_drop') {
            // tslint:disable-next-line:forin
            for (const comp in this.MasterJSON.components) {
                const parentID = this.MasterJSON.components[comp].instance.properties.parent;
                if (parentID === key) {
                    const indexToDelete = this.MasterJSON.components[comp].instance.properties.order;
                    _.unset(this.MasterJSON.components, comp);
                    this.MasterJSON.components[parentID].instance.properties.components.splice(indexToDelete, 1);
                }
            }
            const parentID = this.MasterJSON.components[key].instance.properties.parent;
            const indexToDelete = this.MasterJSON.components[key].instance.properties.order;
            if (parentID === 'root_drop') {
                _.unset(this.MasterJSON.components, key);
            } else {
                _.unset(this.MasterJSON.components, key);
                this.MasterJSON.components[parentID].instance.properties.components.splice(indexToDelete, 1);
            }
            // tslint:disable-next-line:forin
            for (const comp in this.MasterJSON.components) {
                const parentID = this.MasterJSON.components[comp].instance.properties.parent;
                if (this.MasterJSON.components[parentID] === undefined && parentID !== 'root_drop') {
                    _.unset(this.MasterJSON.components, comp);
                }
            }
        } else {
            _.unset(this.MasterJSON.buttons, key);
        }
        this.updateMasterJSONOnDrop(document.querySelector(`#${parent}`), key, true);
    }


    updateOrderInFlatJSON(target, flatJSON) {
        console.log('flat', flatJSON)
        for (let i = 0; i < target.children.length; i++) {
            const childKey = target.children[i].generatedKey;
            const parentKey = target.children[i].parentComponent;
            console.log('child', childKey, 'parent', parentKey);
            flatJSON[childKey].instance.properties.order = i;
            console.log('order', flatJSON[childKey].instance.properties.order);
            flatJSON[childKey].instance.properties.parent = parentKey;
        }
    }

    updateOrderInNestedJSON(target, source, oldIndex, newIndex) {
        const containerKeyTarget = target.id;
        const containerKeySource = source.id;
        const componentArrayTarget = this.MasterJSON.components[containerKeyTarget].instance.properties.components;
        const componentArraySource = this.MasterJSON.components[containerKeySource].instance.properties.components;
        const component = componentArraySource.splice(oldIndex, 1);
        console.log(component);
        componentArrayTarget.splice(newIndex, 0, component[0]);
    }

    updateMasterJSONOnDrop(parent, elementKey, compRemoved) {
        console.log(this.MasterJSON);
        console.log('update', parent.children);
        if (parent.id === 'root_drop') {
            this.updateOrderInFlatJSON(parent, this.MasterJSON.components);
        } else if (parent.id === 'button_drop') {
            this.updateOrderInFlatJSON(parent, this.MasterJSON.buttons);
        } else {
            this.updateOrderInFlatJSON(parent, this.MasterJSON.components);
        }
        // cases for moving and dropping from 1 container to another

        // internal within fst - change original component order/parent and move in fst array
        // fst to fst - change original component order/parent and move in fst array, delete from original fst array
        // root to fst- change
        // fst to root
        // root to button
        // button to root
        // fst to button
        // button to fst
    }

    updateMasterJSONOnMove(target, source, el, newIndex) {
        // moved within root or button drop - update the ordering where parent is root or button
        if (target.id === source.id && (target.id === 'root_drop' || target.id === 'button_drop')) {
            if (target.id === 'root_drop') {
                this.updateOrderInFlatJSON(target, this.MasterJSON.components);
            } else {
                this.updateOrderInFlatJSON(target, this.MasterJSON.buttons);
            }
        }
        // moved within fst container - update ordering in flat json and also in container array
        else if (target.id === source.id && (target.id !== 'root_drop' && target.id !== 'button_drop')) {
            const key = el.generatedKey;
            const oldIndex = this.MasterJSON.components[key].instance.properties.order;
            this.updateOrderInFlatJSON(target, this.MasterJSON.components);
            this.updateOrderInNestedJSON(target, source, oldIndex, newIndex);
        }
        // moved from fst to fst- update ordering in flat json and also in container arrays
        else if (target.id !== source.id && (target.id !== 'root_drop' && target.id !== 'button_drop')
            && (source.id !== 'root_drop' && source.id !== 'button_drop')) {
            
            const key = el.generatedKey;
            const oldIndex = this.MasterJSON.components[key].instance.properties.order;
            this.updateOrderInFlatJSON(target, this.MasterJSON.components);
            this.updateOrderInFlatJSON(source, this.MasterJSON.components);
            this.updateOrderInNestedJSON(target, source, oldIndex, newIndex);
        }
        // moved from root to fst - update ordering in flatjson and add in fst
        else if (source.id === 'root_drop' && target.id !== 'button_drop' && source.id !== target.id) {
            
            this.updateOrderInFlatJSON(target, this.MasterJSON.components);
            this.updateOrderInFlatJSON(source, this.MasterJSON.components);
            const key = el.generatedKey;
            this.MasterJSON.components[target.id].instance.properties.components.splice(newIndex, 0, key);
        }
        // moved from fst to root - update ordering in flatjson and remove from fst
        else if ((source.id !== 'root_drop' && source.id !== 'button_drop') && target.id === 'root_drop') {
            const key = el.generatedKey;
            const oldIndex = this.MasterJSON.components[key].instance.properties.order;
            this.updateOrderInFlatJSON(target, this.MasterJSON.components);
            this.updateOrderInFlatJSON(source, this.MasterJSON.components);
            this.MasterJSON.components[source.id].instance.properties.components.splice(oldIndex, 1);
        }
        // moved from root to button - update oredering in flat json in both root and button and then remove and add from root in button
        else if (source.id === 'root_drop' && target.id === 'button_drop') {
            const key = el.generatedKey;
            this.updateOrderInFlatJSON(source, this.MasterJSON.components);
            const temp = this.MasterJSON.components[key];
            _.unset(this.MasterJSON.components, key);
            this.MasterJSON.buttons = _.merge(this.MasterJSON.buttons, {[key]: temp});
            this.updateOrderInFlatJSON(target, this.MasterJSON.buttons)
        }
        // moved from button to root - update ordering in flat json in both root and button and then remove and add from button in root
        else if (target.id === 'root_drop' && source.id === 'button_drop') {
            
            const key = el.generatedKey;
            this.updateOrderInFlatJSON(source, this.MasterJSON.buttons);
            const temp = this.MasterJSON.buttons[key];
            _.unset(this.MasterJSON.buttons, key);
            this.MasterJSON.components = _.merge(this.MasterJSON.components, {[key]: temp});
            this.updateOrderInFlatJSON(target, this.MasterJSON.components)
        }
        // moved from fst to button 
        else if ((source.id !== 'root_drop' && source.id !== 'button_drop') && target.id === 'button_drop') {
            console.log('move called');
            const key = el.generatedKey;
            const oldIndex = this.MasterJSON.components[key].instance.properties.order;
            this.updateOrderInFlatJSON(target, this.MasterJSON.components);
            const temp = this.MasterJSON.components[key];
            _.unset(this.MasterJSON.components, key);
            this.MasterJSON.buttons = _.merge(this.MasterJSON.buttons, {[key]: temp});
            this.updateOrderInFlatJSON(source, this.MasterJSON.buttons);
            this.MasterJSON.components[source.id].instance.properties.components.splice(oldIndex, 1);
        }
        // moved from button to fst
        else if ((target.id !== 'root_drop' && target.id !== 'button_drop') && source.id === 'button_drop') {
            const key = el.generatedKey;
            this.updateOrderInFlatJSON(target, this.MasterJSON.buttons);
            const temp = this.MasterJSON.buttons[key];
            _.unset(this.MasterJSON.buttons, key);
            this.MasterJSON.components = _.merge(this.MasterJSON.components, {[key]: temp});
            this.updateOrderInFlatJSON(source, this.MasterJSON.components);
            this.MasterJSON.components[target.id].instance.properties.components.splice(newIndex, 0, key);
        }

    }



    buildFinalJSON() {
        const finalJSON = {
            ...this.MasterJSON
        };
        let tempComponents = [];
        //    let tempNestedComponents = [];
        const pushInFSTContainer = (parent, key) => {

        };

        for (const key in this.MasterJSON.components) {
            if (this.MasterJSON.components[key].instance.properties.parent === 'root_drop' ) {
                const index = this.MasterJSON.components[key].instance.properties.order;
                tempComponents[index] = this.MasterJSON.components[key].instance.properties;
            }
        }
        

        finalJSON.components = tempComponents;
        tempComponents = [];
        for (const key in this.MasterJSON.buttons) {
            if (key) {
                const index = this.MasterJSON.buttons[key].instance.properties.order;
                tempComponents[index] = this.MasterJSON.buttons[key].instance.properties;
            }
        }
        finalJSON.buttons = tempComponents;
        this.finalJSON = finalJSON;
    }

    getFinalJSON() {
        return this.finalJSON;
    }
}
