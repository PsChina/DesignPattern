interface Subject {
    registerObserver(observer:Observer):void
    removeObserver(observer:Observer):void
    notifyObservers(observers?:Array<Observer>):void
}

interface Observer {
    update(temperature:number,humidity:number,pressure:number):void
}

interface Watcher {
    temperature:number
    humidity:number
    pressure:number
}

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
            observer.update(this.temperature,this.humidity,this.pressure) // 更新
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

// 我们将观察到的信息显示在布告栏，所以我们需要有一个display接口。

interface DisplayElement {
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
    update(temperature:number,humidity:number,pressure:number){
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

class ExtremeWeatherDisplay implements Observer, DisplayElement{ // 极端天气
    private max_temperature: number // 最大温度
    private min_temperature: number // 最小温度
    private avg_temperature: number // 平均温度
    private max_humidity: number // 最大湿度
    private min_humidity: number // 最小湿度
    private avg_humidity: number // 平均湿度
    private max_pressure: number // 最大压力
    private min_pressure: number // 最小压力
    private avg_pressure: number // 平均压力
    private history: Array<Watcher> //历史天气数据
    private view:HTMLElement // 布告栏天气视图
    constructor(view:HTMLElement){
        this.view = view
        this.history = []
    }
    getMaxTemperature(){
        return this.max_temperature
    }
    getMinTemperature(){
        return this.min_temperature
    }
    getAvgTemperature(){
        return this.avg_temperature
    }
    getMaxHumidity(){
        return this.max_humidity
    }
    getMinHumidity(){
        return this.min_humidity
    }
    getAvgHumidity(){
        return this.avg_humidity
    }
    getMaxPressure(){
        return this.max_pressure
    }
    getMinPressure(){
        return this.min_pressure
    }
    getAvgPressure(){
        return this.avg_pressure
    }
    update(temperature:number,humidity:number,pressure:number){ // 更新天气
        this.history.push({
            temperature,
            humidity,
            pressure
        })
        this.computedExtremeWeather()
        this.display()
    }
    computedAvgByAttr(arr:Array<Watcher>,attr:string){
        let sum = 0
        let length = arr.length
        for(let wather of arr){
            sum += wather[attr]
        }
        return sum/length
    }
    extremumByAttr(arr:Array<Watcher>,attr:string,max:boolean){ // 计算最大最小值
        const newArr = arr.concat()
        const length = arr.length
        if(max){
            for(let i=0; i<length-1; i++){
                    if(newArr[i][attr]>newArr[i+1][attr]){
                        let temp = newArr[i]
                        newArr[i] = newArr[i+1]
                        newArr[i+1] = temp
                    }
            }
        }else{
            for(let i=0; i<length-1; i++){
                if(newArr[i][attr]<newArr[i+1][attr]){
                    let temp = newArr[i]
                    newArr[i] = newArr[i+1]
                    newArr[i+1] = temp
                }
        }
        }
        return newArr[length-1][attr]
    }
    computedExtremeWeather(){ // 计算各个属性的极端值 和平均值
        this.min_temperature = this.extremumByAttr(this.history,'temperature',false)
        this.max_temperature = this.extremumByAttr(this.history,'temperature',true)
        this.min_humidity = this.extremumByAttr(this.history,'humidity',false)
        this.max_humidity = this.extremumByAttr(this.history,'humidity',true)
        this.min_pressure = this.extremumByAttr(this.history,'pressure',false)
        this.max_pressure = this.extremumByAttr(this.history,'pressure',true)
        this.avg_temperature = this.computedAvgByAttr(this.history,'temperature')
        this.avg_humidity = this.computedAvgByAttr(this.history,'humidity')
        this.avg_pressure = this.computedAvgByAttr(this.history,'pressure')
    }
    display(){ // 显示
        this.view.innerHTML= `
        <div>历史最高温:${this.max_temperature.toFixed(2)}</div>
        <div>历史最低温:${this.min_temperature.toFixed(2)}</div>
        <div>平均温:${this.avg_temperature.toFixed(2)}</div>
        <div>历史最高湿度:${this.max_humidity.toFixed(2)}</div>
        <div>历史最低湿度:${this.min_humidity.toFixed(2)}</div>
        <div>平均湿度:${this.avg_humidity.toFixed(2)}</div>
        <div>历史最高压力:${this.max_pressure.toFixed(2)}</div>
        <div>历史最低压力:${this.min_pressure.toFixed(2)}</div>
        <div>平均压力:${this.avg_pressure.toFixed(2)}</div>
        `
    }
}

interface BaseVal{ //基准值
    T:number,
    H:number,
    P:number
}

class FashionAdviceDisplay implements Observer, DisplayElement{
    private view:HTMLElement // 在布告栏显示
    private temperature: number // 温度
    private humidity: number // 湿度
    private pressure: number // 压力
    private adviceMap: Object // 建议
    private baseVals: BaseVal // 基准值
    private currentTadvice: string // 建议1
    private currentHadvice: string // 建议2
    private currentPadvice: string // 建议3
    constructor(view:HTMLElement){
        this.view = view
        this.adviceMap = {
            HT: '天气热较热少穿衣服',
            LT: '天气较凉多穿衣服',
            NT: '天气不错穿衬衫',
            HH: '湿度大注意通风',
            LH: '湿度小注意多喝水',
            HP: '高气压',
            LP: '低气压'
        }
        this.baseVals = {
            T:27,
            H:.5,
            P:101.325,
        }
    }
    setBaseVals(obj:BaseVal){
        this.baseVals = obj
    }
    update(temperature:number,humidity:number,pressure:number){
        this.temperature = temperature
        this.humidity = humidity
        this.pressure = pressure
        this.giveAdvice()
        this.display()
    }
    display(){
        this.view.innerHTML = `
            <div>建议1: ${this.currentTadvice||'无'}</div>
            <div>建议2: ${this.currentHadvice||'无'}</div>
            <div>建议3: ${this.currentPadvice||'无'}</div>
        `
    }
    giveAdvice(){
        this.currentTadvice = ''
        if(this.temperature<this.baseVals.T-10){
            this.currentTadvice = this.adviceMap['LT']
        }
        if(this.temperature>this.baseVals.T+6){
            this.currentTadvice = this.adviceMap['HT']
        }
        if(this.temperature<this.baseVals.T+4&&this.temperature>this.baseVals.T-3){
            this.currentTadvice = this.adviceMap['NT']
        }
        this.currentHadvice = ''
        if(this.humidity<this.baseVals.H-10){
            this.currentHadvice = this.adviceMap['LH']
        }
        if(this.humidity>this.baseVals.H+10){
            this.currentHadvice = this.adviceMap['HH']
        }
        this.currentPadvice = ''
        if(this.pressure>this.baseVals.P+100){
            this.currentPadvice = this.adviceMap['HP']
        }
        if(this.pressure<this.baseVals.P-100){
            this.currentPadvice = this.adviceMap['LP']
        }
    }
}

class  WeatherForecastDisplay implements Observer, DisplayElement {
    private view: HTMLElement // 在布告栏显示
    private forecastEmperature: number // 温度
    private forecastHumidity: number // 湿度
    private forecastPressure: number // 压力
    private lastTwoWeatcher: Array<Watcher> // 最后两次天气
    constructor(view:HTMLElement){
        this.view = view
        this.lastTwoWeatcher = []
        this.forecastEmperature = 0
        this.forecastHumidity = 0
        this.forecastPressure = 0   
    }
    forecastWeather(){
        this.forecastEmperature = this.lastTwoWeatcher[1].temperature + (this.lastTwoWeatcher[1].temperature - this.lastTwoWeatcher[0].temperature)
        this.forecastHumidity = this.lastTwoWeatcher[1].humidity + (this.lastTwoWeatcher[1].humidity - this.lastTwoWeatcher[0].humidity)
        this.forecastPressure = this.lastTwoWeatcher[1].pressure + (this.lastTwoWeatcher[1].pressure - this.lastTwoWeatcher[0].pressure)        
    }
    update(temperature:number,humidity:number,pressure:number){
        this.lastTwoWeatcher.push({
            temperature,
            humidity,
            pressure
        })
        if(this.lastTwoWeatcher.length >= 2){
            this.forecastWeather()
            this.display()
        }
        if(this.lastTwoWeatcher.length>2){
            this.lastTwoWeatcher.shift()
        }
    }
    display(){
        this.view.innerHTML = `
            <div>预测温度:${this.forecastEmperature.toFixed(2)}</div>
            <div>预测湿度:${this.forecastHumidity.toFixed(2)}</div>
            <div>预测压力:${this.forecastPressure.toFixed(2)}</div>
        `
    }
}

class MeteorologicalStation { // 气象站
    run(){
        const bulletinBoard = document.body // 布告栏

        const weatherData = new WeatherData() // 天气
        
        const currentWeatherDisplayView = document.createElement('div') // 创建一个div显示 当前天气
        
        const currentWeatherDisplay = new CurrentWeatherDisplay(currentWeatherDisplayView) // 当前天气
        
        weatherData.registerObserver(currentWeatherDisplay) // 将当前天气注册成观察者
        
        const extremeWeatherDisplayView = document.createElement('div') // 创建一个div显示 极端天气
        
        const extremeWeatherDisplay = new ExtremeWeatherDisplay(extremeWeatherDisplayView) //极端天气
        
        weatherData.registerObserver(extremeWeatherDisplay) // 将极端天气注册为观察者
        
        const fashionAdviceDisplayView = document.createElement('div') // 创建一个div显示 生活建议
        
        const fashionAdviceDisplay = new FashionAdviceDisplay(fashionAdviceDisplayView) // 生活建议
        
        weatherData.registerObserver(fashionAdviceDisplay) // 将生活建议注册为观察者
        
        const weatherForecastDisplayView = document.createElement('div') // 创建一个div显示 天气预报
        
        const weatherForecastDisplay = new WeatherForecastDisplay(weatherForecastDisplayView) // 天气预报
        
        weatherData.registerObserver(weatherForecastDisplay) // 将天气预报注册为观察者

        bulletinBoard.appendChild(
            currentWeatherDisplayView
        )
        bulletinBoard.appendChild(
            extremeWeatherDisplayView
        )
        bulletinBoard.appendChild(
            fashionAdviceDisplayView
        )
        bulletinBoard.appendChild(
            weatherForecastDisplayView
        )
    }
}



const meteorologicalStation = new MeteorologicalStation()

meteorologicalStation.run()