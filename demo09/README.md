## 迭代器模式 (Iterator Pattern)


定义: 提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露其内部的表示。

实际上 jQuery 就已经实现了迭代器 $.each

```js
$.each([1,2,3], function(index, value) {
    console.log(index, value)
})
```

一般的迭代，我们至少要有2个方法，hasNext() 和 next() ，这样才做做到遍历所有对象，所以我们的迭代器接口如下：

```ts
interface Iterator<T> {
    hasNext():boolean
    next():T
}
```

我们实现一个数组迭代器

```ts
class ArrayIterator implements Iterator<any>{
    private arr: Array<any>
    private index: number
    constructor (arr: Array<any>) {
        this.arr = arr
        this.index = 0
    }
    hasNext() {
        if (this.index < this.arr.length) {
            return true
        }
        this.index = 0
        return false
    }
    next() {
        return this.arr[this.index++]
    }
    getIndex() {
        return this.index
    }
}
```

尝试迭代一个数组

```ts
let arr1 = [1,2,3,4,5]

let arrayIterator = new ArrayIterator(arr1)

while (arrayIterator.hasNext()) {
    console.log(arrayIterator.next())
}
```

浏览器运行结果

```
VM112:21 1
VM112:21 2
VM112:21 3
VM112:21 4
VM112:21 5
undefined
```

最后模拟实现 jQuery 的 each 方法

```ts
const arr2 = [1,2,3]
const $ = {
    each (arr:Array<any>, callback:Function) {
        let arrayIterator = new ArrayIterator(arr)
        while (arrayIterator.hasNext()) {
            callback(arrayIterator.getIndex(), arrayIterator.next())
        }
    }
}

$.each (arr2, function(index, value) {
    console.log(index, value)
})
```

浏览器运行结果

```
VM115:36 0 1
VM115:36 1 2
VM115:36 2 3
undefined
```
[相关代码 demo09](https://github.com/PsChina/DesignPattern/tree/master/demo09)

(完)