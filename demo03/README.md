## 装饰器模式 (Decorator Pattern)

定义: 动态地将责任附加到对象上。若要扩展功能，装饰者提供了比继承更有弹性的替代方案。

假如我们需要为一家咖啡店比如星巴克写一个自动售货系统，需要定义各种各样的咖啡类，这时候我们应该如何定义？

如果单纯的采用继承那么则会造成类爆炸的情况因为调料的排列组合情况多到数不清，我们可以通过装饰器模式来解决这个问题。

我们以饮料这个基类为主体，然后在运行时以调料来装饰饮料，

比方说，如果顾客想要加咖啡和牛奶的卡布奇诺。

那么要做的是：

1 拿到一个卡布奇诺（Cappuccino）对象

2 以咖啡（Coffee）对象装饰它

3 以牛奶（Milk）对象装饰它

4 调用 cost() 方法, 并依赖委托（delegate）将调料的价钱加上去

```ts

abstract class Seasoning{ // 抽象基类-调料
    public abstract price:number
    public abstract cost():number
}
class Coffee extends Seasoning{ // 咖啡
    public price:number
    constructor(){
        super()
        this.price = 8
    }
    cost(){
        return this.price
    }
}
class MilkFoam extends Seasoning{ // 奶泡
    public price:number
    constructor(){
        super()
        this.price = 5
    }
    cost(){
        return this.price
    }
}
class Milk extends Seasoning { // 牛奶
    public price:number
    constructor(){
        super()
        this.price = 10
    }
    cost(){
        return this.price
    }
}
class Mocha extends Seasoning{ // 摩卡
    public price:number
    constructor(){
        super()
        this.price = 15
    }
    cost(){
        return this.price
    }
}

abstract class Beverage { // 饮料
    public description: string // 描述信息
    public price: number // 初始价格
    public seasoningList: Array<Seasoning>
    constructor(){
        this.price = 10 // 初始价格10块
        this.seasoningList = [] // 默认不加任何调料
    }
    cost(){ // 计算各种原料的总价
        let currentPrice = this.price
        this.seasoningList.forEach(season => {
            currentPrice += season.cost()
        });
        return currentPrice
    }
    setSeasoning(seasoning:Seasoning){ // 设置调料
        this.seasoningList.push(seasoning)
    }
    getDescription(){ // 获取描述信息
        return this.description
    }
}

class Cappuccino extends Beverage { // 卡布奇诺
    constructor(){
        super()
        this.description = '在玻璃杯中加入咖啡制成的冰块，倒入加糖煮沸的牛奶，从上面慢慢注入冰冻咖啡，这时牛奶和咖啡分成两层。牛奶泡沫在最上层。'
    }
}


let cappuccino = new Cappuccino () // 有人点了一杯卡布奇诺 

// 加咖啡

let coffee = new Coffee()

cappuccino.setSeasoning(coffee)

// 加牛奶

let milk = new Milk()

cappuccino.setSeasoning(milk)

// 计算价格 

cappuccino.cost() // 28
```

以上完美解决类爆炸的问题

相关代码:
[相关代码 demo01](https://github.com/PsChina/DesignPattern/tree/master/demo03)

(完)