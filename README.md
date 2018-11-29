# designPattern

这个仓库用于学习和分享设计模式。

参考书籍是 <<Head First 设计模式>> 。

一本用 java 介绍设计模式的书。

所幸 js 程序员可以使用 Typescript 来写 demo 练习。

## 目录

1. [策略模式](#demo01-策略模式)
1. [观察者模式](#demo02-观察者模式)
1. [装饰器模式](#demo03-装饰器模式)
1. [工厂模式](#demo04-工厂模式)
1. [单件模式](#demo05-单件模式)
1. [命令模式](#demo06-命令模式)
1. [适配器模式](#demo07-适配器模式)
1. [模板方法模式](#demo08-模板方法模式)
1. [迭代器模式](#demo09-迭代器模式)
1. [状态模式](#demo10-状态模式)
1. [代理模式](#demo11-代理模式)

### demo01 策略模式

定义：策略模式定义了一系列的算法，并将每一个算法封装起来，而且使他们可以相互替换，让算法独立于使用它的客户而独立变化。

我们通过阅读一个短故事，来学习策略模式所解决的问题。

#### 先从简单点的模拟鸭子做起

Joe 上班的公司做了一套相当成功的模拟鸭子游戏：SimUDuck 。游戏中会出现各种鸭子，一边游泳戏水，一边呱呱叫。此系统内部设计使用了标准的 OO 技术，设计了一个鸭子超类 (Superclass)，并让各种鸭子继承此超类。

```ts
abstract class Duck{ // 鸭子超类 （抽象基类）
    constructor(){}
    quack(){/*呱呱叫*/} // 每只鸭子都会呱呱叫由超类实现
    swim(){/*游泳戏水*/} // 每只鸭子都会游泳由超类实现
    public abstract display():void // 每只鸭子的颜色不一样由子类具体实现
}

class MallardDuck extends Duck{ // 绿头野鸭
    constructor(){
        super()
    }
    display(){
        // 外观是绿头
    }
}

class RedHeadDuck extends Duck{ // 红头鸭
    constructor(){
        super()
    }
    display(){
        // 外观是红头
    }
}
```

#### 现在我们得让鸭子能飞

去年，公司的竞争压力加剧，公司主管认为是时候创新了，他们需要在“下周”的股东会议上展示一些“真正”让人印象深刻的东西来振奋人心。---让模拟程序的鸭子能飞来甩掉竞争者。

Joe 的经理拍着胸脯告诉主管们，Joe只需要一个星期就可以搞定。“毕竟，Joe 是一个 OO 程序员...这有什么困难？”

Joe 想：他只需要在 Duck 类中加上 fly() 方法， 然后所有鸭子都会继承 fly() ，正是他大显身手，展示 OO 才华的时候了。

```ts
abstract class Duck { // 鸭子超类 （抽象基类）
    // ...
    quack() { /*呱呱叫*/ }
    swim() { /*游泳戏水*/ }
    // 增加 fly() 方法
    fly() { /*让鸭子飞起来*/ }
    // ...
}
```

__但是可怕的问题发生了...__

在股东会议上出现很多 “橡皮鸭子” 在屏幕上飞来飞去。

原来 Joe 忽略了一件事: 并非所有的鸭子都会飞。

#### Joe 想到了继承

他可以把橡皮鸭类中的 fly() 方法覆盖掉：

```ts
class RubbrDuck extends Duck { // 橡皮鸭
    constructor(){
        super()
    }
    // ...
    fly(){ // 覆盖 fly() 方法
        // 什么都不做
    }
    quack(){/*吱吱叫*/}
}
```

总算是解决了这个 bug 了， Joe长吁了一口气。

可是这会带来什么问题吗？

比如以后想加入诱饵鸭 (DecoyDuck) , 又会如何？ 诱饵鸭是木头假鸭，不会飞也不会叫...

这会带来很致命的维护问题- __当鸭子类越来越多功能也越来越丰富时，改变会牵一发而动全身，造成其他鸭子不想要的改变，并且运行时的行为不容易改变。__

#### 软件开发的一个不变真理

这是由于 Joe 的代码就是写死的，软件开发的一个不变真理是改变(CHANGE)，不管软件设计的多好，一段时间之后，总是需要成长和改变，否则软件就会“死亡”。

所以我们要设计易扩展的程序将将经常要改变的代码抽离出来抽象成变量或者类来代替，不能写死。

#### 把问题归零

继承不能很好的解决问题，因为鸭子的行为在子类不断的改变，而 __继承的代码不是在父类写死，就是在子类写死__ 。

设计原则: __找出应用中可能需要改变的地方，把它们独立出来，不要和那些需要变化的代码混在一起__ 。

#### 分开变化和不会变化的部分

从哪里开始呢？就我们目前所知，除了 fly() 和 quack() 的问题之外， Duck 类一切还算正常。

现在为了分开“变化和不会变化的部分”，我们准备建立两组类(完全远离Duck类)，一个是 fly 相关，一个是 quack 相关的，每一组类将实现各自的动作。比方说，我们可能有一个类实现“呱呱叫”，另一个实现“吱吱叫”，还有一个实现“安静”

像这样

```ts
interface QuackBehavior{
    quack():void
}

class Quack implements QuackBehavior{
    quack(){/*实现呱呱叫*/}
}

class Squeak implements QuackBehavior{
    quack(){/*实现吱吱叫*/}
}

class MuteQuack implements QuackBehavior{
    quack(){/*什么都不做，不会叫*/}
}

interface FlyBehavior{
    fly():void
}

class FlyWithWings implements FlyBehavior{
    fly(){/*实现飞行*/}
}

class FlyNoWay implements FlyBehavior{
    fly(){
        return undefined // 什么都不做，不会飞
    }
}
```

以上代码运用了一个设计原则：  __针对接口编程而不是针对实现编程__ 。

如果这样做那将来不论是维护还是扩展都会变得轻松我们来写一个 demo 体验一下

```ts
type FLYBEHAVIOR = FlyBehavior | undefined // 飞行联合类型
type QUACKBEHAVIOR = QuackBehavior | undefined // 嘎嘎叫联合类型
/**
 * 鸭子超类 （抽象基类）
 * @class Duck
 **/
abstract class Duck{
    public abstract flyBehavior:FlyBehavior // 拥有一个抽象的飞行行为不涉及具体实现
    public abstract quackBehavior:QuackBehavior // 拥有一个抽象的嘎嘎叫行为不涉及具体实现
    public abstract display():void // 拥有一个显示外观的抽象函数
    constructor(flyBehavior?:FlyBehavior,quackBehavior?:QuackBehavior){ // 新建Duck时支持可选的2个参数
        this.setFlyBehavior(flyBehavior)
        this.setQuackBehavior(quackBehavior)
    }
    setFlyBehavior(flyBehavior:FLYBEHAVIOR){ // 设置具体飞行行为
        this.flyBehavior = flyBehavior
    }
    setQuackBehavior(quackBehavior:QUACKBEHAVIOR){ // 设置具体嘎嘎叫行为
        this.quackBehavior = quackBehavior
    }
    performFly(){ // 执行飞行行为
        this.flyBehavior.fly()
    }
    performQuack(){ // 执行嘎嘎叫行为
        this.quackBehavior.quack()
    }
}

/**
 * 鸭子超类 （抽象基类）
 * @class MallardDuck
 **/
class MallardDuck extends Duck{ // 绿头野鸭
    public flyBehavior:FlyBehavior
    public quackBehavior:QuackBehavior
    constructor(...rest){
        super(...rest)
    }
    display(){
        console.log('显示绿色')
    }
}

let mallardDuck = new MallardDuck() // 新建一个不具备任何行为的绿头野鸭

let flyWithWings = new FlyWithWings() // 飞行

mallardDuck.setFlyBehavior(flyWithWings) // 设置飞行行为

let quack = new Quack() // 呱呱叫行为

mallardDuck.setQuackBehavior(quack) // 设置呱呱叫行为

// 这样我们就可以随意组合已经存在的任意飞行行为和各种叫声

// 测试一下

mallardDuck.performFly() //执行飞行

mallardDuck.performQuack() //执行叫声

//我们甚至可以更改绿头野鸭的叫声
let squeak = new Squeak() // 吱吱叫

mallardDuck.setQuackBehavior(squeak) // 设置吱吱叫到绿头野鸭上

mallardDuck.performQuack() //执行叫声

// 相关代码在同级目录有已经转义的js
```

设计原则: __多用组合，少用继承。“有一个”可能比“是一个”更好。__

#### 总结

1 __不管软件设计的多好，一段时间之后，总是需要成长和改变，否则软件就会“死亡”,所以我们需要找出应用中可能需要改变的地方，把它们独立出来，不要和那些需要变化的代码混在一起。__

2 __抽离出来的经常变化的代码我们要针对他们的接口编程而不是针对实现编程。__

3 __多用组合，少用继承。“有一个”可能比“是一个”更好。__

[相关代码 demo01](https://github.com/PsChina/DesignPattern/tree/master/demo01)

有兴趣的朋友可以将 js 拷贝到浏览器控制台运行一下。

(demo1 完)

### demo02 观察者模式

定义:在对象之间定义一对多的依赖，这样一来，当一个对象改变状态，依赖它的对象都会收到通知，并自动更新。

举个例子： 气象站

主题是天气。

根据检测到的天气，需要展示不同的信息，比如

以下四个观察者：

1、观察最高温度，最低温度，平均温度。
2、观察天气推荐穿衣搭配的建议。
3、观察显示当前天气的各种数据。
4、观察预测将来的天气（天气预报）。

学习观察者模式需要了解的知识点：

#### 主题

主题是被观察的对象，它持有许多观察者，可以动态的添加删除观察者，以及通知观察者自身的变化。

```ts
interface Subject {
    registerObserver(observer:Observer):void
    removeObserver(observer:Observer):void
    notifyObservers(observers?:Array<Observer>):void
}
```

以上是主题接口，对象使用此接口注册为观察者，或者把自己从观察者中删除。

#### 观察者

观察者拥有一个 updata 函数，当收到主题的通知时调用 updata 更新数据。

```ts
interface Observer {
    updata(params?:any):void //根据实际项目自定义参数
}
```

以上是观察者接口，所有潜在的观察者必须实现观察者接口，这个接口只有 updata 一个方法。

#### 使用观察者模式实现气象站

现在我们来用观察者来实现一个气象站。

#### 实现天气主题

```ts
class WeatherData implements Subject {
    private observers: Array<Observer> // 观察者
    private temperature: number // 温度
    private humidity: number // 湿度
    private pressure: number // 压力
    constructor(){
        this.observers = []
        this.run()
    }
    public registerObserver(observer:Observer) { //注册观察者
        this.observers.push(observer)
    }
    public removeObserver(observer:Observer) { //注销观察者
        let index = this.observers.indexOf(observer)
        if(index!==-1){
            this.observers.splice(index,1)
        }
    }
    public notifyObservers(observers = this.observers) { // 通知观察者
        for(let observer of observers){
            observer.updata(this.temperature,this.humidity,this.pressure) // 更新
        }
    }
    getTemperature(){ // 获取温度
        return this.temperature
    }
    getHumidity(){ // 获取湿度
        return this.humidity
    }
    getPressure(){ // 获取压力
        return this.pressure
    }
    measurementsChange(temperature:number,humidity:number,pressure:number) {
        this.temperature = temperature
        this.humidity = humidity
        this.pressure = pressure
        this.notifyObservers() // 通知观察者
    }
    run(){
        setTimeout(() => {
            let temperature = Math.random()*38 - 10
            let humidity = Math.random()
            let pressure = 95 + Math.random()*5
            this.measurementsChange(Number(temperature.toFixed(1)),Number(humidity.toFixed(1)), Number(pressure.toFixed(1)))
        }, 0);
        setInterval(()=>{
            let temperature = Math.random()*38 - 10
            let humidity = Math.random()
            let pressure = 95 + Math.random()*5
            this.measurementsChange(Number(temperature.toFixed(1)),Number(humidity.toFixed(1)), Number(pressure.toFixed(1)))
        },1000*4)
    }
}
```

#### 实现当前天气

```ts
interface DisplayElement { // 显示在浏览器的接口
    display():void
}

class CurrentWeatherDisplay implements Observer, DisplayElement{ // 当前天气
    private temperature: number // 温度
    private humidity: number // 湿度
    private pressure: number // 压力
    private view:HTMLElement // 布告栏天气视图
    constructor(view:HTMLElement){
        this.view = view
    }
    updata(temperature:number,humidity:number,pressure:number){
        this.temperature = temperature
        this.humidity = humidity
        this.pressure = pressure
        this.display()
    }
    display(){
        this.view.innerHTML= `
        <div>当前温度:${this.temperature.toFixed(2)}</div>
        <div>当前湿度:${this.humidity.toFixed(2)}</div>
        <div>当前压力:${this.pressure.toFixed(2)}</div>
        `
    }
}
```

#### 初始化

```ts
    const bulletinBoard = document.body // 布告栏

    const weatherData = new WeatherData() // 天气

    const currentWeatherDisplayView = document.createElement('div') // 创建一个div显示 当前天气

    const currentWeatherDisplay = new CurrentWeatherDisplay(currentWeatherDisplayView) // 当前天气

    weatherData.registerObserver(currentWeatherDisplay) // 将当前天气注册成观察者

    bulletinBoard.appendChild( // 在布告栏绑定当前天气
        currentWeatherDisplayView
    )
```

详细的代码在demo2已经编译成了 js 并且可以直接运行，有兴趣的朋友可以运行试着一下。

[相关代码 demo02](https://github.com/PsChina/DesignPattern/tree/master/demo02)

(demo02 完)

### demo03 装饰器模式

定义: 动态地将责任附加到对象上。若要扩展功能，装饰者提供了比继承更有弹性的替代方案。

假如我们需要为一家咖啡店比如星巴克写一个自动售货系统，需要定义各种各样的咖啡类，这时候我们应该如何定义？

如果单纯的采用继承那么则会造成类爆炸的情况因为调料的排列组合情况多到数不清，我们可以通过装饰器模式来解决这个问题。

我们以饮料这个基类为主体，然后在运行时以调料来装饰饮料，

比方说，如果顾客想要加咖啡和牛奶的卡布奇诺。

那么要做的是：

1 拿到一个卡布奇诺（Cappuccino）对象

2 以咖啡（Coffee）对象装饰它

3 以牛奶（Milk）对象装饰它

4 调用 cost() 方法, 并依赖委托（delegete）将调料的价钱加上去

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

完美解决类爆炸的问题

[相关代码 demo03](https://github.com/PsChina/DesignPattern/tree/master/demo03)

(demo03 完)

### demo04 工厂模式

定义: 定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类把实例化推迟到子类。

工厂模式能解决什么问题？

举个例子：

假设你有一个披萨店生产模式做的非常棒，需要推广，但是各个地区顾客的口味不一样，这样披萨的口味是随地域的变化而变化，在生产披萨时需要判断顾客的喜好会变得难以维护，虽然它是一个固定的常数。

不采用工厂模式的代码：

```ts
class DependentPizzaStore { // 一个依赖具体实现的披萨商店
    public createPizza(type:string,style:string){
        let pizza:Pizza
        if (style === 'NY') { // 纽约风味
            if(type === 'cheese'){
                pizza = new NYCheesePizza() // 新建纽约风味的奶酪披萨
            }else if(type === 'veggie'){
                pizza = new NYVeggiePizza() // 新建纽约风味的素披萨
            }
            // ... other type
        } else if(style === 'Chicago') { // 芝加哥风味
            // new Chicago tyle pizza
        } else if(style === 'California') { // 加利福尼亚风味
            // new California tyle pizza
        } else {
            throw new Error('Style not found!')
        }
        return pizza
    }
    public orderPizza(type:string,style:string){ // 收到披萨订单会调用该方法
        let pizza = this.createPizza(type,style) // 创建披萨
        pizza.prepare() // 加工前的准备工作
        pizza.bake() // 烘焙
        pizza.cut() // 切片
        pizza.box() // 打包
        // 披萨制作工艺
    }
}
```

可以发现如果有其他地区的加盟店需要加盟你的披萨店，那么不可避免的要修改 `DependentPizzaStore` ，而且不断会有新的地区的披萨店加盟，这样的设计是比较糟糕的，我们来用工厂模式优化一下吧。

#### 依赖倒置

__通常情况下使用继承都是子类依赖父类的具体实现，而依赖倒置则是子类实现父类的抽象，父类依赖子类的具体实现__。

我们发现上面的代码中 `DependentPizzaStore` 创建披萨的函数，依赖于具体实现。

我们可以将创建披萨的函数定义成一个抽象类方法，将 `DependentPizzaStore` 变成不依赖具体实现的抽象基类 `PizzaStore` ，

只保留制作披萨的工艺的具体实现。

让具体的地方加盟店实现能生产具有地方特色的披萨 `createPizza` 函数

```ts
abstract class PizzaStore { // 一个依赖抽象方法的披萨商店
    public abstract createPizza(type:string):Pizza
    public orderPizza(type:string){ // 收到披萨订单会调用该方法
        let pizza = this.createPizza(type) // 创建披萨
        pizza.prepare() // 加工前的准备工作
        pizza.bake() // 烘焙
        pizza.cut() // 切片
        pizza.box() // 打包
        // 披萨制作工艺
        // 出货
        console.log(pizza)
    }
}

class HuNanPizzaStore extends PizzaStore {
    constructor(){
        super()
    }
    public createPizza(type:string){
        let pizza:Pizza
        switch(type){
            case 'cheese':
                pizza = new HuNanCheesePizza(['雪花大肥牛','奶酪']) // 湖南奶酪披萨
              break;
            case 'veggie':
                pizza = new HuNanVeggiePizza(['金莲子','人参果']) // 湖南素披萨
              break;
            // Other types ...
            default:
              break;
        }
        return pizza
    }
}
```

这样我们就能在任意的地方开设具有地方特色的加盟店了。

但是我们忽略了 `Pizza` 这个抽象基类，以及他的子类，我们可以补足一下:

```ts
abstract class Pizza{ // 披萨
    public name:string //名称
    public dough:string //面团类型
    public sauce:string // 酱料类型
    public toppings:Array<string> // 一套佐料
    constructor(toppings:Array<string>){
        this.toppings = toppings
    }
    public prepare() {
        console.log('添加佐料')
        for(let topping of this.toppings){
            console.log(`添加${topping}`)
        }
    }
    public bake(){
        console.log('烘焙')
    }
    public cut(){
        console.log('切割')
    }
    public box(){
        console.log('打包')
    }
}

class HuNanCheesePizza extends Pizza{
    constructor(toppings:Array<string>){
        super(toppings)
        this.name = '湖南奶酪披萨'
    }
}

class HuNanVeggiePizza extends Pizza {
    constructor(toppings:Array<string>){
        super(toppings)
        this.name = '湖南素披萨'
    }
}
```

试一试

```ts
// 开一家湖南披萨加盟店
let huNanPizzaStore = new HuNanPizzaStore()

// 顾客下单 奶酪披萨

huNanPizzaStore.orderPizza('cheese')


// 顾客下单 湖南素披萨

huNanPizzaStore.orderPizza('veggie')

```

效果

```log
huNanPizzaStore.orderPizza('veggie');

VM165:16 添加佐料
VM165:19 添加雪花大肥牛
VM165:19 添加奶酪
VM165:23 烘焙
VM165:26 切割
VM165:29 打包
VM165:62 HuNanCheesePizza {toppings: Array(2), name: "湖南奶酪披萨"}name: "湖南奶酪披萨"toppings: (2) ["雪花大肥牛", "奶酪"]__proto__: Pizza
VM165:16 添加佐料
VM165:19 添加金莲子
VM165:19 添加人参果
VM165:23 烘焙
VM165:26 切割
VM165:29 打包
VM165:62 HuNanVeggiePizza {toppings: Array(2), name: "湖南素披萨"}name: "湖南素披萨"toppings: (2) ["金莲子", "人参果"]__proto__: Pizza
undefined
```

[相关代码 demo04](https://github.com/PsChina/DesignPattern/tree/master/demo04)

(demo04 完)

### demo05 单件模式

定义: 确保一个类只有一个实例，并提供一个局部访问点。

单件模式也称单例模式。

js 没有多线程所以在 ts 没有 `synchronized` `volatile` 这样的关键字，不能练习多线程下的单件模式。

在 js 中单件模式其实在很多地方被用到比如 vue 的 vueRouter ，eventBus 等。

单件模式确保一个类只有一个实例，不会导致本该存在一个的事物重复出现。

```ts
class Singleton {
    static instance // 静态变量
    public name // 局部变量
    constructor(){
        if(Singleton.instance){ // 如果单例存在
            return Singleton.instance // 中断构造函数的建造过程返回单例
        }
        Singleton.instance = this // 否则让构造函数正常运行新建单例并且保存下来
    }
}

let instance1 = new Singleton()

instance1.name = 'A';

console.log(`instance1.name:${instance1.name}`)

let instance2 = new Singleton()

console.log(`instance2.name:${instance2.name}`)

instance2.name = 'B'

console.log(`instance2.name:${instance2.name}`)

console.log(`instance1 === instance2 ? ==> ${instance1 === instance2}`)
```

浏览器输出结果：

```log
VM18139:12 instance1.name:A
VM18139:14 instance2.name:A
VM18139:16 instance2.name:B
VM18139:17 instance1 === instance2 ? ==> true
```

[相关代码 demo05](https://github.com/PsChina/DesignPattern/tree/master/demo05)

(demo05 完)

### demo06 命令模式

定义: 将“请求”封装成对象，以便使用不同的请求、队列或者日志来参数化其他对象。命令模式也支持可撤销的操作。

意图：将一个请求封装成一个对象，从而使您可以用不同的请求对客户进行参数化。

主要解决：在软件系统中，行为请求者与行为实现者通常是一种紧耦合的关系，但某些场合，比如需要对行为进行记录、撤销或重做、事务等处理时，这种无法抵御变化的紧耦合的设计就不太合适。

关键代码：

需要定义三个角色：

1、received 真正的命令执行对象

2、Command 命令

3、invoker 使用命令对象的入口

我们来实现一个用户用遥控器打开客厅的灯的demo

#### Command

命令对象提供了 execute() 这个方法封装了命令实际调用者的执行动作

```ts
interface Command { // 命令接口
    execute():void
}
```

#### received 真正的命令执行对象

真正的命令执行对象是 `客厅的灯`

```ts
interface Light { // 灯这个设备具有 开灯这个方法
    on():void
    off():void
}

class LivingRoomLight implements Light { // 客厅的灯
    public on(){
        console.log('开灯')
    }
    public off(){
        console.log('关灯')
    }
}
```

#### invoker 使用命令对象的入口 (遥控器)

遥控器内持有一个命令插槽可以插入任何命令

当按钮按下时便会让命令执行

```ts
class SimpleRemoteControl {
    public slot:Command
    public setCommand(command:Command){ // 这个方法用来设置插槽控制的命令
        this.slot = command
    }
    public buttonWasPressed(){ // 当按钮按下时这个方法就会被调用
        this.slot.execute() // 使用当前命令衔接插槽，并调用它的 execute 方法
    }
}
```

#### 我们还需要一个会使用命令模式(遥控器)的用户

```ts
class User { // 这是一个使用命令模式的客户
    public openLightWithControl(light:Light, remoteControl:SimpleRemoteControl){ // 它使用遥控器开灯
          // 生成将灯打开的命令
        let command = new LightOnCommand(light) // 生成一个打开客厅灯的命令
        // 然后将命令注入遥控器
        remoteControl.setCommand(command)
        // 按下遥控器的开关执行这个命令
        remoteControl.buttonWasPressed() // 这样就可以执行任何命令了
    }
}
```

#### 测试一下

```ts
// 测试一下

// 新建遥控器
let remoteControl = new SimpleRemoteControl()
// 新建灯
let light = new LivingRoomLight()
// 新建用户
let user = new User()

user.openLightWithControl(light, remoteControl) // 用遥控器开灯

```

有兴趣的朋友可以尝试封装一个关灯命令

#### 浏览器输出结果

```log
开灯
undefined
```

[相关代码 demo06](https://github.com/PsChina/DesignPattern/tree/master/demo06)

(demo06 完)

### demo07 适配器模式

定义:将一个类接口，转换成客户期望的另一个接口。适配器让原本接口不兼容的类可以合作无间。

这有点像 json 解析，服务器给出的数据有可能不是我们想要的格式或者类型又或者后端暂时无法提供接口但你又不得不赶进度，为了使得数据能够正常显示我们可以采用适配器模式作为中转类似的例子有 `axios-mock-adapter` ，当然你也可以不这么做。

在本章，我们将要进行一项任务，其不可能程度，简直就像是将一个方块放进一个圆洞中。

适配器模式uml类图:

![适配器模式uml类图](https://github.com/PsChina/DesignPattern/blob/master/images/adapter_pattern.png)

假设一小鸭子遇到了一只火鸡，但它以为它遇到的是一只成年的大鸭子并且和它用鸭语沟通，那么我们要怎么设计这个适配器呢？

#### 基本设施

```ts
interface QuackAble {
    quack():void
}

class Duck implements QuackAble{
    quack(){
        console.log('嘎嘎叫')
    }
}

class Turkey {
    cluck(){
        console.log('咯咯叫')
    }
}
```

我们有两种适配方案

#### 对象适配器

```ts
class ObjectAdapter implements QuackAble{ // 对象适配器
    private turkey:Turkey
    constructor(turkey?:Turkey){
        this.turkey = turkey
    }
    setTurkey(turkey:Turkey){
        this.turkey = turkey
    }
    quack(){ // 适配器实现了 quack 接口 但是它收到请求时会委托给火鸡
        this.turkey.cluck()
    }
}
```

#### 类适配器

```ts
class ClassAdapter extends Turkey { // 类适配器
    quack(){ // 直接转换接口
        this.cluck()
    }
}
```

接下来我们分别测试一下这两种方案，看看能不能让火鸡调用嘎嘎叫这个方法来发出叫声。

测试对象适配器

```ts
let turkey = new Turkey() // 创建火鸡

let turkeyAdapter = new ObjectAdapter() // 创建火鸡适配器

turkeyAdapter.setTurkey(turkey) // 将被适配的火鸡设置到适配器中

turkeyAdapter.quack() // 让火鸡以嘎嘎叫的方式咯咯叫
```

浏览器输出结果

```log
咯咯叫
undefined
```

测试类适配器

```ts
let turkeyDuck = new ClassAdapter() // 新建火鸡扩展类实例---火鸡鸭

turkeyDuck.quack() // 让火鸡鸭嘎嘎叫
```

浏览器输出结果

```log
咯咯叫
undefined
```

#### 一个将枚举用适配器适配迭代器的例子

枚举类型

```ts
enum Types {
    type1 = '类型一',
    type2 = '类型二',
    type3 = '类型三'
}
```

枚举类型迭代适配器

```ts
class ArrayAdapterOfEnum {
    private anyEnum:object
    private index:number
    private values:Array<any>
    constructor(anyEnum?:object) {
        this.setEnum(anyEnum)
    }
    [Symbol.iterator](){
        let _this = this
        return {
            next(){
                return {
                    done:_this.index>=_this.values.length ? true : false,
                    value:_this.values[_this.index++]
                }
            }
        }
    }
    setEnum(anyEnum?:object){
        this.anyEnum = anyEnum || {}
        this.values = []
        for(let key in this.anyEnum){
            this.values.push(this.anyEnum[key])
        }
        this.index = 0
        return this
    }
}
```

测试

```ts
let arrayAdapterOfEnum = new ArrayAdapterOfEnum()

for(let item of arrayAdapterOfEnum.setEnum(Types)){
    console.log(item)
}
```

浏览器输出结果

```log
VM109:51 类型一
VM109:51 类型二
VM109:51 类型三
undefined
```

[相关代码 demo07](https://github.com/PsChina/DesignPattern/tree/master/demo07)

(demo07 完)

### demo08 模板方法模式

定义: 在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中，模板方法使得子类可以在不改变算法的情况下，重新定义算法中的某些步骤。

直到目前我们的议题都围绕着封装；我们已经封装了对象创建、方法调用、复杂接口、鸭子、比萨、、、加下来呢？

我们将要深入封装算法模块，好让子类可以在任何时候都可以将自己挂接进运算里。我们甚至会在本章学到一个受到好莱坞影响而启发的设计原则。

#### 多来点咖啡因吧

有些人没有咖啡就活不下去；有些人则离不开茶。两者共同成分是什么？当然是咖啡因了！

但还不只是这样；茶和咖啡的冲泡方式非常相似，不信你瞧瞧

#### 星巴兹咖啡师傅训练手册

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

#### Coffe 类

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

#### Tea 类

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

```log
VM108:59 煮沸水
VM108:85 用沸水浸泡茶叶
VM108:62 倒进杯子
VM108:88 加柠檬
VM108:59 煮沸水
VM108:72 冲泡咖啡
VM108:62 倒进杯子
VM108:75 加糖和牛奶
```

[相关代码 demo08](https://github.com/PsChina/DesignPattern/tree/master/demo08)

(demo08 完)

### demo09 迭代器模式

定义: 提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露其内部的表示。

实际上 jQuery 就已经实现了迭代器 $.each

```js
$.each([1,2,3], function(index, value) {
    console.log(index, value)
})
```

一般的迭代，我们至少要有2个方法，hasNext() 和 next() ，这样才做做到遍历所有对象，所以我们的迭代器接口如下：

```ts
interface Iterator<T> {
    hasNext():boolean
    next():T
}
```

我们实现一个数组迭代器

```ts
class ArrayIterator implements Iterator<any>{
    private arr: Array<any>
    private index: number
    constructor (arr: Array<any>) {
        this.arr = arr
        this.index = 0
    }
    hasNext() {
        if (this.index < this.arr.length) {
            return true
        }
        this.index = 0
        return false
    }
    next() {
        return this.arr[this.index++]
    }
    getIndex() {
        return this.index
    }
}
```

尝试迭代一个数组

```ts
let arr1 = [1,2,3,4,5]

let arrayIterator = new ArrayIterator(arr1)

while (arrayIterator.hasNext()) {
    console.log(arrayIterator.next())
}
```

浏览器运行结果

```log
VM112:21 1
VM112:21 2
VM112:21 3
VM112:21 4
VM112:21 5
undefined
```

最后模拟实现 jQuery 的 each 方法

```ts
const arr2 = [1,2,3]
const $ = {
    each (arr:Array<any>, callback:Function) {
        let arrayIterator = new ArrayIterator(arr)
        while (arrayIterator.hasNext()) {
            callback(arrayIterator.getIndex(), arrayIterator.next())
        }
    }
}

$.each (arr2, function(index, value) {
    console.log(index, value)
})
```

浏览器运行结果

```log
VM115:36 0 1
VM115:36 1 2
VM115:36 2 3
undefined
```

[相关代码 demo09](https://github.com/PsChina/DesignPattern/tree/master/demo09)

(demo09 完)

### demo10 状态模式

定义:允许对象在内部状态发生改变时改变它的行为，对象看起来好像修改了它的类。

这个模式书上的篇幅稍微有点长（p385-p428）共 43 页，我大概花了一个小时的时间，才阅读完毕，但是阅读这篇文件应该不需要那么久。

分为 4 个部分

1 应用场景

2 一个糟糕的实例

3 如何改进

4 状态模式

#### 应用场景

万能糖果公司想设计一款糖果自动售货机

糖果自动售货机有如下状态:

![糖果自动售货机状态](https://github.com/PsChina/DesignPattern/blob/master/images/status.jpg)

__所有状态__:

Status1: 没有 25 分钱

Status2: 有 25 分钱

Status3: 售出糖果

Status4: 糖果售罄

__所有行为__:（触发行为将改变状态）

ActionA: 投入 25 分钱

ActionB: 退回 25 分钱

ActionC: 转动曲柄

ActionD: 发放糖果

#### 一个糟糕的实例

我们在实现改变状态的行为时需要考虑的点：

例如：

`没有 25 分钱` 状态下不能触发的行为 `退回 25 分钱`、`发放糖果`。

还有其他的点这里不一一列出

定义一个状态机类 `GumballMachine`，它含有所有的状态和行为的具体实现。

```ts
class GumballMachine {
    private SOLD_OUT = '售罄' // 售罄
    private NO_QUARTER = '没有 25 分钱' // 没有 25 分钱
    private HAS_QUARTER = '有 25 分钱' // 有 25 分钱
    private SOLD = '售出糖果' // 售出糖果
    private count: number // 库存
    private status: string // 机器当前状态
    constructor(count:number) { // 构造器 接收一个库存参数 count 。
        this.count = count
        if (count > 0) { // 如果库存为正将状态的设置为：没有 25 分钱。
            this.status = this.NO_QUARTER
        } else {
            // 否则将状态设置为售罄。
            this.status = this.SOLD_OUT
        }
    }
    public getCurrentStatus(){ // 返回售货机当前状态
        return this.status
    }
    public insertQuarter() { // 投入 25 分钱
        switch (this.status) { // 更具当前状态做出不同的动作

            case this.NO_QUARTER: // 没有 25 分钱
                this.status = this.HAS_QUARTER // 变更状态
                console.log('你投入了一枚 25 分的硬币。')
                break;

            case this.HAS_QUARTER: // 有 25 分钱还投币
                console.log('你已经投币，不能再投入其他的币。')
                break;

            case this.SOLD_OUT: // 已经售罄还投币
                console.log('你不能投币，机器内糖果已经售罄。')
                break;

            case this.SOLD: // 已经操作摇杆正在销售糖果的情况下再次投币
                console.log('请等待糖果机吐出糖果。')
                break;

            default:
                break;
        }
    }
    public ejectQuarter() { // 退回 25 分钱
        switch (this.status) { // 更具当前状态做出不同的动作

            case this.HAS_QUARTER: // 如果有 25 分钱还投币。
                console.log('退回 25 分钱')
                this.status = this.NO_QUARTER // 将状态改回没有 25 分钱
                break;

            case this.NO_QUARTER: // 没有 25 分钱
                console.log('你没有投入 25 分钱')
                break;

            case this.SOLD_OUT: // 已经售罄的情况退钱
                console.log('你不能退钱，你还没有投入 25 分钱。')
                break;

            case this.SOLD: // 如果已经操作摇杆正在销售糖果的情况下退钱
                console.log('对不起你已经摇了销售糖果的摇杆，无法退回 25 分钱。')
                break;

            default:
                break;
        }
    }
    public turnCrank() { // 顾客试着转动曲柄
        switch (this.status) { // 更具当前状态做出不同的动作

            case this.HAS_QUARTER: // 如果有 25 分钱
                console.log('出售糖果')
                this.dispense() // 出售糖果
                this.status = this.SOLD // 更改状态
                break;

            case this.SOLD: // 如果已经售出糖果
                console.log('转动两次或者超过两次曲柄，无法再次获得糖果。')
                break;

            case this.NO_QUARTER: // 没有 25 分钱
                console.log('你需要投入 25 分钱。')
                break;

            case this.SOLD_OUT: // 已经售罄
                console.log('已售罄，我们不能提供糖果。')
                break;

            default:
                break;
        }
    }
    public dispense() {
        switch (this.status) { // 更具当前状态做出不同的动作

            case this.SOLD: // 发放糖果
                this.count -= 1 //库存减一
                if( this.count === 0 ) { // 库存为零
                    console.log('已售罄。')
                    this.status = this.SOLD_OUT // 改为已售罄状态
                } else { // 还有库存
                    this.status = this.NO_QUARTER // 改为未投币状态
                }
                break;
            // 以下情况都不应该发生，如果这么做了他们得到的是错误消息
            case this.HAS_QUARTER: // 有 25 分钱
                console.log('没有触发售货曲柄。')
                break;

            case this.NO_QUARTER: // 没有 25 分钱
                console.log('必须先支付 25 分钱。')
                break;

            case this.SOLD_OUT: // 已经售罄
                console.log('已售罄，我们不能提供糖果。')
                break;

            default:
                break;
        }
    }
}
```

##### 内部测试

完成后我们先做一个小小的内部测试:

```ts
// 实例化糖果售货机

let gumballMachine = new GumballMachine(2) // 放入 2 颗糖果

console.log('当前状态：')

console.log(gumballMachine.getCurrentStatus()) // 打印当前状态

// 投入一枚25分钱的硬币
console.log('投入一枚25分钱的硬币')

gumballMachine.insertQuarter()

// 转动曲柄我们应该拿到糖果
console.log('转动曲柄')

gumballMachine.turnCrank()

// 再次打印当前状态
console.log('再次打印当前状态')

console.log(gumballMachine.getCurrentStatus())


// 投入一枚 25 分钱的硬币
console.log('投入一枚25分钱的硬币')
gumballMachine.insertQuarter()


// 要求机器退钱
console.log('退钱')

gumballMachine.ejectQuarter()


// 转动曲柄， 我们不应该拿到糖果
console.log('摇动出货曲柄')

gumballMachine.turnCrank()


// 再次打印当前状态
console.log('再次打印当前状态')

console.log(gumballMachine.getCurrentStatus())


// 投入两枚25分钱的硬币
console.log('投入一枚25分钱的硬币')

gumballMachine.insertQuarter()

console.log('尝试再次投入两枚25分钱的硬币')

gumballMachine.insertQuarter()


// 转动曲柄我们应该拿到糖果
console.log('摇动出货曲柄')

gumballMachine.turnCrank()


// 投入一枚25分钱的硬币我们应该无法投币
console.log('尝试投入两枚25分钱的硬币')
gumballMachine.insertQuarter()
```

浏览器输出结果:

```log
VM151:107 当前状态：
VM151:108 没有 25 分钱
VM151:110 投入一枚25分钱的硬币
VM151:23 你投入了一枚 25 分的硬币。
VM151:113 转动曲柄
VM151:60 出售糖果
VM151:116 再次打印当前状态
VM151:117 没有 25 分钱
VM151:119 投入一枚25分钱的硬币
VM151:23 你投入了一枚 25 分的硬币。
VM151:122 退钱
VM151:41 退回 25 分钱
VM151:125 摇动出货曲柄
VM151:68 你需要投入 25 分钱。
VM151:128 再次打印当前状态
VM151:129 没有 25 分钱
VM151:131 投入一枚25分钱的硬币
VM151:23 你投入了一枚 25 分的硬币。
VM151:133 尝试再次投入两枚25分钱的硬币
VM151:26 你已经投币，不能再投入其他的币。
VM151:136 摇动出货曲柄
VM151:60 出售糖果
VM151:82 已售罄。
VM151:139 尝试投入两枚25分钱的硬币
VM151:29 你不能投币，机器内糖果已经售罄。
```

万能糖果公司已经将你的代码放进他们的新机器中，然后让他们的质保专家进行测试。到目前为止，在他们看来一切都很顺利。

事实上，实在是太顺利了，所以他们想要变点花样...

糖果公司认为，将“购买糖果”变成一个游戏，可以大大增加他们的销售量：

游戏规则： `售出糖果` 状态有 10% 的机会导致掉下两颗糖果，而不是一颗。

##### 混乱的状态

使用一种周祥的方法学写糖果机的代码，并不意味着这份代码容易扩展

```ts
class GumballMachine{
public turnCrank() {
    // 修改代码 生成赢家和判断赢家
}
public dispense() {
    // 修改售出糖果的数量以及库存是否充足的判断逻辑
}
```

尽管这样就该能满足这一次的调整，但是不断变化是一个产品的常态，所以以上的设计是一个糟糕的设计。

让我们来改进它！

#### 如何改进

之前我们学习过，我们要将变化的代码封装起来，所以我们我们应该试着局部化每个状态的行为，这样一来某个状态变化，就不会把其他代码给搞乱了。

换句话说就是 `封装变化` 原则。

如果我们将每个状态的行为都放在各自的类中，那么每个状态只要实现它自己的动作就可以了。

让后将状态委托给糖果机器，这就是 `多用组合，少用继承` 。

新的设计:

1 首先，我们定义一个 State 接口。 在这个接口内，糖果机的每个动作都有一个对应的方法。

2 然后为机器中的每个状态实现状态类。这些类将负责在对应的状态下进行机器的行为。

3 最后，我们要摆脱旧的条件代码，取而代之的方式是，将动作委托都状态类。

#### 状态模式

定义一个 State 接口

```ts
interface State {
    insertQuarter():void
    ejectQuarter():void
    turnCrank():void
    dispense():void
}
```

为机器中的状态实现状态类

```ts
class NoQuarterState implements State { // 没有 25 分钱
    private gumballMachine:GumballMachine
    public name: string
    constructor(gumballMachine:GumballMachine){ // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '没有 25 分钱'
    }
    insertQuarter() {
        this.gumballMachine.setState(this.gumballMachine.getHasQuarterState())
    }
    ejectQuarter() { // 如果没给钱就不能要求退钱
        console.log('你没有投币。')
    }
    turnCrank(){ // 如果没给钱就不能要求售出糖果
        console.log('你摇动了曲柄，但是没有投币。')
    }
    dispense(){ // 如果没给钱就不能发放糖果
        console.log('你需要先投币')
    }
}

class HasQuarterState implements State { // 有 25 分钱
    private gumballMachine:GumballMachine
    public name: string
    constructor(gumballMachine:GumballMachine){ // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '有 25 分钱'
    }
    insertQuarter() {
        console.log('你已经投过币了，不需要再投币了。')
    }
    ejectQuarter() {
        console.log('返还 25 分钱')
        this.gumballMachine.setState(this.gumballMachine.getNoQuarterState())
    }
    turnCrank(){
        console.log('售出糖果')
        let winner = Math.random() <= 0.1
        if (winner) {
            this.gumballMachine.setState(this.gumballMachine.getWinnerState())
        } else {
            this.gumballMachine.setState(this.gumballMachine.getSoldState())
        }
    }
    dispense(){ // 这是一个不应该发生的动作
        console.log('还未摇动摇杆，无法售出糖果。')
    }
}

class SoldState implements State {
    private gumballMachine:GumballMachine
    public name: string
    constructor(gumballMachine:GumballMachine){ // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '售出糖果'
    }
    insertQuarter() { // 在售出糖果的时候不能再投币了
        console.log('已经投过币了，请等待糖果售出。')
    }
    ejectQuarter() {
        console.log('对不起，你已经摇动了售货曲柄，无法退钱了...')
    }
    turnCrank(){
        console.log('你已经摇动过售货曲柄了，同一次购买不能售货两次。')
    }
    dispense(){ // 发放糖果
        this.gumballMachine.releaseBall() // 发放糖果
        // 改变至下一个状态
        if (this.gumballMachine.getCount() > 0) { // 库存为正
            this.gumballMachine.setState(this.gumballMachine.getNoQuarterState()) // 设置到未投币状态
        } else {
            this.gumballMachine.setState(this.gumballMachine.getSoldOutState()) // 库存等于小于零 设置到售罄状态
        }
    }
}

class SoldOutState implements State {
    private gumballMachine:GumballMachine
    public name: string
    constructor(gumballMachine:GumballMachine){ // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '售罄'
    }
    insertQuarter() {
        console.log('糖果已售罄不能投币。')
    }
    ejectQuarter() {
        console.log('对不起，糖果已售罄你无法投币，也无法退币。')
    }
    turnCrank(){
        console.log('你已经摇了曲柄，但是糖果已售罄。')
    }
    dispense(){
        console.log('糖果已售罄，无法发放糖果.')
    }
}
```

赢家状态类

```ts
class WinnerState implements State {
    private gumballMachine:GumballMachine
    public name: string
    constructor(gumballMachine:GumballMachine){ // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '赢家'
    }
    insertQuarter() { // 在售出糖果的时候不能再投币了
        console.log('已经投过币了，请等待糖果售出。')
    }
    ejectQuarter() {
        console.log('对不起，你已经摇动了售货曲柄，无法退钱了...')
    }
    turnCrank(){
        console.log('你已经摇动过售货曲柄了，同一次购买不能售货两次。')
    }
    dispense(){
        console.log('恭喜你，你获得了赢家状态，如果库存充足的话，你讲获得额外的一颗糖！')
        this.gumballMachine.releaseBall() // 发放第一颗糖果
        // 改变至下一个状态
        if (this.gumballMachine.getCount() > 0) { // 库存为正
            this.gumballMachine.releaseBall() // 发放第二课糖果
            if (this.gumballMachine.getCount() > 0) {
                this.gumballMachine.setState(this.gumballMachine.getNoQuarterState()) // 设置到未投币状态
            } else {
                this.gumballMachine.setState(this.gumballMachine.getSoldOutState()) // 库存等于小于零 设置到售罄状态
            }
        } else {
            this.gumballMachine.setState(this.gumballMachine.getSoldOutState()) // 库存等于小于零 设置到售罄状态
        }
    }
}
```

一个可以有 `10%` 几率产生赢家状态的

新机器

```ts
class GumballMachine {
    private noQuarterState: State
    private hasQuarterState: State
    private soldState: State
    private soldOutState: State
    private winnerState: State
    private state: State
    private count: number // 库存
    constructor(count:number){ // 初始化4个状态
        this.count = count
        this.noQuarterState = new NoQuarterState(this)
        this.hasQuarterState = new HasQuarterState(this)
        this.soldState = new SoldState(this)
        this.soldOutState = new SoldOutState(this)
        this.winnerState = new WinnerState(this)
        if (count > 0) {
            this.setState(this.getNoQuarterState())
        } else {
            this.setState(this.getSoldOutState())
        }
    }
    public setState(state: State) {
        this.state = state
    }
    public getNoQuarterState() {
        return this.noQuarterState
    }
    public getHasQuarterState() {
        return this.hasQuarterState
    }
    public getSoldState() {
        return this.soldState
    }
    public getSoldOutState() {
        return this.soldOutState
    }
    public getWinnerState(){
        return this.winnerState
    }
    public getCurrentState() {
        return this.state
    }
    public setCount(count:number) {
        this.count = count // 设置库存
    }
    public getCount() { // 获取库存
        return this.count
    }
    public releaseBall(){
        console.log('发放糖果')
    }
    public insertQuarter(){ // 将投币托销给当前状态
        this.state.insertQuarter()
    }
    public ejectQuarter() { // 将退钱托销给当前状态
        this.state.ejectQuarter()
    }
    public turnCrank() { // 将售糖果托销给当前状态
        this.state.turnCrank()
    }
    public dispense() { // 将发放糖果委托给当前状态
        this.state.dispense()
    }
}
```

测试一下 为了效果明显我将几率调为了 50%。

```ts
// 实例化糖果售货机

let gumballMachine = new GumballMachine(10) // 放入 10 颗糖果

function test(){

    // 投入一枚25分钱的硬币
    console.log('投入一枚25分钱的硬币')

    gumballMachine.insertQuarter()

    // 转动曲柄
    console.log('转动曲柄')
    gumballMachine.turnCrank()

    console.log(`当前库存${gumballMachine.getCount()}`)
}

test()

let interval: number

interval = setInterval(()=>{
    if (gumballMachine.getCurrentState().name === '售罄') {
        console.log('售罄')
        clearInterval(interval)
    } else {
        test()
    }
}, 5000);
```

浏览器输出结果:

```log
VM153:329 投入一枚25分钱的硬币
VM153:332 转动曲柄
VM153:233 售出糖果
VM153:183 发放糖果
VM153:334 当前库存4
1
VM153:329 投入一枚25分钱的硬币
VM153:332 转动曲柄
VM153:233 售出糖果
VM153:183 发放糖果
VM153:334 当前库存3
VM153:329 投入一枚25分钱的硬币
VM153:332 转动曲柄
VM153:233 售出糖果
VM153:307 恭喜你，你获得了赢家状态，如果库存充足的话，你讲获得额外的一颗糖！
VM153:183 发放糖果
VM153:183 发放糖果
VM153:334 当前库存1
VM153:329 投入一枚25分钱的硬币
VM153:332 转动曲柄
VM153:233 售出糖果
VM153:307 恭喜你，你获得了赢家状态，如果库存充足的话，你讲获得额外的一颗糖！
VM153:183 发放糖果
VM153:334 当前库存0
VM153:340 售罄
```

[相关代码 demo10](https://github.com/PsChina/DesignPattern/tree/master/demo10)

(demo10 完)