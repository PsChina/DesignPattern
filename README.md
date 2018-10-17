## designPattern

这个仓库用于学习和分享设计模式。

参考书籍是 <<Head First 设计模式>> 。

一本用 java 介绍设计模式的书。

所幸 js 程序员可以使用 Typescript 来写 demo 练习。

### 目录

1. [策略模式](#demo01-策略模式)

### demo01 策略模式

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
