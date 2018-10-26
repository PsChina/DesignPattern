## 观察者模式 (Observer Pattern)
定义:在对象之间定义一对多的依赖，这样一来，当一个对象改变状态，依赖它的对象都会收到通知，并自动更新。

举个例子： 气象站

主题是天气。

根据检测到的天气，需要展示不同的信息，比如

以下四个观察者：

1、观察最高温度，最低温度，平均温度。

2、观察天气推荐穿衣搭配的建议。

3、观察显示当前天气的各种数据。

4、观察预测将来的天气（天气预报）。



学习观察者模式需要了解的知识点：

#### 主题

主题是被观察的对象，它持有许多观察者，可以动态的添加删除观察者，以及通知观察者自身的变化。

```ts
interface Subject {
    registerObserver(observer:Observer):void
    removeObserver(observer:Observer):void
    notifyObservers(observers?:Array<Observer>):void
}
```

以上是主题接口，对象使用此接口注册为观察者，或者把自己从观察者中删除。

#### 观察者

观察者拥有一个 updata 函数，当收到主题的通知时调用 updata 更新数据。

```ts
interface Observer {
    updata(params?:any):void //根据实际项目自定义参数
}
```

以上是观察者接口，所有潜在的观察者必须实现观察者接口，这个接口只有 updata 一个方法。


#### 使用观察者模式实现气象站

现在我们来用观察者来实现一个气象站。

#### 实现天气主题

```ts
class WeatherData implements Subject {
    private observers: Array<Observer> // 观察者
    private temperature: number // 温度
    private humidity: number // 湿度
    private pressure: number // 压力
    constructor(){
        this.observers = []
        this.run()
    }
    public registerObserver(observer:Observer) { //注册观察者
        this.observers.push(observer)
    }
    public removeObserver(observer:Observer) { //注销观察者
        let index = this.observers.indexOf(observer)
        if(index!==-1){
            this.observers.splice(index,1)
        }
    }
    public notifyObservers(observers = this.observers) { // 通知观察者
        for(let observer of observers){
            observer.updata(this.temperature,this.humidity,this.pressure) // 更新
        }
    }
    getTemperature(){ // 获取温度
        return this.temperature
    }
    getHumidity(){ // 获取湿度
        return this.humidity
    }
    getPressure(){ // 获取压力
        return this.pressure
    }
    measurementsChange(temperature:number,humidity:number,pressure:number) {
        this.temperature = temperature
        this.humidity = humidity
        this.pressure = pressure
        this.notifyObservers() // 通知观察者
    }
    run(){
        setTimeout(() => {
            let temperature = Math.random()*38 - 10
            let humidity = Math.random()
            let pressure = 95 + Math.random()*5
            this.measurementsChange(Number(temperature.toFixed(1)),Number(humidity.toFixed(1)), Number(pressure.toFixed(1)))            
        }, 0);
        setInterval(()=>{
            let temperature = Math.random()*38 - 10
            let humidity = Math.random()
            let pressure = 95 + Math.random()*5
            this.measurementsChange(Number(temperature.toFixed(1)),Number(humidity.toFixed(1)), Number(pressure.toFixed(1)))
        },1000*4)
    }
}
```

### 实现当前天气

```ts
interface DisplayElement { // 显示在浏览器的接口
    display():void
}

class CurrentWeatherDisplay implements Observer, DisplayElement{ // 当前天气
    private temperature: number // 温度
    private humidity: number // 湿度
    private pressure: number // 压力
    private view:HTMLElement // 布告栏天气视图
    constructor(view:HTMLElement){
        this.view = view
    }
    updata(temperature:number,humidity:number,pressure:number){
        this.temperature = temperature
        this.humidity = humidity
        this.pressure = pressure
        this.display()
    }
    display(){
        this.view.innerHTML= `
        <div>当前温度:${this.temperature.toFixed(2)}</div>
        <div>当前湿度:${this.humidity.toFixed(2)}</div>
        <div>当前压力:${this.pressure.toFixed(2)}</div>
        `
    }
}
```

### 初始化

```ts
    const bulletinBoard = document.body // 布告栏

    const weatherData = new WeatherData() // 天气
    
    const currentWeatherDisplayView = document.createElement('div') // 创建一个div显示 当前天气
    
    const currentWeatherDisplay = new CurrentWeatherDisplay(currentWeatherDisplayView) // 当前天气
    
    weatherData.registerObserver(currentWeatherDisplay) // 将当前天气注册成观察者

    bulletinBoard.appendChild( // 在布告栏绑定当前天气
        currentWeatherDisplayView
    )
```
(完)