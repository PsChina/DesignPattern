"use strict";
exports.__esModule = true;
var SoldOutState = /** @class */ (function () {
    function SoldOutState(gumballMachine) {
        this.gumballMachine = gumballMachine;
        this.name = '售罄';
    }
    SoldOutState.prototype.getName = function () {
        return this.name;
    };
    SoldOutState.prototype.insertQuarter = function () {
        console.log('糖果已售罄不能投币。');
    };
    SoldOutState.prototype.ejectQuarter = function () {
        console.log('对不起，糖果已售罄你无法投币，也无法退币。');
    };
    SoldOutState.prototype.turnCrank = function () {
        console.log('你已经摇了曲柄，但是糖果已售罄。');
    };
    SoldOutState.prototype.dispense = function () {
        console.log('糖果已售罄，无法发放糖果.');
    };
    return SoldOutState;
}());
exports["default"] = SoldOutState;
