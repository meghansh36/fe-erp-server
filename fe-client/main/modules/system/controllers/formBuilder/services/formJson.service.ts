/*
*Service Description
*This service is used to update the MasterJSON and build the final JSON from the MasterJSON
*/

import * as _ from "lodash";
import { Injectable } from "@angular/core";

@Injectable()
export class FeFormJsonService {
	// The masterJson contains the component references returned by the angular createComponent
	// function. The referneces are mapped to the unique keys generated for each field.

	/*
* Property structure in MasterJSON
* 1. All fields are mapped in the component or buttons object by the unique keys.
* 2. If the parent of the field is root_drop or fieldset, then the fields are mapped in
*    components object on a single level. The Fieldset's component property maintains an array
*    of keys that are its children.
* 3. If the parent of the field is button_drop then the fields are mapped in buttons object.
*/
	MasterJSON = {
		id: "",
		code: "",
		formLabel: "",
		name: "",
		type: "",
		disabled: false,
		hidden: false,
		disableCondition: "",
		hideCondition: "",
		active: true,
		help: "",
		components: {},
		buttons: {}
	};

	finalJSON;

	/*
*@function Description
*Returns MasterJSON
*/
	getMasterJSON() {
		return this.MasterJSON;
	}

	/*
*@function Description
*Arguments ==> newProps - Updated properties of the field
*              key - unique key for each element.
* This function updates the properties of the field in the masterJSON.
*/
	setMasterJSON(newProps, key) {
		// if the parent is root_drop then update props in component object.
		if (newProps.parent === "root_drop") {
			this.MasterJSON.components[key].instance.properties = newProps;
		}
		// if the parent is button_drop then update props in buttons object.
		else if (newProps.parent === "button_drop") {
			this.MasterJSON.buttons[key].instance.properties = newProps;
		}
		// The case when parent is fieldset. Then update in components object.
		else {
			this.MasterJSON.components[key].instance.properties = newProps;
		}
	}

	/*
*@function Description
*Arguments ==> key - unique key generated for each field.
*              componentRef - Reference object of the created component, passed by angular
*              parent - Unique ID for parent container. (root container has id - root_drop,
*                       button container has id - button_drop and fieldsets have id set
*                       as their own unique keys)
*              index - index of the newly created component.
*
*This function adds a new component to the MasterJSON
*/
	addComponentToMasterJSON(key, componentRef, parent, index) {
		if (parent === "root_drop") {
			// Adds a new key-value pair to the masterJSON
			this.MasterJSON.components = _.merge(this.MasterJSON.components, {
				[key]: componentRef
			});
			// Sets the key property to the generated key
			this.MasterJSON.components[key].instance.properties.key = key;
			// Sets the order property of the component
			this.MasterJSON.components[key].instance.properties.order = index;
			// Sets the parent property equal to the parentID.
			this.MasterJSON.components[key].instance.properties.parent = parent;
			// Sets the ComponentName property in the MasterJSON. This property is used to fetch the
			// name of the component in the edit mode of the builder.
			this.MasterJSON.components[key].instance.properties.componentName =
				componentRef.componentType.name;
		} else if (parent === "button_drop") {
			// Adds a new key-value pair to the masterJSON
			this.MasterJSON.buttons = _.merge(this.MasterJSON.buttons, {
				[key]: componentRef
			});
			// Sets the key property to the generated key
			this.MasterJSON.buttons[key].instance.properties.key = key;
			// Sets the order property of the component
			this.MasterJSON.buttons[key].instance.properties.order = index;
			// Sets the parent property equal to the parentID.
			this.MasterJSON.buttons[key].instance.properties.parent = parent;
			// Sets the ComponentName property in the MasterJSON. This property is used to fetch the
			// name of the component in the edit mode of the builder.
			this.MasterJSON.buttons[key].instance.properties.componentName =
				componentRef.componentType.name;
		} else {
			// Adds a new key-value pair to the masterJSON
			this.MasterJSON.components = _.merge(this.MasterJSON.components, {
				[key]: componentRef
			});
			// Sets the key property to the generated key
			this.MasterJSON.components[key].instance.properties.key = key;
			// Sets the order property of the component
			this.MasterJSON.components[key].instance.properties.order = index;
			// Sets the parent property equal to the parentID.
			this.MasterJSON.components[key].instance.properties.parent = parent;
			// Sets the ComponentName property in the MasterJSON. This property is used to fetch the
			// name of the component in the edit mode of the builder.
			this.MasterJSON.components[key].instance.properties.componentName =
				componentRef.componentType.name;
			// !important. In the case where a fieldset is the parent, the key of the child component
			// is added in the components array of fieldset properties at the appropriate index.
			this.MasterJSON.components[
				parent
			].instance.properties.components.splice(index, 0, key);
		}
	}

