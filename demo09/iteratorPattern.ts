interface Iterator<T> {
    hasNext():boolean
    next():any
}

class ArrayIterator implements Iterator<any>{
    private arr:Array<any>
    private index: number
    constructor(arr:Array<any>){
        this.arr = arr
        this.index = 0
    }
    hasNext(){
        if(this.index<this.arr.length){
            return true
        }
        this.index = 0
        return false
    }
    next(){
        return this.arr[this.index++]
    }
    getIndex(){
        return this.index
    }
}

let arr1 = [1,2,3,4,5]

let arrayIterator = new ArrayIterator(arr1)

while(arrayIterator.hasNext()){
    console.log(arrayIterator.next())
}

const arr2 = [1,2,3]
const $ = {
    each(arr:Array<any>,callback:Function){
        let arrayIterator = new ArrayIterator(arr)
        while(arrayIterator.hasNext()){
            callback(arrayIterator.getIndex(),arrayIterator.next())
        }
    }
}

$.each(arr2, function(index, value){
    console.log(index, value)
})