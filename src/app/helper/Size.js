const isString = obj => Object.prototype.toString.call(obj) === "[object String]";
const isArray = obj => Array.isArray(obj);
const isObject = obj => obj === Object(obj);
const ObjLength = obj => Object.keys(obj).length;
const size = obj => isArray(obj) || isString(obj) ? obj.length : isObject(obj) ? ObjLength(obj) : 0;

export {
    isString,
    isArray,
    isObject,
    size
}