	/*
*@function Description
*Arguments ==> key - unique key for the element to remove.
*
*This function removes the component from the MasterJSON.
*/
	removeComponent(key) {
		const component = this.MasterJSON.components[key];
		let parent;
		// If the component belongs in the button_drop container
		if (component === undefined) {
			parent = this.MasterJSON.buttons[key].instance.properties.parent;
		}
		// else if it is in root_drop container
		else {
			parent = this.MasterJSON.components[key].instance.properties.parent;
		}
		if (parent !== "button_drop") {
			// The for loop deletes all the children if a fieldset is deleted.
			for (const comp in this.MasterJSON.components) {
				if (comp) {
					const parentID = this.MasterJSON.components[comp].instance
						.properties.parent;
					if (parentID === key) {
						const indexToDelete = this.MasterJSON.components[comp]
							.instance.properties.order;
						_.unset(this.MasterJSON.components, comp);
						this.MasterJSON.components[
							parentID
						].instance.properties.components.splice(
							indexToDelete,
							1
						);
					}
				}
			}
			const parentID = this.MasterJSON.components[key].instance.properties
				.parent;
			const indexToDelete = this.MasterJSON.components[key].instance
				.properties.order;
			// if the element is not fieldset and its parent is root_drop
			if (parentID === "root_drop") {
				_.unset(this.MasterJSON.components, key);
			}
			// if the element is not fieldset but parent is a fieldset.
			else {
				_.unset(this.MasterJSON.components, key);
				// delete from fieldset component array as well
				this.MasterJSON.components[
					parentID
				].instance.properties.components.splice(indexToDelete, 1);
			}
			// tslint:disable-next-line:forin

			/* for (const comp in this.MasterJSON.components) {
            const parentID = this.MasterJSON.components[comp].instance.properties.parent;
            if (this.MasterJSON.components[parentID] === undefined && parentID !== 'root_drop') {
                _.unset(this.MasterJSON.components, comp);
            }
        } */
		}
		// if parent is button_drop, then delete from buttons object
		else {
			_.unset(this.MasterJSON.buttons, key);
		}
		// update the ordering of the rest of the elements after deleting the element
		this.updateMasterJSONOnDrop(document.querySelector(`#${parent}`));
	}

	/*
*@function Description
*Arguments ==> target - DOM node of the parent container.
*              flatJSON - contains either components/buttons object of MasterJSON.
*
*Loops over the children array of the target node and updates the order in the MasterJSON
*accordingly.
*/
	updateOrderInFlatJSON(target, flatJSON) {
		for (let i = 0; i < target.children.length; i++) {
			// get key of the children from the child DOM node.
			const childKey = target.children[i].generatedKey;
			// get parent key of the children from the child DOM node.
			const parentKey = target.children[i].parentComponent;
			// update order in the MasterJSON
			flatJSON[childKey].instance.properties.order = i;
			// update the parent in the MasterJSON
			flatJSON[childKey].instance.properties.parent = parentKey;
		}
	}

	/*
*@function Description
*Arguments ==> target - DOM node of the parent container
*              source - DOM node of the previous parent(source) container
*              oldIndex - oldIndex of the element moved
*              newIndex - newIndex of the element moved
*
*This function updates the order of the keys in the components in the fieldset component array
*/
	updateOrderInNestedJSON(target, source, oldIndex, newIndex) {
		const containerKeyTarget = target.id;
		const containerKeySource = source.id;
		const componentArrayTarget = this.MasterJSON.components[
			containerKeyTarget
		].instance.properties.components;
		const componentArraySource = this.MasterJSON.components[
			containerKeySource
		].instance.properties.components;
		// remove the component from container array of source fieldset
		const component = componentArraySource.splice(oldIndex, 1);
		// add the removed component to container array of target fieldset.
		componentArrayTarget.splice(newIndex, 0, component[0]);
	}

