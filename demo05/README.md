
## 单件模式 (Singleton Pattern)

定义: 确保一个类只有一个实例，并提供一个局部访问点。

单件模式也称单例模式。

js 没有多线程所以在 ts 没有 `synchronized` `volatile` 这样的关键字

在 js 中单件模式其实在很多地方被用到比如 vue 的 vueRouter ，eventBus 等。

单件模式确保一个类只有一个实例，不会导致本该存在一个的事物重复出现。

```ts
class Singleton {
    static instance // 静态变量
    public name // 局部变量
    constructor(){
        if(Singleton.instance){ // 如果单例存在
            return Singleton.instance // 中断构造函数的建造过程返回单例
        }
        Singleton.instance = this // 否则让构造函数正常运行新建单例并且保存下来
    }
}

let instance1 = new Singleton()

instance1.name = 'A';

console.log(`instance1.name:${instance1.name}`)

let instance2 = new Singleton()

console.log(`instance2.name:${instance2.name}`)

instance2.name = 'B'

console.log(`instance2.name:${instance2.name}`)

console.log(`instance1 === instance2 ? ==> ${instance1 === instance2}`)
```

浏览器输出结果：
```
VM18139:12 instance1.name:A
VM18139:14 instance2.name:A
VM18139:16 instance2.name:B
VM18139:17 instance1 === instance2 ? ==> true
```

(完)