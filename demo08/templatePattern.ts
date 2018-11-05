// class Coffee {
//     constructor(){ // 这是我们的咖啡冲泡法，直接取自训练手册
//         this.boilWater()
//         this.brewCoffeeGrinds()
//         this.pourInCup()
//         this.addSugarAndMilk()
//     }
//     public boilWater(){ // 煮沸水
//         console.log('煮沸水')
//     }
//     public brewCoffeeGrinds(){ // 冲泡咖啡
//         console.log('冲泡咖啡')
//     }
//     public pourInCup(){ // 把咖啡倒进杯子
//         console.log('倒进杯子')
//     }
//     public addSugarAndMilk(){ // 加糖和牛奶
//         console.log('加糖和牛奶')
//     }
// }

// class Tea {
//     constructor(){ // 这是我们的茶冲泡法，直接取自训练手册
//         this.boilWater()
//         this.steepTeaBag()
//         this.pourInCup()
//         this.addLemon()
//     }
//     public boilWater(){ // 煮沸水
//         console.log('煮沸水')
//     }
//     public steepTeaBag(){ // 用沸水浸泡茶叶
//         console.log('用沸水浸泡茶叶')
//     }
//     public pourInCup(){ // 把茶倒进杯子
//         console.log('倒进杯子')
//     }
//     public addLemon(){ // 加柠檬
//         console.log('加柠檬')
//     }
// }

abstract class CaffeineBeverage{
    constructor() { // 冲泡流程
        this.boilWater()
        this.brew() // 统一后的方法
        this.pourInCup()
        this.addCondiments() // 统一后的方法
    }
    abstract brew():void // 制作
    abstract addCondiments():void // 加工
    public boilWater(){ // 煮沸水
        console.log('煮沸水')
    }
    public pourInCup(){ // 把茶倒进杯子
        console.log('倒进杯子')
    }
}

class Coffee extends CaffeineBeverage {
    public brew(){
        console.log('冲泡咖啡')
    }
    public addCondiments(){
        console.log('加糖和牛奶')
    }
}
 class Tea extends CaffeineBeverage {
    public brew(){
        console.log('用沸水浸泡茶叶')
    }
    public addCondiments(){
        console.log('加柠檬')
    }
 }


 new Tea()

 new Coffee()

