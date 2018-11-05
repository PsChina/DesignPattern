## 模板方法模式 (Template Pattern)

定义: 在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中，模板方法使得子类可以在不改变算法的情况下，重新定义算法中的某些步骤。

直到目前我们的议题都围绕着封装；我们已经封装了对象创建、方法调用、复杂接口、鸭子、比萨、、、加下来呢？

我们将要深入封装算法模块，好让子类可以在任何时候都可以将自己挂接进运算里。我们甚至会在本章学到一个受到好莱坞影响而启发的设计原则。

#### 多来点咖啡因吧
有些人没有咖啡就活不下去；有些人则离不开茶。两者共同成分是什么？当然是咖啡因了！

但还不只是这样；茶和咖啡的冲泡方式非常相似，不信你瞧瞧

__星巴兹咖啡师傅训练手册__

各位师傅!准备星巴兹软饮时，请精确地遵循下面的冲泡法：

##### 星巴兹咖啡冲泡法

(1)把水煮沸

(2)用沸水冲泡咖啡

(3)把咖啡倒进杯子

(4)加糖和牛奶

##### 星巴兹茶冲泡法

(1)把水煮沸

(2)用沸水冲泡茶叶

(3)把茶倒进杯子

(4)加柠檬


所有的冲泡方法都是星巴兹咖啡公司的商业机密，必须严格保密。

快速搞定几个咖啡和茶的类（用 typescript ）


__Coffe 类__
```ts
class Coffee {
    constructor(){ // 这是我们的咖啡冲泡法，直接取自训练手册
        this.boilWater()
        this.brewCoffeeGrinds()
        this.pourInCup()
        this.addSugarAndMilk()
    }
    public boilWater(){ // 煮沸水
        console.log('煮沸水')
    }
    public brewCoffeeGrinds(){ // 冲泡咖啡
        console.log('冲泡咖啡')
    }
    public pourInCup(){ // 把咖啡倒进杯子
        console.log('倒进杯子')
    }
    public addSugarAndMilk(){ // 加糖和牛奶
        console.log('加糖和牛奶')
    }
}
```

接下来是茶.....

__Tea 类__
```ts
class Tea {
    constructor(){ // 这是我们的茶冲泡法，直接取自训练手册
        this.boilWater()
        this.steepTeaBag()
        this.pourInCup()
        this.addLemon()
    }
    public boilWater(){ // 煮沸水
        console.log('煮沸水')
    }
    public steepTeaBag(){ // 用沸水浸泡茶叶
        console.log('用沸水浸泡茶叶')
    }
    public pourInCup(){ // 把茶倒进杯子
        console.log('倒进杯子')
    }
    public addLemon(){ // 加柠檬
        console.log('加柠檬')
    }
}
```

你已经看到茶和咖啡的类存在着重复代码。请研究茶和咖啡类，然后绘制一个类图，表达出你会如何重新设计这些类来删除重复代码：

![uml类图](https://github.com/PsChina/DesignPattern/blob/master/images/template_pattern.jpg)


#### 更进一步的设计

（一）

我们所遇到的第一个问题，就是咖啡使用 `brewCoffeeGrinds()` 和 `addSugarAndMilk()` 方法，而茶使用 `steepTeaBag()` 和 `addLemon()` 方法。

让我们来思考这一点：浸泡 (steep) 和冲泡 (brew) 差异其实并不大。所以我们给它一个新的方法名称，比方说 `brew()`,然后不管是泡茶或者是泡咖啡我们都用这个名称。

类似的，加糖和牛奶和加柠檬很相似，就叫做 `addCondiments()` 好了。

这样一来我们就有了一个统一的冲泡流程看起来就像这样:

```ts
abstract class CaffeineBeverage{
    constructor() { // 冲泡流程
        this.boilWater()
        this.brew() // 统一后的方法
        this.pourInCup()
        this.addCondiments() // 统一后的方法
    }    
}
```

（二）

现在我们有了新的 `constructor` 方法(类图中用prepareRecipe方法代替)，但是需要让他能够符合代码。要想这么做，我们先从 `CaffeineBeverage` (咖啡因饮料)超类开始：

```ts
abstract class CaffeineBeverage{
    constructor() { // 冲泡流程
        this.boilWater()
        this.brew() // 统一后的方法
        this.pourInCup()
        this.addCondiments() // 统一后的方法
    }
    abstract brew():void // 制作
    abstract addCondiments():void // 加工
    public boilWater(){ // 煮沸水
        console.log('煮沸水')
    }
    public pourInCup(){ // 把茶倒进杯子
        console.log('倒进杯子')
    }
}
```

（三）

最后我们要处理咖啡和茶类了。这两个类实现都是依赖超类(咖啡饮料)来处理冲泡法，所以只需要自行处理冲泡和添加饮料部分：

```ts
class Coffee extends CaffeineBeverage {
    public brew(){
        console.log('冲泡咖啡')
    }
    public addCondiments(){
        console.log('加糖和牛奶')
    }
}
 class Tea extends CaffeineBeverage {
    public brew(){
        console.log('用沸水浸泡茶叶')
    }
    public addCondiments(){
        console.log('加柠檬')
    }
 }
```

测试一下

```ts
 new Tea()

 new Coffee()
```

浏览器输出结果:
```
VM108:59 煮沸水
VM108:85 用沸水浸泡茶叶
VM108:62 倒进杯子
VM108:88 加柠檬
VM108:59 煮沸水
VM108:72 冲泡咖啡
VM108:62 倒进杯子
VM108:75 加糖和牛奶
```

(完)