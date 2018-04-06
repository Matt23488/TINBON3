import createGuid from "../utilities/guid.js";

export default class Component {
    constructor(componentDomId) {
        const fragment = document.importNode(document.querySelector(`#${componentDomId}`).content, true);
        this._element = [...fragment.childNodes].filter(n => n.nodeName !== "#text")[0];

        // I may not even need this
        this._element.setAttribute("id", createGuid());
    }

    appendTo(parent) {
        if (typeof parent === "string") {
            document.querySelector(parent).appendChild(this._element);
        }
        else if (parent instanceof Component) {
            parent._element.appendChild(this._element);
        }
        else {
            throw new Error("parent must be a query selector or a Component");
        }
    }
}