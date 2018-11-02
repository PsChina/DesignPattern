
## 适配器模式 (Adapter Pattern)
定义:将一个类接口，转换成客户期望的另一个接口。适配器让原本接口不兼容的类可以合作无间。

这有点像 json 解析，服务器给出的数据有可能不是我们想要的格式或者类型又或者后端暂时无法提供接口但你又不得不赶进度，为了使得数据能够正常显示我们可以采用适配器模式作为中转类似的例子有 `axios-mock-adapter` ，当然你也可以不这么做。

在本章，我们将要进行一项任务，其不可能程度，简直就像是将一个方块放进一个圆洞中。

适配器模式uml类图:

![适配器模式uml类图](https://github.com/PsChina/DesignPattern/blob/master/images/adapter_pattern.png)

假设一小鸭子遇到了一只火鸡，但它以为它遇到的是一只成年的大鸭子并且和它用鸭语沟通，那么我们要怎么设计这个适配器呢？

#### 基本设施
```ts
interface QuackAble {
    quack():void
}

class Duck implements QuackAble{
    quack(){
        console.log('嘎嘎叫')
    }
}

class Turkey {
    cluck(){
        console.log('咯咯叫')
    }
}
```

我们有两种适配方案 

#### 对象适配器
```ts
class ObjectAdapter implements QuackAble{ // 对象适配器
    private turkey:Turkey
    constructor(turkey?:Turkey){
        this.turkey = turkey
    }
    setTurkey(turkey:Turkey){
        this.turkey = turkey
    }
    quack(){ // 适配器实现了 quack 接口 但是它收到请求时会委托给火鸡
        this.turkey.cluck()
    }
}
```

#### 类适配器
```ts
class ClassAdapter extends Turkey { // 类适配器
    quack(){ // 直接转换接口
        this.cluck()
    }
}
```

接下来我们分别测试一下这两种方案，看看能不能让火鸡调用嘎嘎叫这个方法来发出叫声。

测试对象适配器
```ts
let turkey = new Turkey() // 创建火鸡

let turkeyAdapter = new ObjectAdapter() // 创建火鸡适配器

turkeyAdapter.setTurkey(turkey) // 将被适配的火鸡设置到适配器中

turkeyAdapter.quack() // 让火鸡以嘎嘎叫的方式咯咯叫
```

浏览器输出结果
```
咯咯叫
undefined
```

测试类适配器
```ts
let turkeyDuck = new ClassAdapter() // 新建火鸡扩展类实例---火鸡鸭

turkeyDuck.quack() // 让火鸡鸭嘎嘎叫
```

浏览器输出结果
```
咯咯叫
undefined
```

(完)