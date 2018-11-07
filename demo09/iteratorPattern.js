var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(arr) {
        this.arr = arr;
        this.index = 0;
    }
    ArrayIterator.prototype.hasNext = function () {
        if (this.index < this.arr.length) {
            return true;
        }
        this.index = 0;
        return false;
    };
    ArrayIterator.prototype.next = function () {
        return this.arr[this.index++];
    };
    ArrayIterator.prototype.getIndex = function () {
        return this.index;
    };
    return ArrayIterator;
}());
var arr1 = [1, 2, 3, 4, 5];
var arrayIterator = new ArrayIterator(arr1);
while (arrayIterator.hasNext()) {
    console.log(arrayIterator.next());
}
var arr2 = [1, 2, 3];
var $ = {
    each: function (arr, callback) {
        var arrayIterator = new ArrayIterator(arr);
        while (arrayIterator.hasNext()) {
            callback(arrayIterator.getIndex(), arrayIterator.next());
        }
    }
};
$.each(arr2, function (index, value) {
    console.log(index, value);
});
