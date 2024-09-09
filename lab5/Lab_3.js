const str = "Hello";
const logicalType1 = true;
const logicalType2 = false;
let integer = 12;
let num = 3E10;
let array = [2, 3, 52, 12];
const arrayAsCollection = [3, 54, 324, 12];
let contact = ["Vladilen", "375445635869", 12];
let newVar = "Hello";
newVar = 21;
function sayMyName(name) {
    console.log(name);
}
sayMyName('HelloMyGuest');
function throwError(str) {
    throw new Error(str);
}
function throwError2(str) {
    while (true) { }
}
const log = "abcd";
let a = true;
const rect = {
    id: "12a",
    size: {
        width: 12,
        height: 32
    }
};
rect.color = "#34354";
const rect3 = {};
const rect4 = {};
const rect5 = {
    id: "12a",
    size: {
        width: 12,
        height: 32
    },
    getArea() {
        return this.size.width * this.size.height;
    }
};
class Clock {
    constructor() {
        this.time = new Date();
    }
    setTime(date) {
        this.time = date;
    }
}
const Css = {
    border: '1px solid black',
    marginTop: '3px'
};
var color;
(function (color) {
    color[color["black"] = 0] = "black";
    color[color["white"] = 1] = "white";
    color[color["green"] = 2] = "green";
})(color || (color = {}));
const col = color.black;
const col2 = color[1];
var city;
(function (city) {
    city["minsk"] = "Minsk";
    city["grodno"] = "Grodno";
    city["brest"] = "Brest";
})(city || (city = {}));
const newCity = city.minsk;
function newFunct(x, y) {
    return { x, y };
}
class newClass {
    constructor(na) {
        this.name = na;
    }
    info() {
        return this.name;
    }
}
class Car1 {
    constructor(theModel) {
        this.numberOfWheels = 4;
        this.model = theModel;
    }
}
class Car {
    constructor(model) {
        this.model = model;
        this.numberOfWheels = 4;
        this.voice = '';
    }
}
class newCar extends Car {
}
class Component {
}
class newComp extends Component {
    render() {
        console.log(`Some info`);
    }
    info() {
        return 'some stroke';
    }
}
function someFunction(x) {
    if (typeof x == 'number') {
        return x.toFixed();
    }
    else {
        return x.trim();
    }
}
class MyResponse {
    constructor() {
        this.header = 'responce header';
        this.result = 'responce result';
    }
}
class MyError {
    constructor() {
        this.header = 'error header';
        this.message = 'error message';
    }
}
function handle(res) {
    if (res instanceof MyResponse) {
        return {
            info: res.header + res.result
        };
    }
    else {
        return {
            info: res.header + res.message
        };
    }
}
function setAlertType(type) {
}
setAlertType('sucxess');
setAlertType('warning');
const arrayOfNumber = [1, 1, 2, 3];
function reverse(array) {
    return array.reverse();
}
console.log(reverse(arrayOfNumber));
const myName = 'name';
let u1 = 'name';
