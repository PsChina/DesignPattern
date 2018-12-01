import GumballMachine from '../GumballMachine'
import {IState} from '../interface/IState'

class HasQuarterState implements IState { // 有 25 分钱
    private gumballMachine:GumballMachine
    private name: string
    constructor(gumballMachine:GumballMachine) { // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '有 25 分钱'
    }
    public getName() {
        return this.name
    }
    public insertQuarter() {
        console.log('你已经投过币了，不需要再投币了。')
    }
    public ejectQuarter() {
        console.log('返还 25 分钱')
        this.gumballMachine.setState(this.gumballMachine.getNoQuarterState())
    }
    public turnCrank(){
        console.log('售出糖果')
        const winner = Math.random() <= 0.5
        if (winner) {
            this.gumballMachine.setState(this.gumballMachine.getWinnerState())
        } else {
            this.gumballMachine.setState(this.gumballMachine.getSoldState())
        }
    }
    public dispense(){ // 这是一个不应该发生的动作
        console.log('还未摇动摇杆，无法售出糖果。')
    }
}

export default HasQuarterState