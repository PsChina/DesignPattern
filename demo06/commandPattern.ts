interface Command { // 命令接口
    execute():void
}

interface Light { // 灯这个设备具有 开灯这个方法
    on():void
    off():void
}

class LivingRoomLight implements Light { // 客厅的灯
    public on(){
        console.log('开灯')
    }
    public off(){
        console.log('关灯')
    }
}

class LightOnCommand implements Command { // 实现一个开灯的命令
    private light:Light
    constructor(light:Light){
        this.light = light
    }
    public setLight(light:Light){ // 设置一个要开的灯比方说厨房的灯，或者也可以是客厅的灯
        this.light = light
    }
    public execute(){
        this.light.on()
    }
}


// 现在假设我们有一个遥控器

class SimpleRemoteControl {
    public slot:Command
    public setCommand(command:Command){ // 这个方法用来设置插槽控制的命令
        this.slot = command
    }
    public buttonWasPressed(){ // 当按钮按下时这个方法就会被调用
        this.slot.execute() // 使用当前命令衔接插槽，并调用它的 execute 方法
    }
}


class User { // 这是一个使用命令模式的客户
    public openLightWithControl(light:Light, remoteControl:SimpleRemoteControl){ // 它使用遥控器开灯
          // 生成将灯打开的命令
        let command = new LightOnCommand(light) // 生成一个打开客厅灯的命令
        // 然后将命令注入遥控器
        remoteControl.setCommand(command)
        // 按下遥控器的开关执行这个命令
        remoteControl.buttonWasPressed() // 这样就可以执行任何命令了
    }
}

// 测试一下

// 新建遥控器
let remoteControl = new SimpleRemoteControl()
// 新建灯
let light = new LivingRoomLight()
// 新建用户
let user = new User()

user.openLightWithControl(light, remoteControl) // 用遥控器开灯

// 有兴趣的朋友可以尝试封装一个关灯命令