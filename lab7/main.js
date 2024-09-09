//1
function promiseGen(minvalue, maxvalue) {
  let pr = new Promise((res, rej) => {
    setTimeout(() => {
      let value = Math.round(Math.random() * (maxvalue - minvalue) + minvalue);
      res(value);
    }, 3000);
  });
  return pr;
}
 
let pr2 = promiseGen(300, 1000);
pr2.then((v) => console.log(v));

//2
function delayedPromiseGen(delay, minvalue, maxvalue) {
  let pr = new Promise((res, rej) => {
    setTimeout(() => {
      let value = Math.round(Math.random() * (maxvalue - minvalue) + minvalue);
      res(value);
    }, delay);
  });
  return pr;
}

let prom1 = delayedPromiseGen(500, 1, 100);
let prom2 = delayedPromiseGen(100, 100, 200);
let prom3 = delayedPromiseGen(1500, 200, 300);
 

Promise.all([prom1, prom2, prom3]).then(() =>
  console.log("Done!!!")
);

 
//4
let pr = new Promise((res, rej) => {
  rej("ku");
});

pr.then(() => console.log(1))
  .catch(() => console.log(2))
  .catch(() => console.log(3))
  .then(() => console.log(4))
  .then(() => console.log(5));

//5
let success_promise = new Promise((res, rej) => {
  res(21);
});

success_promise
  .then((v) => {
    console.log(v);
    return v * 2;
  })
  .then((v) => console.log(v));

//6

async function getValues() {
  let val = await success_promise;
  console.log("await:", val);
  console.log("await:", val * 2);
}

getValues();
