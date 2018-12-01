import HasQuarterState from './class/HasQuarterState'
import NoQuarterState from './class/NoQuarterState'
import SoldOutState from './class/SoldOutState'
import SoldState from './class/SoldState'
import WinnerState from './class/WinnerState'
import {IState} from './interface/IState'
class GumballMachine {
    private noQuarterState: IState
    private hasQuarterState: IState
    private soldState: IState
    private soldOutState: IState
    private winnerState: IState
    private state: IState
    private count: number // 库存
    private location: string
    constructor(location:string,count:number){ // 初始化4个状态
        this.count = count
        this.noQuarterState = new NoQuarterState(this)
        this.hasQuarterState = new HasQuarterState(this)
        this.soldState = new SoldState(this)
        this.soldOutState = new SoldOutState(this)
        this.winnerState = new WinnerState(this)
        this.location = location
        if (count > 0) {
            this.setState(this.getNoQuarterState())
        } else {
            this.setState(this.getSoldOutState())
        }
    }
    public setState(state: IState) {
        this.state = state
    }
    public getState() {
        return this.state
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
    public setCount(count:number) {
        this.count = count // 设置库存
    }
    public getCount() { // 获取库存
        return this.count
    }
    public getLocation() {
        return this.location
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


export default GumballMachine