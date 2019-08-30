## 工厂模式 (Factory Pattern)

定义: 定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类把实例化推迟到子类。

工厂模式能解决什么问题？

举个例子：

假设你有一个披萨店生产模式做的非常棒，需要推广，但是各个地区顾客的口味不一样，这样披萨的口味是随地域的变化而变化，在生产披萨时需要判断顾客的喜好会变得难以维护，虽然它是一个固定的常数。

不采用工厂模式的代码：

```ts
class DependentPizzaStore { // 一个依赖具体实现的披萨商店
    public createPizza(type:string,style:string){
        let pizza:Pizza
        if (style === 'NY') { // 纽约风味
            if(type === 'cheese'){
                pizza = new NYCheesePizza() // 新建纽约风味的奶酪披萨
            }else if(type === 'veggie'){
                pizza = new NYVeggiePizza() // 新建纽约风味的素披萨
            }
            // ... other type
        } else if(style === 'Chicago') { // 芝加哥风味
            // new Chicago type pizza
        } else if(style === 'California') { // 加利福尼亚风味
            // new California type pizza
        } else {
            throw new Error('style not found!')
        }
        return pizza
    }
    public orderPizza(type:string,style:string){ // 收到披萨订单会调用该方法 
        let pizza = this.createPizza(type,style) // 创建披萨
        pizza.prepare() // 加工前的准备工作
        pizza.bake() // 烘焙
        pizza.cut() // 切片
        pizza.box() // 打包
        // 披萨制作工艺
    }
}
```

可以发现如果有其他地区的加盟店需要加盟你的披萨店，那么不可避免的要修改 `DependentPizzaStore` ，而且不断会有新的地区的披萨店加盟，这样的设计是比较糟糕的，我们来用工厂模式优化一下吧。

#### 依赖倒置

__通常情况下使用继承都是子类依赖父类的具体实现，而依赖倒置则是子类实现父类的抽象，父类依赖子类的具体实现。__

我们发现上面的代码中 `DependentPizzaStore` 创建披萨的函数，依赖于具体实现。

我们可以将创建披萨的函数定义成一个抽象类方法，将 `DependentPizzaStore` 变成不依赖具体实现的抽象基类 `PizzaStore` ，

只保留制作披萨的工艺的具体实现。

让具体的地方加盟店实现能生产具有地方特色的披萨 `createPizza` 函数

```ts
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
```

这样我们就能在任意的地方开设具有地方特色的加盟店了。

但是我们忽略了 `Pizza` 这个抽象基类，以及他的子类，我们可以补足一下:

```ts
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
```

试一试
```ts
// 开一家湖南披萨加盟店
let huNanPizzaStore = new HuNanPizzaStore()

// 顾客下单 奶酪披萨

huNanPizzaStore.orderPizza('cheese')


// 顾客下单 湖南素披萨

huNanPizzaStore.orderPizza('veggie')

```

效果
```

VM165:16 添加佐料
VM165:19 添加雪花大肥牛
VM165:19 添加奶酪
VM165:23 烘焙
VM165:26 切割
VM165:29 打包
VM165:62 HuNanCheesePizza {toppings: Array(2), name: "湖南奶酪披萨"}name: "湖南奶酪披萨"toppings: (2) ["雪花大肥牛", "奶酪"]__proto__: Pizza
VM165:16 添加佐料
VM165:19 添加金莲子
VM165:19 添加人参果
VM165:23 烘焙
VM165:26 切割
VM165:29 打包
VM165:62 HuNanVeggiePizza {toppings: Array(2), name: "湖南素披萨"}name: "湖南素披萨"toppings: (2) ["金莲子", "人参果"]__proto__: Pizza
undefined
```

(完)