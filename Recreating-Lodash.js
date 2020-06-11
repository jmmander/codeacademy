
const _ = {
  clamp(number, lower, upper){
    const lowerClampedValue = Math.max(number, lower);
    const clampedValue = Math.min(lowerClampedValue, upper);
    return clampedValue;
    },
  inRange(number, start, end) {
    if (end === undefined) {
      end = start;
      start = 0; 
  }
    if (start > end) {
      [start, end] = [end, start]
      }
    let inrange = number >= start && number < end;
  return inrange 
  },
  words(string) {
    words = string.split(" ");
    return words
  },
  pad(string, len) {
    if (string.length >= len) {
      return string
    }
    const start = Math.floor((len - string.length)/2);
    const end = len - string.length - start;
    const padded = " ".repeat(start) + string + " ".repeat(end);
    return padded;
    },
  has(object, key) {
    const hasVal = object[key] != undefined;
    return hasVal;
  },
  invert(obj) {
    const newObj = {};
    for (let key in obj) {
      const val = obj[key];
      newObj[val] = key
    }
    return newObj
  },
  findKey(obj, predicate) {
    for (let key in obj) { 
      if (predicate(obj[key])) {return key;}
    return undefined;
    }
  },
  drop(array, number) {
    if (number === undefined) {
      number = 1;
      }
    newArray = array.splice(number, array.length);
    return newArray;
    },
  dropWhile(array, pred) {
      let dropNo = array.findIndex(function (ele,index)   {return !pred(ele, index, array)});
      let dropArray  = this.drop(array,dropNo);
      return dropArray;
    },
  chunk(array, size){
    if (size === undefined) {
      size = 1;
      }
    let arrayChunks = [];
    for (i=0; i<array.length; i+=size) {
      arrayChunk = array.slice(i,i+size);
      arrayChunks.push(arrayChunk);
    }
    return arrayChunks
  }
  }
  

  
   

// Do not write or modify code below this line.
module.exports = _;
