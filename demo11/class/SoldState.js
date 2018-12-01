"use strict";
exports.__esModule = true;
var SoldState = /** @class */ (function () {
    function SoldState(gumballMachine) {
        this.gumballMachine = gumballMachine;
        this.name = '售出糖果';
    }
    SoldState.prototype.getName = function () {
        return this.name;
    };
    SoldState.prototype.insertQuarter = function () {
        console.log('已经投过币了，请等待糖果售出。');
    };
    SoldState.prototype.ejectQuarter = function () {
        console.log('对不起，你已经摇动了售货曲柄，无法退钱了...');
    };
    SoldState.prototype.turnCrank = function () {
        console.log('你已经摇动过售货曲柄了，同一次购买不能售货两次。');
    };
    SoldState.prototype.dispense = function () {
        this.gumballMachine.releaseBall(); // 发放糖果
        // 改变至下一个状态
        if (this.gumballMachine.getCount() > 0) { // 库存为正
            this.gumballMachine.setState(this.gumballMachine.getNoQuarterState()); // 设置到未投币状态
        }
        else {
            this.gumballMachine.setState(this.gumballMachine.getSoldOutState()); // 库存等于小于零 设置到售罄状态
        }
    };
    return SoldState;
}());
exports["default"] = SoldState;
