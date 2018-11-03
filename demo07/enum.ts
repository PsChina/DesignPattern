enum Types {
    type1 = '类型一',
    type2 = '类型二',
    type3 = '类型三'
}


class ArrayAdapterOfEnum {
    private anyEnum:object
    private index:number
    private values:Array<any>
    constructor(anyEnum?:object) {
        this.setEnum(anyEnum)
    }
    [Symbol.iterator](){
        let _this = this
        return {
            next(){
                return {
                    done:_this.index>=_this.values.length ? true : false,
                    value:_this.values[_this.index++]
                }
            }
        }
    }
    setEnum(anyEnum?:object){
        this.anyEnum = anyEnum || {}
        this.values = []
        for(let key in this.anyEnum){
            this.values.push(this.anyEnum[key])
        }
        this.index = 0
        return this
    }
}

let arrayAdapterOfEnum = new ArrayAdapterOfEnum()

for(let item of arrayAdapterOfEnum.setEnum(Types)){
    console.log(item)
}