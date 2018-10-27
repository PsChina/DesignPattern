abstract class Pizza{ // 披萨
    public name:string //名称
    public dough:string //面团类型
    public sauce:string // 酱料类型 
    public toppings:Array<string> // 一套佐料
    constructor(toppings:Array<string>){
        this.toppings = toppings
    }
    public prepare() {
        console.log('添加佐料')
        for(let topping of this.toppings){
            console.log(`添加${topping}`)
        }
    }
    public bake(){
        console.log('烘焙')
    }
    public cut(){
        console.log('切割')
    }
    public box(){
        console.log('打包')
    }
}

class HuNanCheesePizza extends Pizza{
    constructor(toppings:Array<string>){
        super(toppings)
        this.name = '湖南奶酪披萨'
    }
}

class HuNanVeggiePizza extends Pizza {
    constructor(toppings:Array<string>){
        super(toppings)
        this.name = '湖南素披萨'
    }
}

abstract class PizzaStore { // 一个依赖抽象方法的披萨商店 
    public abstract createPizza(type:string):Pizza // 
    public orderPizza(type:string){ // 收到披萨订单会调用该方法 
        let pizza = this.createPizza(type) // 创建披萨
        pizza.prepare() // 加工前的准备工作
        pizza.bake() // 烘焙
        pizza.cut() // 切片
        pizza.box() // 打包
        // 披萨制作工艺
        // 出货
        console.log(pizza)
    }
}

class HuNanPizzaStore extends PizzaStore {
    constructor(){
        super()
    }
    public createPizza(type:string){
        let pizza:Pizza
        switch(type){
            case 'cheese':
                pizza = new HuNanCheesePizza(['雪花大肥牛','奶酪']) // 湖南奶酪披萨
              break;
            case 'veggie':
                pizza = new HuNanVeggiePizza(['金莲子','人参果']) // 湖南素披萨
              break;
            // Other types ...
            default:
              break;
        }
        return pizza
    }
}

// 开一家湖南披萨加盟店
let huNanPizzaStore = new HuNanPizzaStore()

// 顾客下单 奶酪披萨

huNanPizzaStore.orderPizza('cheese')


// 顾客下单 湖南素披萨

huNanPizzaStore.orderPizza('veggie')



