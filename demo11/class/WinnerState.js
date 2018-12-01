"use strict";
exports.__esModule = true;
var WinnerState = /** @class */ (function () {
    function WinnerState(gumballMachine) {
        this.gumballMachine = gumballMachine;
        this.name = '赢家';
    }
    WinnerState.prototype.getName = function () {
        return this.name;
    };
    WinnerState.prototype.insertQuarter = function () {
        console.log('已经投过币了，请等待糖果售出。');
    };
    WinnerState.prototype.ejectQuarter = function () {
        console.log('对不起，你已经摇动了售货曲柄，无法退钱了...');
    };
    WinnerState.prototype.turnCrank = function () {
        console.log('你已经摇动过售货曲柄了，同一次购买不能售货两次。');
    };
    WinnerState.prototype.dispense = function () {
        console.log('恭喜你，你获得了赢家状态，如果库存充足的话，你讲获得额外的一颗糖！');
        this.gumballMachine.releaseBall(); // 发放第一颗糖果
        // 改变至下一个状态
        if (this.gumballMachine.getCount() > 0) { // 库存为正
            this.gumballMachine.releaseBall(); // 发放第二课糖果
            if (this.gumballMachine.getCount() > 0) {
                this.gumballMachine.setState(this.gumballMachine.getNoQuarterState()); // 设置到未投币状态
            }
            else {
                this.gumballMachine.setState(this.gumballMachine.getSoldOutState()); // 库存等于小于零 设置到售罄状态
            }
        }
        else {
            this.gumballMachine.setState(this.gumballMachine.getSoldOutState()); // 库存等于小于零 设置到售罄状态
        }
    };
    return WinnerState;
}());
exports["default"] = WinnerState;
