import GumballMachine from './GumballMachine'
import GumballMonitor from './GumballMonitor'

class GuballMachineTestDrive {
    constructor(){
        const loaction = '深圳，金蝶软件园。'
        const gumballMachine = new GumballMachine(loaction, 50) // 放入 50 颗糖果
        const monitor = new GumballMonitor(gumballMachine)

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
            if (gumballMachine.getState().getName() === '售罄') {
                console.log('售罄')
                clearInterval(interval)
            } else {
                test()
            }
            monitor.report()
        }, 3000);
        
    }
}

export default GuballMachineTestDrive