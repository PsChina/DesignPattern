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
// class Coffee {
//     constructor(){ // 这是我们的咖啡冲泡法，直接取自训练手册
//         this.boilWater()
//         this.brewCoffeeGrinds()
//         this.pourInCup()
//         this.addSugarAndMilk()
//     }
//     public boilWater(){ // 煮沸水
//         console.log('煮沸水')
//     }
//     public brewCoffeeGrinds(){ // 冲泡咖啡
//         console.log('冲泡咖啡')
//     }
//     public pourInCup(){ // 把咖啡倒进杯子
//         console.log('倒进杯子')
//     }
//     public addSugarAndMilk(){ // 加糖和牛奶
//         console.log('加糖和牛奶')
//     }
// }
// class Tea {
//     constructor(){ // 这是我们的茶冲泡法，直接取自训练手册
//         this.boilWater()
//         this.steepTeaBag()
//         this.pourInCup()
//         this.addLemon()
//     }
//     public boilWater(){ // 煮沸水
//         console.log('煮沸水')
//     }
//     public steepTeaBag(){ // 用沸水浸泡茶叶
//         console.log('用沸水浸泡茶叶')
//     }
//     public pourInCup(){ // 把茶倒进杯子
//         console.log('倒进杯子')
//     }
//     public addLemon(){ // 加柠檬
//         console.log('加柠檬')
//     }
// }
var CaffeineBeverage = /** @class */ (function () {
    function CaffeineBeverage() {
        this.boilWater();
        this.brew(); // 统一后的方法
        this.pourInCup();
        this.addCondiments(); // 统一后的方法
    }
    CaffeineBeverage.prototype.boilWater = function () {
        console.log('煮沸水');
    };
    CaffeineBeverage.prototype.pourInCup = function () {
        console.log('倒进杯子');
    };
    return CaffeineBeverage;
}());
var Coffee = /** @class */ (function (_super) {
    __extends(Coffee, _super);
    function Coffee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Coffee.prototype.brew = function () {
        console.log('冲泡咖啡');
    };
    Coffee.prototype.addCondiments = function () {
        console.log('加糖和牛奶');
    };
    return Coffee;
}(CaffeineBeverage));
var Tea = /** @class */ (function (_super) {
    __extends(Tea, _super);
    function Tea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tea.prototype.brew = function () {
        console.log('用沸水浸泡茶叶');
    };
    Tea.prototype.addCondiments = function () {
        console.log('加柠檬');
    };
    return Tea;
}(CaffeineBeverage));
new Tea();
new Coffee();
