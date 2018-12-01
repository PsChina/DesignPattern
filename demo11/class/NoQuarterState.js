"use strict";
exports.__esModule = true;
var NoQuarterState = /** @class */ (function () {
    function NoQuarterState(gumballMachine) {
        this.gumballMachine = gumballMachine;
        this.name = '没有 25 分钱';
    }
    NoQuarterState.prototype.getName = function () {
        return this.name;
    };
    NoQuarterState.prototype.insertQuarter = function () {
        this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
    };
    NoQuarterState.prototype.ejectQuarter = function () {
        console.log('你没有投币。');
    };
    NoQuarterState.prototype.turnCrank = function () {
        console.log('你摇动了曲柄，但是没有投币。');
    };
    NoQuarterState.prototype.dispense = function () {
        console.log('你需要先投币');
    };
    return NoQuarterState;
}());
exports["default"] = NoQuarterState;
