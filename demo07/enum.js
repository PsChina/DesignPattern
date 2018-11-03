var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var e_1, _a;
var Types;
(function (Types) {
    Types["type1"] = "\u7C7B\u578B\u4E00";
    Types["type2"] = "\u7C7B\u578B\u4E8C";
    Types["type3"] = "\u7C7B\u578B\u4E09";
})(Types || (Types = {}));
var ArrayAdapterOfEnum = /** @class */ (function () {
    function ArrayAdapterOfEnum(anyEnum) {
        this.setEnum(anyEnum);
    }
    ArrayAdapterOfEnum.prototype[Symbol.iterator] = function () {
        var _this = this;
        return {
            next: function () {
                return {
                    done: _this.index >= _this.values.length ? true : false,
                    value: _this.values[_this.index++]
                };
            }
        };
    };
    ArrayAdapterOfEnum.prototype.setEnum = function (anyEnum) {
        this.anyEnum = anyEnum || {};
        this.keys = [];
        this.values = [];
        for (var key in this.anyEnum) {
            this.keys.push(key);
            this.values.push(this.anyEnum[key]);
        }
        this.index = 0;
        console.log(this);
        return this;
    };
    return ArrayAdapterOfEnum;
}());
var arrayAdapterOfEnum = new ArrayAdapterOfEnum();
try {
    for (var _b = __values(arrayAdapterOfEnum.setEnum(Types)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var item = _c.value;
        console.log(item);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
