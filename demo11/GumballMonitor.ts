import GumballMachine from './gumballMachine'
class GumballMonitor {
    public machine: GumballMachine
    constructor(machine:GumballMachine) {
        this.machine = machine
    }
    public report(){
        console.log(`Gumball Machine: ${this.machine.getLocation()}`)
        console.log(`Current inventory: ${this.machine.getCount()} gumballs`)
        console.log(`Current sate: ${ this.machine.getState().getName() }`)
    }
}
export default GumballMonitor