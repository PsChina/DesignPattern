
## 命令模式 (Command Pattern)

定义: 将“请求”封装成对象，以便使用不同的请求、队列或者日志来参数化其他对象。命令模式也支持可撤销的操作。

意图：将一个请求封装成一个对象，从而使您可以用不同的请求对客户进行参数化。

主要解决：在软件系统中，行为请求者与行为实现者通常是一种紧耦合的关系，但某些场合，比如需要对行为进行记录、撤销或重做、事务等处理时，这种无法抵御变化的紧耦合的设计就不太合适。


关键代码：定义三个角色：1、received 真正的命令执行对象 2、Command 3、invoker 使用命令对象的入口

#### Command

命令对象提供了 execute() 这个方法封装了命令实际调用者的执行动作
```ts
interface Command { // 命令接口
    execute():void
}
```

#### received 真正的命令执行对象

真正的命令执行对象是 `客厅的灯`

```ts
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
```

#### invoker 使用命令对象的入口 (遥控器)

遥控器内持有一个命令插槽可以插入任何命令

当按钮按下时便会让命令执行
```ts
class SimpleRemoteControl {
    public slot:Command
    public setCommand(command:Command){ // 这个方法用来设置插槽控制的命令
        this.slot = command
    }
    public buttonWasPressed(){ // 当按钮按下时这个方法就会被调用
        this.slot.execute() // 使用当前命令衔接插槽，并调用它的 execute 方法
    }
}
```

#### 我们还需要一个会使用命令模式(遥控器)的客户

```ts
class Client { // 这是一个使用命令模式的客户
    public openLight(){ // 它使用遥控器开灯
        // 首先他要拿到一个遥控器
        let remoteControl = new SimpleRemoteControl()
        // 接下来生成一个开灯命令
          // 需要确定哪个灯应该被打开
        let light = new LivingRoomLight()
          // 生成将灯打开的命令
        let command = new LightOnCommand(light) // 生成一个打开客厅灯的命令
        // 然后将命令注入遥控器
        remoteControl.setCommand(command)
        // 按下遥控器的开关执行这个命令
        remoteControl.buttonWasPressed() // 这样就可以执行任何命令了
    }
}
```

#### 测试一下

```ts
// 测试一下

let client = new Client()

client.openLight() // 用遥控器开灯

```

#### 浏览器输出结果

```
开灯
undefined
```

(完)