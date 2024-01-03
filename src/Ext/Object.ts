Object.prototype.copy = function () {
    return JSON.parse(JSON.stringify(this));
}
Object.prototype.hideProperties = function (properties) {
    for (const property of properties) {
        Object.defineProperty(this, property, { enumerable: false });
    }
}

Object.prototype.hideProperties(["copy", "hideProperties"]);