	/*
*@function Description
*Arguments ==> parent - DOM node of the parent container.
*
*This function updates the order of the components in the components or buttons object
*/
	updateMasterJSONOnDrop(parent) {
		if (parent.id === "root_drop") {
			this.updateOrderInFlatJSON(parent, this.MasterJSON.components);
		} else if (parent.id === "button_drop") {
			this.updateOrderInFlatJSON(parent, this.MasterJSON.buttons);
		}
		// case when parent is a fieldset
		else {
			this.updateOrderInFlatJSON(parent, this.MasterJSON.components);
		}
	}

	/*
*@function Description
*Arguments ==> target - DOM node of the parent container
*              source - DOM node of the previous parent(source) container
*              el - DOM node of the element that was moved
*              newIndex - newIndex of the element moved
*
*This function updates the order of the components and the parent property in the components/
*buttons object.
*/
	updateMasterJSONOnMove(target, source, el, newIndex) {
		// moved within root or button drop - update the ordering of elements where parent is root
		// or button
		if (
			target.id === source.id &&
			(target.id === "root_drop" || target.id === "button_drop")
		) {
			if (target.id === "root_drop") {
				this.updateOrderInFlatJSON(target, this.MasterJSON.components);
			} else {
				this.updateOrderInFlatJSON(target, this.MasterJSON.buttons);
			}
		}
		// moved within fst container - update ordering in flat json and also in container array
		else if (
			target.id === source.id &&
			(target.id !== "root_drop" && target.id !== "button_drop")
		) {
			const key = el.generatedKey;
			const oldIndex = this.MasterJSON.components[key].instance.properties
				.order;
			this.updateOrderInFlatJSON(target, this.MasterJSON.components);
			this.updateOrderInNestedJSON(target, source, oldIndex, newIndex);
		}
		// moved from fst to fst- update ordering in flat json and also in container arrays
		else if (
			target.id !== source.id &&
			(target.id !== "root_drop" && target.id !== "button_drop") &&
			(source.id !== "root_drop" && source.id !== "button_drop")
		) {
			const key = el.generatedKey;
			const oldIndex = this.MasterJSON.components[key].instance.properties
				.order;
			this.updateOrderInFlatJSON(target, this.MasterJSON.components);
			this.updateOrderInFlatJSON(source, this.MasterJSON.components);
			this.updateOrderInNestedJSON(target, source, oldIndex, newIndex);
		}
		// moved from root to fst - update ordering in flatjson and add in fst
		else if (
			source.id === "root_drop" &&
			target.id !== "button_drop" &&
			source.id !== target.id
		) {
			this.updateOrderInFlatJSON(target, this.MasterJSON.components);
			this.updateOrderInFlatJSON(source, this.MasterJSON.components);
			const key = el.generatedKey;
			this.MasterJSON.components[
				target.id
			].instance.properties.components.splice(newIndex, 0, key);
		}
		// moved from fst to root - update ordering in flatjson and remove from fst
		else if (
			source.id !== "root_drop" &&
			source.id !== "button_drop" &&
			target.id === "root_drop"
		) {
			const key = el.generatedKey;
			const oldIndex = this.MasterJSON.components[key].instance.properties
				.order;
			this.updateOrderInFlatJSON(target, this.MasterJSON.components);
			this.updateOrderInFlatJSON(source, this.MasterJSON.components);
			this.MasterJSON.components[
				source.id
			].instance.properties.components.splice(oldIndex, 1);
		}
		// moved from root to button - update oredering in flat json in both root and button and then remove and add from root in button
		else if (source.id === "root_drop" && target.id === "button_drop") {
			const key = el.generatedKey;
			this.updateOrderInFlatJSON(source, this.MasterJSON.components);
			const temp = this.MasterJSON.components[key];
			_.unset(this.MasterJSON.components, key);
			this.MasterJSON.buttons = _.merge(this.MasterJSON.buttons, {
				[key]: temp
			});
			this.updateOrderInFlatJSON(target, this.MasterJSON.buttons);
		}
		// moved from button to root - update ordering in flat json in both root and button and then remove and add from button in root
		else if (target.id === "root_drop" && source.id === "button_drop") {
			const key = el.generatedKey;
			this.updateOrderInFlatJSON(source, this.MasterJSON.buttons);
			const temp = this.MasterJSON.buttons[key];
			_.unset(this.MasterJSON.buttons, key);
			this.MasterJSON.components = _.merge(this.MasterJSON.components, {
				[key]: temp
			});
			this.updateOrderInFlatJSON(target, this.MasterJSON.components);
		}
		// moved from fst to button
		else if (
			source.id !== "root_drop" &&
			source.id !== "button_drop" &&
			target.id === "button_drop"
		) {
			const key = el.generatedKey;
			const oldIndex = this.MasterJSON.components[key].instance.properties
				.order;
			this.updateOrderInFlatJSON(source, this.MasterJSON.components);
			const temp = this.MasterJSON.components[key];
			_.unset(this.MasterJSON.components, key);
			this.MasterJSON.buttons = _.merge(this.MasterJSON.buttons, {
				[key]: temp
			});
			console.log(this.MasterJSON.buttons);
			this.updateOrderInFlatJSON(target, this.MasterJSON.buttons);
			this.MasterJSON.components[
				source.id
			].instance.properties.components.splice(oldIndex, 1);
		}
		// moved from button to fst
		else if (
			target.id !== "root_drop" &&
			target.id !== "button_drop" &&
			source.id === "button_drop"
		) {
			const key = el.generatedKey;
			this.updateOrderInFlatJSON(source, this.MasterJSON.buttons);
			const temp = this.MasterJSON.buttons[key];
			_.unset(this.MasterJSON.buttons, key);
			this.MasterJSON.components = _.merge(this.MasterJSON.components, {
				[key]: temp
			});
			this.updateOrderInFlatJSON(target, this.MasterJSON.components);
			this.MasterJSON.components[
				target.id
			].instance.properties.components.splice(newIndex, 0, key);
		}
	}
	/*
	*@function Description
	*
	*This function builds the finalJSON from MasterJson.
	*/
	buildFinalJSON() {
		// create copy of master json
		const finalJSON = {
			...this.MasterJSON
		};
		// temporary components array
		let tempComponents = [];
		// this loop first adds all the components where parent is root_drop in the tempComponents[]
		for (const key in this.MasterJSON.components) {
			if (
				this.MasterJSON.components[key].instance.properties.parent ===
				"root_drop"
			) {
				const index = this.MasterJSON.components[key].instance
					.properties.order;
				tempComponents[index] = _.assign(
					{},
					this.MasterJSON.components[key].instance.properties
				);
			}
		}
		/*
    *@function Description
    *Arguments ==> container - fieldset component array
    *
    *This function replaces keys with respective properties in the fieldset component array.
    */
		const pushInFST = container => {
			for (let i = 0; i < container.length; i++) {
				const key = container[i];
				container[i] = _.assign(
					{},
					this.MasterJSON.components[key].instance.properties
				);
			}
			return container;
		};

		/*
    *@function Description
    *Arguments ==> rootContainer - root Array where to add new components in fieldsets
    *
    *This function recursively iterates over fieldset elements and adds properties in it.
    */
		const buildNestedComponents = rootContainer => {
			for (let i = 0; i < rootContainer.length; i++) {
				// if a fieldset element is found
				if (rootContainer[i].components !== undefined) {
					// call function to push new elements in the fieldset component array
					rootContainer[i].components = pushInFST(
						_.concat([], rootContainer[i].components)
					);
					buildNestedComponents(rootContainer[i].components);
				}
			}
		};
		buildNestedComponents(tempComponents);

		finalJSON.components = tempComponents;
		let tempComponentsButton = [];
		// this loop adds properties in the button array
		for (const key in this.MasterJSON.buttons) {
			if (key) {
				const index = this.MasterJSON.buttons[key].instance.properties
					.order;
				tempComponentsButton[index] = this.MasterJSON.buttons[
					key
				].instance.properties;
			}
		}
		finalJSON.buttons = tempComponentsButton;
		this.finalJSON = finalJSON;
	}
	/*
*@function Description
*
*This function returns masterJSON
*/
	getFinalJSON() {
		return this.finalJSON;
	}
}
