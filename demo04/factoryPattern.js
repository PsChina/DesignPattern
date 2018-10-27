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
var Pizza = /** @class */ (function () {
    function Pizza(toppings) {
        this.toppings = toppings;
    }
    Pizza.prototype.prepare = function () {
        console.log('添加佐料');
        for (var _i = 0, _a = this.toppings; _i < _a.length; _i++) {
            var topping = _a[_i];
            console.log("\u6DFB\u52A0" + topping);
        }
    };
    Pizza.prototype.bake = function () {
        console.log('烘焙');
    };
    Pizza.prototype.cut = function () {
        console.log('切割');
    };
    Pizza.prototype.box = function () {
        console.log('打包');
    };
    return Pizza;
}());
var HuNanCheesePizza = /** @class */ (function (_super) {
    __extends(HuNanCheesePizza, _super);
    function HuNanCheesePizza(toppings) {
        var _this = _super.call(this, toppings) || this;
        _this.name = '湖南奶酪披萨';
        return _this;
    }
    return HuNanCheesePizza;
}(Pizza));
var HuNanVeggiePizza = /** @class */ (function (_super) {
    __extends(HuNanVeggiePizza, _super);
    function HuNanVeggiePizza(toppings) {
        var _this = _super.call(this, toppings) || this;
        _this.name = '湖南素披萨';
        return _this;
    }
    return HuNanVeggiePizza;
}(Pizza));
var PizzaStore = /** @class */ (function () {
    function PizzaStore() {
    }
    PizzaStore.prototype.orderPizza = function (type) {
        var pizza = this.createPizza(type); // 创建披萨
        pizza.prepare(); // 加工前的准备工作
        pizza.bake(); // 烘焙
        pizza.cut(); // 切片
        pizza.box(); // 打包
        // 披萨制作工艺
        // 出货
        console.log(pizza);
    };
    return PizzaStore;
}());
var HuNanPizzaStore = /** @class */ (function (_super) {
    __extends(HuNanPizzaStore, _super);
    function HuNanPizzaStore() {
        return _super.call(this) || this;
    }
    HuNanPizzaStore.prototype.createPizza = function (type) {
        var pizza;
        switch (type) {
            case 'cheese':
                pizza = new HuNanCheesePizza(['雪花大肥牛', '奶酪']); // 湖南奶酪披萨
                break;
            case 'veggie':
                pizza = new HuNanVeggiePizza(['金莲子', '人参果']); // 湖南素披萨
                break;
            // Other types ...
            default:
                break;
        }
        return pizza;
    };
    return HuNanPizzaStore;
}(PizzaStore));
// 开一家湖南披萨加盟店
var huNanPizzaStore = new HuNanPizzaStore();
// 顾客下单 奶酪披萨
huNanPizzaStore.orderPizza('cheese');
// 顾客下单 湖南素披萨
huNanPizzaStore.orderPizza('veggie');
