## 状态模式 (State Pattern)

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


所有状态:

Status1: 没有 25 分钱

Status2: 有 25 分钱

Status3: 售出糖果

Status4: 糖果售罄


所有行为:（触发行为将改变状态）

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

```
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

```
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