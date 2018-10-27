## designPattern

这个仓库用于学习和分享设计模式。

参考书籍是 <<Head First 设计模式>> 。

一本用 java 介绍设计模式的书。

所幸 js 程序员可以使用 Typescript 来写 demo 练习。

### 目录

1. [策略模式](#demo01-策略模式)
1. [观察者模式](#demo02-观察者模式)
1. [装饰器模式](#demo03-装饰器模式)

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

#### 但是可怕的问题发生了...

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

### 总结

1 __不管软件设计的多好，一段时间之后，总是需要成长和改变，否则软件就会“死亡”,所以我们需要找出应用中可能需要改变的地方，把它们独立出来，不要和那些需要变化的代码混在一起。__

2 __抽离出来的经常变化的代码我们要针对他们的接口编程而不是针对实现编程。__

3 __多用组合，少用继承。“有一个”可能比“是一个”更好。__

[相关代码 demo01](https://github.com/PsChina/DesignPattern/tree/master/demo01)

有兴趣的朋友可以将 js 拷贝到浏览器控制台运行一下。

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

### 实现当前天气

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

### 初始化

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
    setSeasoning(seasoning:Seasoning){ // 设置咖啡
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