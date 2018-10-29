var Singleton = /** @class */ (function () {
    function Singleton() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
    }
    return Singleton;
}());
var instance1 = new Singleton();
instance1.name = 'A';
console.log("instance1.name:" + instance1.name);
var instance2 = new Singleton();
console.log("instance2.name:" + instance2.name);
instance2.name = 'B';
console.log("instance2.name:" + instance2.name);
console.log("instance1 === instance2 ? ==> " + (instance1 === instance2));
