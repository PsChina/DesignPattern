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
/**
 * 呱呱叫
 * @class Quack
 **/
var Quack = /** @class */ (function () {
    function Quack() {
    }
    Quack.prototype.quack = function () {
        console.log('呱呱叫');
    };
    return Quack;
}());
/**
 * 吱吱叫
 * @class Squeak
 **/
var Squeak = /** @class */ (function () {
    function Squeak() {
    }
    Squeak.prototype.quack = function () {
        console.log('吱吱叫');
    };
    return Squeak;
}());
/**
 * 安静
 * @class MuteQuack
 **/
var MuteQuack = /** @class */ (function () {
    function MuteQuack() {
    }
    MuteQuack.prototype.quack = function () {
        return undefined; // 安静
    };
    return MuteQuack;
}());
/**
 * 飞行
 * @class FlyWithWings
 **/
var FlyWithWings = /** @class */ (function () {
    function FlyWithWings() {
    }
    FlyWithWings.prototype.fly = function () {
        console.log('飞行');
    };
    return FlyWithWings;
}());
/**
 * 飞行
 * @class FlyNoWay
 **/
var FlyNoWay = /** @class */ (function () {
    function FlyNoWay() {
    }
    FlyNoWay.prototype.fly = function () {
        return undefined; // 什么都不做，不会飞
    };
    return FlyNoWay;
}());
/**
 * 鸭子超类 （抽象基类）
 * @class Duck
 **/
var Duck = /** @class */ (function () {
    function Duck(flyBehavior, quackBehavior) {
        this.setFlyBehavior(flyBehavior);
        this.setQuackBehavior(quackBehavior);
    }
    Duck.prototype.setFlyBehavior = function (flyBehavior) {
        this.flyBehavior = flyBehavior;
    };
    Duck.prototype.setQuackBehavior = function (quackBehavior) {
        this.quackBehavior = quackBehavior;
    };
    Duck.prototype.performFly = function () {
        this.flyBehavior.fly();
    };
    Duck.prototype.performQuack = function () {
        this.quackBehavior.quack();
    };
    return Duck;
}());
/**
 * 鸭子超类 （抽象基类）
 * @class MallardDuck
 **/
var MallardDuck = /** @class */ (function (_super) {
    __extends(MallardDuck, _super);
    function MallardDuck() {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        return _super.apply(this, rest) || this;
    }
    MallardDuck.prototype.display = function () {
        console.log('显示绿色');
    };
    return MallardDuck;
}(Duck));
var mallardDuck = new MallardDuck(); // 新建一个不具备任何行为的绿头野鸭
var flyWithWings = new FlyWithWings(); // 飞行
mallardDuck.setFlyBehavior(flyWithWings); // 设置飞行行为
var quack = new Quack(); // 呱呱叫行为
mallardDuck.setQuackBehavior(quack); // 设置呱呱叫行为
// 这样我们就可以随意组合已经存在的任意飞行行为和各种叫声
// 测试一下
mallardDuck.performFly(); //执行飞行
mallardDuck.performQuack(); //执行叫声
//我们甚至可以更改绿头野鸭的叫声
var squeak = new Squeak(); // 吱吱叫
mallardDuck.setQuackBehavior(squeak); // 设置吱吱叫到绿头野鸭上
mallardDuck.performQuack(); //执行叫声
