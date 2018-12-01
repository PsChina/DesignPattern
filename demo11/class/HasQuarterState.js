"use strict";
exports.__esModule = true;
var HasQuarterState = /** @class */ (function () {
    function HasQuarterState(gumballMachine) {
        this.gumballMachine = gumballMachine;
        this.name = '有 25 分钱';
    }
    HasQuarterState.prototype.getName = function () {
        return this.name;
    };
    HasQuarterState.prototype.insertQuarter = function () {
        console.log('你已经投过币了，不需要再投币了。');
    };
    HasQuarterState.prototype.ejectQuarter = function () {
        console.log('返还 25 分钱');
        this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    };
    HasQuarterState.prototype.turnCrank = function () {
        console.log('售出糖果');
        var winner = Math.random() <= 0.5;
        if (winner) {
            this.gumballMachine.setState(this.gumballMachine.getWinnerState());
        }
        else {
            this.gumballMachine.setState(this.gumballMachine.getSoldState());
        }
    };
    HasQuarterState.prototype.dispense = function () {
        console.log('还未摇动摇杆，无法售出糖果。');
    };
    return HasQuarterState;
}());
exports["default"] = HasQuarterState;
