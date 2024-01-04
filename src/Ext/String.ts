String.prototype.json = function (): any {
    return JSON.parse(this.valueOf());
};
Object.defineProperty(String.prototype, 'json', { enumerable: false });

String.prototype.replaceAt = function (index: number, replacement: string): string {
    return this.valueOf().substring(0, index) + replacement + this.valueOf().substring(index + replacement.length);
}
Object.defineProperty(String.prototype, 'replaceAt', { enumerable: false });


String.prototype.next = function (): string {
    return String.fromCharCode(this.valueOf().charCodeAt(0) + 1);
}
Object.defineProperty(String.prototype, 'next', { enumerable: false });