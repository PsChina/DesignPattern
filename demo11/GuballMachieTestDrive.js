"use strict";
exports.__esModule = true;
var GumballMachine_1 = require("./GumballMachine");
var GumballMonitor_1 = require("./GumballMonitor");
var GuballMachineTestDrive = /** @class */ (function () {
    function GuballMachineTestDrive() {
        var loaction = '深圳，金蝶软件园。';
        var gumballMachine = new GumballMachine_1["default"](loaction, 50); // 放入 50 颗糖果
        var monitor = new GumballMonitor_1["default"](gumballMachine);
        function test() {
            // 投入一枚25分钱的硬币
            console.log('投入一枚25分钱的硬币');
            gumballMachine.insertQuarter();
            // 转动曲柄
            console.log('转动曲柄');
            gumballMachine.turnCrank();
            console.log("\u5F53\u524D\u5E93\u5B58" + gumballMachine.getCount());
        }
        test();
        var interval;
        interval = setInterval(function () {
            // tslint:disable-next-line
            if (gumballMachine.getState().getName() === '售罄') {
                console.log('售罄');
                clearInterval(interval);
            }
            else {
                test();
            }
            monitor.report();
        }, 3000);
    }
    return GuballMachineTestDrive;
}());
exports["default"] = GuballMachineTestDrive;
