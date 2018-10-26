var WeatherData = /** @class */ (function () {
    function WeatherData() {
        this.observers = [];
        this.run();
    }
    WeatherData.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    };
    WeatherData.prototype.removeObserver = function (observer) {
        var index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    };
    WeatherData.prototype.notifyObservers = function (observers) {
        if (observers === void 0) { observers = this.observers; }
        for (var _i = 0, observers_1 = observers; _i < observers_1.length; _i++) {
            var observer = observers_1[_i];
            observer.updata(this.temperature, this.humidity, this.pressure); // 更新
        }
    };
    WeatherData.prototype.getTemperature = function () {
        return this.temperature;
    };
    WeatherData.prototype.getHumidity = function () {
        return this.humidity;
    };
    WeatherData.prototype.getPressure = function () {
        return this.pressure;
    };
    WeatherData.prototype.measurementsChange = function (temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.notifyObservers(); // 通知观察者
    };
    WeatherData.prototype.run = function () {
        var _this = this;
        setTimeout(function () {
            var temperature = Math.random() * 38 - 10;
            var humidity = Math.random();
            var pressure = 95 + Math.random() * 5;
            _this.measurementsChange(Number(temperature.toFixed(1)), Number(humidity.toFixed(1)), Number(pressure.toFixed(1)));
        }, 0);
        setInterval(function () {
            var temperature = Math.random() * 38 - 10;
            var humidity = Math.random();
            var pressure = 95 + Math.random() * 5;
            _this.measurementsChange(Number(temperature.toFixed(1)), Number(humidity.toFixed(1)), Number(pressure.toFixed(1)));
        }, 1000 * 4);
    };
    return WeatherData;
}());
var CurrentWeatherDisplay = /** @class */ (function () {
    function CurrentWeatherDisplay(view) {
        this.view = view;
    }
    CurrentWeatherDisplay.prototype.updata = function (temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.display();
    };
    CurrentWeatherDisplay.prototype.display = function () {
        this.view.innerHTML = "\n        <div>\u5F53\u524D\u6E29\u5EA6:" + this.temperature.toFixed(2) + "</div>\n        <div>\u5F53\u524D\u6E7F\u5EA6:" + this.humidity.toFixed(2) + "</div>\n        <div>\u5F53\u524D\u538B\u529B:" + this.pressure.toFixed(2) + "</div>\n        ";
    };
    return CurrentWeatherDisplay;
}());
var ExtremeWeatherDisplay = /** @class */ (function () {
    function ExtremeWeatherDisplay(view) {
        this.view = view;
        this.history = [];
    }
    ExtremeWeatherDisplay.prototype.getMaxTemperature = function () {
        return this.max_temperature;
    };
    ExtremeWeatherDisplay.prototype.getMinTemperature = function () {
        return this.min_temperature;
    };
    ExtremeWeatherDisplay.prototype.getAvgTemperature = function () {
        return this.avg_temperature;
    };
    ExtremeWeatherDisplay.prototype.getMaxHumidity = function () {
        return this.max_humidity;
    };
    ExtremeWeatherDisplay.prototype.getMinHumidity = function () {
        return this.min_humidity;
    };
    ExtremeWeatherDisplay.prototype.getAvgHumidity = function () {
        return this.avg_humidity;
    };
    ExtremeWeatherDisplay.prototype.getMaxPressure = function () {
        return this.max_pressure;
    };
    ExtremeWeatherDisplay.prototype.getMinPressure = function () {
        return this.min_pressure;
    };
    ExtremeWeatherDisplay.prototype.getAvgPressure = function () {
        return this.avg_pressure;
    };
    ExtremeWeatherDisplay.prototype.updata = function (temperature, humidity, pressure) {
        this.history.push({
            temperature: temperature,
            humidity: humidity,
            pressure: pressure
        });
        this.computedExtremeWeather();
        this.display();
    };
    ExtremeWeatherDisplay.prototype.computedAvgByAttr = function (arr, attr) {
        var sum = 0;
        var length = arr.length;
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var wather = arr_1[_i];
            sum += wather[attr];
        }
        return sum / length;
    };
    ExtremeWeatherDisplay.prototype.extremumByAttr = function (arr, attr, max) {
        var newArr = arr.concat();
        var length = arr.length;
        if (max) {
            for (var i = 0; i < length - 1; i++) {
                if (newArr[i][attr] > newArr[i + 1][attr]) {
                    var temp = newArr[i];
                    newArr[i] = newArr[i + 1];
                    newArr[i + 1] = temp;
                }
            }
        }
        else {
            for (var i = 0; i < length - 1; i++) {
                if (newArr[i][attr] < newArr[i + 1][attr]) {
                    var temp = newArr[i];
                    newArr[i] = newArr[i + 1];
                    newArr[i + 1] = temp;
                }
            }
        }
        return newArr[length - 1][attr];
    };
    ExtremeWeatherDisplay.prototype.computedExtremeWeather = function () {
        this.min_temperature = this.extremumByAttr(this.history, 'temperature', false);
        this.max_temperature = this.extremumByAttr(this.history, 'temperature', true);
        this.min_humidity = this.extremumByAttr(this.history, 'humidity', false);
        this.max_humidity = this.extremumByAttr(this.history, 'humidity', true);
        this.min_pressure = this.extremumByAttr(this.history, 'pressure', false);
        this.max_pressure = this.extremumByAttr(this.history, 'pressure', true);
        this.avg_temperature = this.computedAvgByAttr(this.history, 'temperature');
        this.avg_humidity = this.computedAvgByAttr(this.history, 'humidity');
        this.avg_pressure = this.computedAvgByAttr(this.history, 'pressure');
    };
    ExtremeWeatherDisplay.prototype.display = function () {
        this.view.innerHTML = "\n        <div>\u5386\u53F2\u6700\u9AD8\u6E29:" + this.max_temperature.toFixed(2) + "</div>\n        <div>\u5386\u53F2\u6700\u4F4E\u6E29:" + this.min_temperature.toFixed(2) + "</div>\n        <div>\u5E73\u5747\u6E29:" + this.avg_temperature.toFixed(2) + "</div>\n        <div>\u5386\u53F2\u6700\u9AD8\u6E7F\u5EA6:" + this.max_humidity.toFixed(2) + "</div>\n        <div>\u5386\u53F2\u6700\u4F4E\u6E7F\u5EA6:" + this.min_humidity.toFixed(2) + "</div>\n        <div>\u5E73\u5747\u6E7F\u5EA6:" + this.avg_humidity.toFixed(2) + "</div>\n        <div>\u5386\u53F2\u6700\u9AD8\u538B\u529B:" + this.max_pressure.toFixed(2) + "</div>\n        <div>\u5386\u53F2\u6700\u4F4E\u538B\u529B:" + this.min_pressure.toFixed(2) + "</div>\n        <div>\u5E73\u5747\u538B\u529B:" + this.avg_pressure.toFixed(2) + "</div>\n        ";
    };
    return ExtremeWeatherDisplay;
}());
var FashionAdviceDisplay = /** @class */ (function () {
    function FashionAdviceDisplay(view) {
        this.view = view;
        this.adviceMap = {
            HT: '天气热较热少穿衣服',
            LT: '天气较凉多穿衣服',
            NT: '天气不错穿衬衫',
            HH: '湿度大注意通风',
            LH: '湿度小注意多喝水',
            HP: '高气压',
            LP: '低气压'
        };
        this.baseVals = {
            T: 27,
            H: .5,
            P: 101.325
        };
    }
    FashionAdviceDisplay.prototype.setBaseVals = function (obj) {
        this.baseVals = obj;
    };
    FashionAdviceDisplay.prototype.updata = function (temperature, humidity, pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.giveAdvice();
        this.display();
    };
    FashionAdviceDisplay.prototype.display = function () {
        this.view.innerHTML = "\n            <div>\u5EFA\u8BAE1: " + (this.currentTadvice || '无') + "</div>\n            <div>\u5EFA\u8BAE2: " + (this.currentHadvice || '无') + "</div>\n            <div>\u5EFA\u8BAE3: " + (this.currentPadvice || '无') + "</div>\n        ";
    };
    FashionAdviceDisplay.prototype.giveAdvice = function () {
        this.currentTadvice = '';
        if (this.temperature < this.baseVals.T - 10) {
            this.currentTadvice = this.adviceMap['LT'];
        }
        if (this.temperature > this.baseVals.T + 6) {
            this.currentTadvice = this.adviceMap['HT'];
        }
        if (this.temperature < this.baseVals.T + 4 && this.temperature > this.baseVals.T - 3) {
            this.currentTadvice = this.adviceMap['NT'];
        }
        this.currentHadvice = '';
        if (this.humidity < this.baseVals.H - 10) {
            this.currentHadvice = this.adviceMap['LH'];
        }
        if (this.humidity > this.baseVals.H + 10) {
            this.currentHadvice = this.adviceMap['HH'];
        }
        this.currentPadvice = '';
        if (this.pressure > this.baseVals.P + 100) {
            this.currentPadvice = this.adviceMap['HP'];
        }
        if (this.pressure < this.baseVals.P - 100) {
            this.currentPadvice = this.adviceMap['LP'];
        }
    };
    return FashionAdviceDisplay;
}());
var WeatherForecastDisplay = /** @class */ (function () {
    function WeatherForecastDisplay(view) {
        this.view = view;
        this.lastTwoWeatcher = [];
        this.forecastEmperature = 0;
        this.forecastHumidity = 0;
        this.forecastPressure = 0;
    }
    WeatherForecastDisplay.prototype.forecastWeather = function () {
        this.forecastEmperature = this.lastTwoWeatcher[1].temperature + (this.lastTwoWeatcher[1].temperature - this.lastTwoWeatcher[0].temperature);
        this.forecastHumidity = this.lastTwoWeatcher[1].humidity + (this.lastTwoWeatcher[1].humidity - this.lastTwoWeatcher[0].humidity);
        this.forecastPressure = this.lastTwoWeatcher[1].pressure + (this.lastTwoWeatcher[1].pressure - this.lastTwoWeatcher[0].pressure);
    };
    WeatherForecastDisplay.prototype.updata = function (temperature, humidity, pressure) {
        this.lastTwoWeatcher.push({
            temperature: temperature,
            humidity: humidity,
            pressure: pressure
        });
        if (this.lastTwoWeatcher.length >= 2) {
            this.forecastWeather();
            this.display();
        }
        if (this.lastTwoWeatcher.length > 2) {
            this.lastTwoWeatcher.shift();
        }
    };
    WeatherForecastDisplay.prototype.display = function () {
        this.view.innerHTML = "\n            <div>\u9884\u6D4B\u6E29\u5EA6:" + this.forecastEmperature.toFixed(2) + "</div>\n            <div>\u9884\u6D4B\u6E7F\u5EA6:" + this.forecastHumidity.toFixed(2) + "</div>\n            <div>\u9884\u6D4B\u538B\u529B:" + this.forecastPressure.toFixed(2) + "</div>\n        ";
    };
    return WeatherForecastDisplay;
}());
var MeteorologicalStation = /** @class */ (function () {
    function MeteorologicalStation() {
    }
    MeteorologicalStation.prototype.run = function () {
        var bulletinBoard = document.body; // 布告栏
        var weatherData = new WeatherData(); // 天气
        var currentWeatherDisplayView = document.createElement('div'); // 创建一个div显示 当前天气
        var currentWeatherDisplay = new CurrentWeatherDisplay(currentWeatherDisplayView); // 当前天气
        weatherData.registerObserver(currentWeatherDisplay); // 将当前天气注册成观察者
        var extremeWeatherDisplayView = document.createElement('div'); // 创建一个div显示 极端天气
        var extremeWeatherDisplay = new ExtremeWeatherDisplay(extremeWeatherDisplayView); //极端天气
        weatherData.registerObserver(extremeWeatherDisplay); // 将极端天气注册为观察者
        var fashionAdviceDisplayView = document.createElement('div'); // 创建一个div显示 生活建议
        var fashionAdviceDisplay = new FashionAdviceDisplay(fashionAdviceDisplayView); // 生活建议
        weatherData.registerObserver(fashionAdviceDisplay); // 将生活建议注册为观察者
        var weatherForecastDisplayView = document.createElement('div'); // 创建一个div显示 天气预报
        var weatherForecastDisplay = new WeatherForecastDisplay(weatherForecastDisplayView); // 天气预报
        weatherData.registerObserver(weatherForecastDisplay); // 将天气预报注册为观察者
        bulletinBoard.appendChild(currentWeatherDisplayView);
        bulletinBoard.appendChild(extremeWeatherDisplayView);
        bulletinBoard.appendChild(fashionAdviceDisplayView);
        bulletinBoard.appendChild(weatherForecastDisplayView);
    };
    return MeteorologicalStation;
}());
var meteorologicalStation = new MeteorologicalStation();
meteorologicalStation.run();
