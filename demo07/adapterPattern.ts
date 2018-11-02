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

class ClassAdapter extends Turkey { // 类适配器
    quack(){ // 直接转换接口
        this.cluck()
    }
}


let turkey = new Turkey() // 创建火鸡

let turkeyAdapter = new ObjectAdapter() // 创建火鸡适配器

turkeyAdapter.setTurkey(turkey) // 将被适配的火鸡设置到适配器中

turkeyAdapter.quack() // 让火鸡以嘎嘎叫的方式咯咯叫


let turkeyDuck = new ClassAdapter() // 新建火鸡扩展类实例---火鸡鸭

turkeyDuck.quack() // 让火鸡鸭嘎嘎叫