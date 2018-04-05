export default class Component {
    constructor(componentId) {
        // TODO: This is a document fragment, I'll need to do this differently.
        // Perhaps I'll assign every component their own GUID, and make that the id
        // of the element, that way I can access it.
        this._element = document.importNode(document.querySelector(`#${componentId}`).content, true);
    }

    appendTo(parent) {
        if (typeof parent === "string") {
            let a = document.querySelector(parent).appendChild(this._element);
            let b = a;
        }
        else if (parent instanceof Component) {
            parent._element.appendChild(this._element);
        }
        else {
            throw new Error("parent must be a query selector or a Component");
        }
    }
}