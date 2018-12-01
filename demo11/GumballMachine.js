"use strict";
exports.__esModule = true;
var HasQuarterState_1 = require("./class/HasQuarterState");
var NoQuarterState_1 = require("./class/NoQuarterState");
var SoldOutState_1 = require("./class/SoldOutState");
var SoldState_1 = require("./class/SoldState");
var WinnerState_1 = require("./class/WinnerState");
var GumballMachine = /** @class */ (function () {
    function GumballMachine(location, count) {
        this.count = count;
        this.noQuarterState = new NoQuarterState_1["default"](this);
        this.hasQuarterState = new HasQuarterState_1["default"](this);
        this.soldState = new SoldState_1["default"](this);
        this.soldOutState = new SoldOutState_1["default"](this);
        this.winnerState = new WinnerState_1["default"](this);
        this.location = location;
        if (count > 0) {
            this.setState(this.getNoQuarterState());
        }
        else {
            this.setState(this.getSoldOutState());
        }
    }
    GumballMachine.prototype.setState = function (state) {
        this.state = state;
    };
    GumballMachine.prototype.getState = function () {
        return this.state;
    };
    GumballMachine.prototype.getNoQuarterState = function () {
        return this.noQuarterState;
    };
    GumballMachine.prototype.getHasQuarterState = function () {
        return this.hasQuarterState;
    };
    GumballMachine.prototype.getSoldState = function () {
        return this.soldState;
    };
    GumballMachine.prototype.getSoldOutState = function () {
        return this.soldOutState;
    };
    GumballMachine.prototype.getWinnerState = function () {
        return this.winnerState;
    };
    GumballMachine.prototype.setCount = function (count) {
        this.count = count; // 设置库存
    };
    GumballMachine.prototype.getCount = function () {
        return this.count;
    };
    GumballMachine.prototype.getLocation = function () {
        return this.location;
    };
    GumballMachine.prototype.releaseBall = function () {
        console.log('发放糖果');
        this.count -= 1;
    };
    GumballMachine.prototype.insertQuarter = function () {
        this.state.insertQuarter();
    };
    GumballMachine.prototype.ejectQuarter = function () {
        this.state.ejectQuarter();
    };
    GumballMachine.prototype.turnCrank = function () {
        this.state.turnCrank();
        this.dispense();
    };
    GumballMachine.prototype.dispense = function () {
        this.state.dispense();
    };
    return GumballMachine;
}());
exports["default"] = GumballMachine;
