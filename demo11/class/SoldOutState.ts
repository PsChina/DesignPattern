import GumballMachine from '../GumballMachine'
import {IState} from '../interface/IState'

class SoldOutState implements IState {
    private gumballMachine:GumballMachine
    private name: string
    constructor(gumballMachine:GumballMachine){ // 初始化的时候获取糖果机
        this.gumballMachine = gumballMachine
        this.name = '售罄'
    }
    public getName() {
        return this.name
    }
    public insertQuarter() {
        console.log('糖果已售罄不能投币。')
    }
    public ejectQuarter() {
        console.log('对不起，糖果已售罄你无法投币，也无法退币。')
    }
    public turnCrank() {
        console.log('你已经摇了曲柄，但是糖果已售罄。')
    }
    public dispense() {
        console.log('糖果已售罄，无法发放糖果.')
    }
}

export default SoldOutState
