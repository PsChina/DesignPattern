// class GumballMachine {
//     private SOLD_OUT = '售罄' // 售罄
//     private NO_QUARTER = '没有 25 分钱' // 没有 25 分钱
//     private HAS_QUARTER = '有 25 分钱' // 有 25 分钱
//     private SOLD = '售出糖果' // 售出糖果
//     private count: number // 库存
//     private status: string // 机器当前状态
//     constructor(count:number) { // 构造器 接收一个库存参数 count 。
//         this.count = count
//         if (count > 0) { // 如果库存为正将状态的设置为：没有 25 分钱。
//             this.status = this.NO_QUARTER
//         } else {
//             // 否则将状态设置为售罄。
//             this.status = this.SOLD_OUT            
//         }
//     }
//     public getCurrentStatus(){ // 返回售货机当前状态
//         return this.status
//     }
//     public insertQuarter() { // 投入 25 分钱
//         switch (this.status) { // 更具当前状态做出不同的动作

//             case this.NO_QUARTER: // 没有 25 分钱
//                 this.status = this.HAS_QUARTER // 变更状态
//                 console.log('你投入了一枚 25 分的硬币。')
//                 break;

//             case this.HAS_QUARTER: // 有 25 分钱还投币
//                 console.log('你已经投币，不能再投入其他的币。')
//                 break;

//             case this.SOLD_OUT: // 已经售罄还投币
//                 console.log('你不能投币，机器内糖果已经售罄。')
//                 break;
                
//             case this.SOLD: // 已经操作摇杆正在销售糖果的情况下再次投币
//                 console.log('请等待糖果机吐出糖果。')
//                 break;

//             default:
//                 break;
//         }
//     }
//     public ejectQuarter() { // 退回 25 分钱
//         switch (this.status) { // 更具当前状态做出不同的动作

//             case this.HAS_QUARTER: // 如果有 25 分钱还投币。
//                 console.log('退回 25 分钱')
//                 this.status = this.NO_QUARTER // 将状态改回没有 25 分钱
//                 break;

//             case this.NO_QUARTER: // 没有 25 分钱
//                 console.log('你没有投入 25 分钱')
//                 break;

//             case this.SOLD_OUT: // 已经售罄的情况退钱
//                 console.log('你不能退钱，你还没有投入 25 分钱。')
//                 break;
                
//             case this.SOLD: // 如果已经操作摇杆正在销售糖果的情况下退钱
//                 console.log('对不起你已经摇了销售糖果的摇杆，无法退回 25 分钱。')
//                 break;

//             default:
//                 break;
//         }
//     }
//     public turnCrank() { // 顾客试着转动曲柄
//         switch (this.status) { // 更具当前状态做出不同的动作

//             case this.HAS_QUARTER: // 如果有 25 分钱
//                 console.log('出售糖果')
//                 this.status = this.SOLD // 更改状态
//                 this.dispense() // 出售糖果
//                 break;

//             case this.SOLD: // 如果已经售出糖果
//                 console.log('转动两次或者超过两次曲柄，无法再次获得糖果。')
//                 break;

//             case this.NO_QUARTER: // 没有 25 分钱
//                 console.log('你需要投入 25 分钱。')
//                 break;

//             case this.SOLD_OUT: // 已经售罄
//                 console.log('已售罄，我们不能提供糖果。')
//                 break;

//             default:
//                 break;
//         }
//     }
//     public dispense() {
//         switch (this.status) { // 更具当前状态做出不同的动作

//             case this.SOLD: // 发放糖果
//                 this.count -= 1 //库存减一    
//                 if( this.count === 0 ) { // 库存为零
//                     console.log('已售罄。')
//                     this.status = this.SOLD_OUT // 改为已售罄状态
//                 } else { // 还有库存
//                     this.status = this.NO_QUARTER // 改为未投币状态
//                 }
//                 break;
//             // 以下情况都不应该发生，如果这么做了他们得到的是错误消息
//             case this.HAS_QUARTER: // 有 25 分钱
//                 console.log('没有触发售货曲柄。')
//                 break;

//             case this.NO_QUARTER: // 没有 25 分钱
//                 console.log('必须先支付 25 分钱。')
//                 break;

//             case this.SOLD_OUT: // 已经售罄
//                 console.log('已售罄，我们不能提供糖果。')
//                 break;

//             default:
//                 break;
//         }
//     }
// }

// // 实例化糖果售货机

// let gumballMachine = new GumballMachine(2) // 放入 2 颗糖果

// console.log('当前状态：')

// console.log(gumballMachine.getCurrentStatus()) // 打印当前状态

// // 投入一枚25分钱的硬币
// console.log('投入一枚25分钱的硬币')

// gumballMachine.insertQuarter()

// // 转动曲柄我们应该拿到糖果
// console.log('转动曲柄')

// gumballMachine.turnCrank()

// // 再次打印当前状态
// console.log('再次打印当前状态')

// console.log(gumballMachine.getCurrentStatus())


// // 投入一枚 25 分钱的硬币
// console.log('投入一枚25分钱的硬币')
// gumballMachine.insertQuarter()


// // 要求机器退钱
// console.log('退钱')

// gumballMachine.ejectQuarter()


// // 转动曲柄， 我们不应该拿到糖果
// console.log('摇动出货曲柄')

// gumballMachine.turnCrank()


// // 再次打印当前状态
// console.log('再次打印当前状态')

// console.log(gumballMachine.getCurrentStatus())


// // 投入两枚25分钱的硬币
// console.log('投入一枚25分钱的硬币')

// gumballMachine.insertQuarter()

// console.log('尝试再次投入两枚25分钱的硬币')

// gumballMachine.insertQuarter()


// // 转动曲柄我们应该拿到糖果
// console.log('摇动出货曲柄')

// gumballMachine.turnCrank()


// // 投入一枚25分钱的硬币我们应该无法投币
// console.log('尝试投入两枚25分钱的硬币')
// gumballMachine.insertQuarter()

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
        this.count -= 1
    }
    public insertQuarter(){ // 将投币托销给当前状态
        this.state.insertQuarter()
    }
    public ejectQuarter() { // 将退钱托销给当前状态
        this.state.ejectQuarter()
    }
    public turnCrank() { // 将售糖果托销给当前状态
        this.state.turnCrank()
        this.dispense()
    }
    public dispense() { // 将发放糖果委托给当前状态
        this.state.dispense()
    }
}

interface State {
    name: string
    insertQuarter():void
    ejectQuarter():void
    turnCrank():void
    dispense():void
}

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
    constructor(gumballMachine:GumballMachine) { // 初始化的时候获取糖果机
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
        let winner = Math.random() <= 0.5
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
    constructor(gumballMachine:GumballMachine) { // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '售出糖果'
    }
    insertQuarter() { // 在售出糖果的时候不能再投币了
        console.log('已经投过币了，请等待糖果售出。')
    }
    ejectQuarter() {
        console.log('对不起，你已经摇动了售货曲柄，无法退钱了...')
    }
    turnCrank() {
        console.log('你已经摇动过售货曲柄了，同一次购买不能售货两次。')
    }
    dispense() { // 发放糖果
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
    turnCrank() {
        console.log('你已经摇了曲柄，但是糖果已售罄。')
    }
    dispense() {
        console.log('糖果已售罄，无法发放糖果.')
    }
}

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

// 实例化糖果售货机

let gumballMachine = new GumballMachine(5) // 放入 5 颗糖果

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
}, 3000);