class Singleton {
    static instance
    public name
    constructor(){
        if(Singleton.instance){
            return Singleton.instance
        }
        Singleton.instance = this
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