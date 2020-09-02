


function map(input, cb) {
  const arr = [];
  for (let i = 0; i < input.length; i++) {
    arr.push(cb(input[i]));
  }
  return arr;
}

function filter(input, cb) {
  const arr = [];
  for (let i = 0; i < input.length; i++) {
    if (cb(input[i])) {
      arr.push(input[i]);
    }
  }
  return arr;
}

function reduce(input, cb, initialValue) {
  let currentValue = initialValue;
  for (let i = 0; i < input.length; i++) {
    currentValue = cb(currentValue, input[i]); 
  }
  return currentValue;
}

function deepEquals(e1, e2) {
  console.log({e1, e2});
  if (typeof e1 !== typeof e2) {
    // redundant check because we're using `===` below
    return false;
  }
  if (
    (Array.isArray(e1) && !Array.isArray(e2))||
    (!Array.isArray(e1) && Array.isArray(e2))
  ) {
    return false;
  }

  if (Array.isArray(e1)) {
    if (e1.length !== e2.length) return false;
    for (let i = 0; i < e1.length; i++) {
      if (!deepEquals(e1[i], e2[i])) {
        console.log(e1, e2);
        console.log('?');
        return false;
      }
    } 
    return true;
  } else if (typeof e1 === 'object') {
    const [e1Keys, e1Values] = [Object.keys(e1), Object.values(e1)];
    const [e2Keys, e2Values] = [Object.keys(e2), Object.values(e2)];
    if (!deepEquals(e1Keys, e2Keys) || !deepEquals(e1Values, e2Values)) {
      console.log("FAILLLLED");
      return false;
    }
    return true;
  } else {
    return e1 === e2;
  }
}

let arr = [1,2,3,4,5]
let res = map(arr, (e) => e + e);
console.log(res) // [2,4,6,8,10]

res = filter(arr, (e) => e >= 3);
console.log(res); // [3,4,5]

res = reduce(arr, (acc, cur) => {
  acc += cur
  return acc;
}, 0);
console.log(res); // 15

arr = [{breed: 'corgi', name: 'mochee'}, {breed: 'ugly', name: 'ugly'}, {breed: 'corgi', name: 'gen'}];
res = reduce(arr, (acc, cur) => {
  if (cur.breed !== 'corgi') {
    return acc;
  }

  acc.push(cur)
  return acc;
}, []);
console.log(res);

res = deepEquals([1,2,3,4,5], [1,2,3,4,5]);
console.log(res); // true

res = deepEquals([1,2,3,4,5], [1,2,3,4]);
console.log(res); // false

res = deepEquals([1,2,3,4,5], [[[1,2,3,4,5]]]);
console.log(res); // false

res = deepEquals([[[1,2,3,4,5]]], [[[1,2,3,4,5]]]);
console.log(res); // true

res = deepEquals([[[{foo: [1,2,3]},2,3,4,5]]], [[[1,2,3,4,5]]]);
console.log(res); // false

res = deepEquals([{breed: 'corgi', name: 'mochee'}, {breed: 'ugly', name: 'ugly'}, {breed: 'corgi', name: 'gen'}], [{breed: 'corgi', name: 'mochee'}, {breed: 'ugly', name: 'ugly'}, {breed: 'corgi', name: 'gen'}]);
console.log(res); // true