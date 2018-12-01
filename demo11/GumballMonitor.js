"use strict";
exports.__esModule = true;
var GumballMonitor = /** @class */ (function () {
    function GumballMonitor(machine) {
        this.machine = machine;
    }
    GumballMonitor.prototype.report = function () {
        console.log("Gumball Machine: " + this.machine.getLocation());
        console.log("Current inventory: " + this.machine.getCount() + " gumballs");
        console.log("Current sate: " + this.machine.getState().getName());
    };
    return GumballMonitor;
}());
exports["default"] = GumballMonitor;
