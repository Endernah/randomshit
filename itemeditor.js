// ==UserScript==
// @name         IC ITEM EDITOR
// @namespace    http://deyvi.me
// @version      1.0
// @description  Infinite craft item edit script
// @author       Deyvi
// @match        https://neal.fun/infinite-craft/
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @require        https://github.com/AugmentedWeb/UserGui/raw/Release-1.0/usergui.js
// @run-at        document-load
// ==/UserScript==

const Gui = new UserGui;
Gui.settings.window.title = "IC ITEM EDITOR"; // set window title
Gui.settings.window.centered = true;

Gui.addPage("ADD ITEM", `
<div class="rendered-form">
	<div class="formbuilder-text form-group field-item-name">
		<label for="item-name" class="formbuilder-text-label">ITEM NAME</label>
		<input type="text" class="form-control" name="item-name" access="false" id="item-name">
	</div>
	<div class="formbuilder-textarea form-group field-item-emoji">
		<label for="item-emoji" class="formbuilder-textarea-label">ITEM EMOJI</label>
		<textarea type="text" class="form-control" name="item-emoji" access="false" id="item-emoji"></textarea>
	</div>
	<div class="formbuilder-button form-group field-button-change-value">
		<button type="button" class="btn-success btn" name="button-change-value" access="false" style="success" id="button-change-value">Add item</button>
	</div>
</div>
`);

Gui.addPage("REMOVE ITEM", `
<div class="rendered-form">
	<div class="formbuilder-text form-group field-item-name-remove">
		<label for="item-name-remove" class="formbuilder-text-label">ITEM NAME</label>
		<input type="text" class="form-control" name="item-name-remove" access="false" id="item-name-remove">
	</div>
    </div>
        <div class="formbuilder-button form-group field-button-remove">
        <button type="button" class="btn-success btn" name="button-remove" access="false" style="success" id="button-remove">Remove item</button>
    </div>
</div>
`);

function addItem(itemName, itemEmoji) {
	if(itemName) {
		if(!localStorage.getItem('infinite-craft-data')){
            alert('You need to have mixed at least one item to use this script')
            return
        }
        let data = JSON.parse(localStorage.getItem('infinite-craft-data'));
        data.elements.push({ text: itemName, emoji: itemEmoji, discovered: false});
        localStorage.setItem('infinite-craft-data', JSON.stringify(data));
        alert('Item added successfully refresh the page to see the changes.')
	} else {
		Gui.window.alert("Please input a name.");
	}
}

function removeItem(itemName) {
    if (itemName) {
        if (!localStorage.getItem('infinite-craft-data')) {
            alert('You need to have mixed at least one item to use this script');
            return;
        }
        let data = JSON.parse(localStorage.getItem('infinite-craft-data'));
        let index = data.elements.findIndex(element => element.text === itemName);
        if (index !== -1) {
            data.elements.splice(index, 1);
            localStorage.setItem('infinite-craft-data', JSON.stringify(data));
            alert('Item removed successfully. Refresh the page to see the changes.');
        } else {
            alert('Item not found.');
        }
    } else {
        Gui.window.alert("Please input a name.");
    }
}

function openGui() {
    Gui.open(() => {
        Gui.smartEvent("button-change-value", () => {
            const itemName = Gui.getValue("item-name");
            const itemEmoji = Gui.getValue("item-emoji");

            addItem(itemName, itemEmoji);
        });

        Gui.smartEvent("button-remove", () => {
            const itemName = Gui.getValue("item-name-remove");

            removeItem(itemName);
        });
    });
}

openGui();
