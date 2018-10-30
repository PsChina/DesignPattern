var LivingRoomLight = /** @class */ (function () {
    function LivingRoomLight() {
    }
    LivingRoomLight.prototype.on = function () {
        console.log('开灯');
    };
    LivingRoomLight.prototype.off = function () {
        console.log('关灯');
    };
    return LivingRoomLight;
}());
var LightOnCommand = /** @class */ (function () {
    function LightOnCommand(light) {
        this.light = light;
    }
    LightOnCommand.prototype.setLight = function (light) {
        this.light = light;
    };
    LightOnCommand.prototype.execute = function () {
        this.light.on();
    };
    return LightOnCommand;
}());
// 现在假设我们有一个遥控器
var SimpleRemoteControl = /** @class */ (function () {
    function SimpleRemoteControl() {
    }
    SimpleRemoteControl.prototype.setCommand = function (command) {
        this.slot = command;
    };
    SimpleRemoteControl.prototype.buttonWasPressed = function () {
        this.slot.execute(); // 使用当前命令衔接插槽，并调用它的 execute 方法
    };
    return SimpleRemoteControl;
}());
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.prototype.openLight = function () {
        // 首先他要拿到一个遥控器
        var remoteControl = new SimpleRemoteControl();
        // 接下来生成一个开灯命令
        // 需要确定哪个灯应该被打开
        var light = new LivingRoomLight();
        // 生成将灯打开的命令
        var command = new LightOnCommand(light); // 生成一个打开客厅灯的命令
        // 然后将命令注入遥控器
        remoteControl.setCommand(command);
        // 按下遥控器的开关执行这个命令
        remoteControl.buttonWasPressed(); // 这样就可以执行任何命令了
    };
    return Client;
}());
// 测试一下
var client = new Client();
client.openLight(); // 用遥控器开灯


// 有兴趣的朋友可以尝试封装一个关灯命令