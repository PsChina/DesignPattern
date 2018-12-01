import GumballMachine from '../GumballMachine'
import {IState} from '../interface/IState'

class SoldState implements IState {
    private gumballMachine:GumballMachine
    private name: string
    constructor(gumballMachine:GumballMachine) { // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '售出糖果'
    }
    public getName() {
        return this.name
    }
    public insertQuarter() { // 在售出糖果的时候不能再投币了
        console.log('已经投过币了，请等待糖果售出。')
    }
    public ejectQuarter() {
        console.log('对不起，你已经摇动了售货曲柄，无法退钱了...')
    }
    public turnCrank() {
        console.log('你已经摇动过售货曲柄了，同一次购买不能售货两次。')
    }
    public dispense() { // 发放糖果
        this.gumballMachine.releaseBall() // 发放糖果
        // 改变至下一个状态
        if (this.gumballMachine.getCount() > 0) { // 库存为正
            this.gumballMachine.setState(this.gumballMachine.getNoQuarterState()) // 设置到未投币状态
        } else {
            this.gumballMachine.setState(this.gumballMachine.getSoldOutState()) // 库存等于小于零 设置到售罄状态
        }
    }
}

export default SoldState