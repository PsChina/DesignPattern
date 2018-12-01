import GumballMachine from '../GumballMachine'
import {IState} from '../interface/IState'

class NoQuarterState implements IState { // 没有 25 分钱
    private gumballMachine:GumballMachine
    private name: string
    constructor(gumballMachine:GumballMachine){ // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '没有 25 分钱'
    }
    public getName() {
        return this.name
    }
    public insertQuarter() {
        this.gumballMachine.setState(this.gumballMachine.getHasQuarterState())
    }
    public ejectQuarter() { // 如果没给钱就不能要求退钱
        console.log('你没有投币。')
    }
    public turnCrank(){ // 如果没给钱就不能要求售出糖果
        console.log('你摇动了曲柄，但是没有投币。')
    }
    public dispense(){ // 如果没给钱就不能发放糖果
        console.log('你需要先投币')
    }
}

export default NoQuarterState