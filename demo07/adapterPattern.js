var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Duck = /** @class */ (function () {
    function Duck() {
    }
    Duck.prototype.quack = function () {
        console.log('嘎嘎叫');
    };
    return Duck;
}());
var Turkey = /** @class */ (function () {
    function Turkey() {
    }
    Turkey.prototype.cluck = function () {
        console.log('咯咯叫');
    };
    return Turkey;
}());
var ObjectAdapter = /** @class */ (function () {
    function ObjectAdapter(turkey) {
        this.turkey = turkey;
    }
    ObjectAdapter.prototype.setTurkey = function (turkey) {
        this.turkey = turkey;
    };
    ObjectAdapter.prototype.quack = function () {
        this.turkey.cluck();
    };
    return ObjectAdapter;
}());
var ClassAdapter = /** @class */ (function (_super) {
    __extends(ClassAdapter, _super);
    function ClassAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClassAdapter.prototype.quack = function () {
        this.cluck();
    };
    return ClassAdapter;
}(Turkey));
var turkey = new Turkey(); // 创建火鸡
var turkeyAdapter = new ObjectAdapter(); // 创建火鸡适配器
turkeyAdapter.setTurkey(turkey); // 将被适配的火鸡设置到适配器中
turkeyAdapter.quack(); // 让火鸡以嘎嘎叫的方式咯咯叫
var turkeyDuck = new ClassAdapter(); // 新建火鸡扩展类实例---火鸡鸭
turkeyDuck.quack(); // 让火鸡鸭嘎嘎叫
