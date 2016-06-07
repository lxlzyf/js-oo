// 工厂模式
function createObject(user,age){
    var obj=new Object();
    obj.user=user;
    obj.age=age;
    obj.run=function(){
        return this.user+this.age+"运行中";
    };
    return obj;
};

// 构造函数创建对象
function Box(user,age){
    this.user=user;
    this.age=age;
    this.run=function(){
        return this.user+this.age+'运行中';
    };
};

// 原型模式
// 构造函数体内什么都没有，如果有就叫做实例属性和实例方法
/*
1.判断某属性是否存在与构造函数的实例中  object.hasOwnProperty(property)
2.判断某属性是否存在  property in object
3.判断某一实例对象是否从属于另一个父级对象  a instanceof A
*/
function Pox(){};
Pox.prototype.user='Lee';       //原型属性
Pox.prototype.age=132;
Pox.prototype.run=function(){
    return this.user+this.age+'呵呵呵';
}
// 判断某个属性只存在于原型中
function isProperty(object,property){
    return !object.hasOwnProperty(property)&&(property in object);
}

// 原型字面量写法
// 为了让属性和方法更好的体现封装性，原型的创建可以使用字面量的方式
function Abc(){};
Abc.prototype={
    constructor:Abc,        //可以强行设置constructor的指向
    user:'Lee',
    age:100,
    run:function(){
        return this.user+this.age+'运行中';
    }
};
// 但是在使用字面量方式创建原型后，原型的constructor属性就指向了Object
/*
Abc.prototype={};这种写法其实就是创建了一个新对象
而每创建一个函数，就会同时创建它的prototype，这个对象也就会自动获取constructor属性
所以新对象的constructor属性重写了Abc原来的constructor
因此就会指向新对象，而那个新对象没有指定构造函数，那么就默认为Object
*/
var abc=new Abc();
// console.log(abc.constructor);
// console.log(abc.__proto__.constructor);
// console.log(Abc.prototype);
// console.log(abc instanceof Abc);
// 重写原型对象
// 如果直接这样重写原型，将会直接切断实例对象与之前原型的连接
// 虽然这里只重写了一个原型属性，但实际上直接覆盖了之前的原型对象
Abc.prototype={
    age:123
}
var xyz=new Abc();
// 重写后再次访问第一次写的原型对象中的属性，已经为undefined
// console.log(xyz.user);


// 内置对象中的原型
/*
console.log(Array.prototype.sort);
console.log(String.prototype.substring);
// 扩展内置对象原型上的方法
String.prototype.addstring=function(){
    return this+',被添加了';
}
console.log('Sakura'.addstring());
*/

// 原型模式缺点
/*
1.省略了构造函数传参的过程，所有定义在原型上的属性都是共享的（尤其是引用类型）
*/
function Xperia(){};
Xperia.prototype={
    constructor:Xperia,
    user:'SONY',
    age:75,
    family:['z1','z2','z3c','z5p'],
    buy:function(){
        return this.user+this.age+'周年';
    }
};
var xperia=new Xperia();
var xperiaZ=new Xperia();
/*
console.log(xperia.user);
console.log(xperia.buy());
console.log(xperia.family);
xperia.family.push('XP');
console.log(xperia.family);
console.log(xperiaZ.family);        //这里共享了xperia修改后的引用类型family
*/

//使用组合构造函数模式+原型模式
function Qwe(user,age){
    this.user=user;
    this.age=age;
    this.family=['abc','qwe','nmb'];
}
Qwe.prototype={
    constructor:Qwe,
    say:function(){
        return this.user+this.age+'hehe ';
    }
};
// 组合构造函数+原型模式，将需要独立的属性定义在构造函数中，可以共享的属性或方法定义在原型中
// 解决了因为原型属性共享导致的多个对象无法拥有独立属性的问题
/*
var qwe=new Qwe('Sakura',12);
var qwe1=new Qwe('Jack',45);
console.log(qwe.say());
console.log(qwe.family);
qwe.family.push('456');
console.log(qwe.family);
console.log(qwe1.family);
console.log(qwe1.say());
*/

// 动态原型模式
// 将构造函数模式和原型模式封装在一起
//可以直接在构造函数内初始化原型
// 但是这样在实例化的过程中，多个实例化对象会使原型对象多次初始化
// 使用动态原型模式，不能在使用字面量的方式重写原型，因为会切断实例和新原型之间的联系
function Qqq(user,age){
    this.user=user;
    this.age=age;
    this.family=['abc','qwe','nmb'];
    //第一次初始化时就检测是否已经初始化
    if(typeof this.say!='function'){
        console.log('原型初始化开始');
        Qqq.prototype.say=function(){
            return this.user+this.age+'hehe ';
        };
        console.log('原型初始化结束');
    }
}
/*
var qqq=new Qqq('Sakura',12);
var qqq1=new Qqq('Jack',45);
console.log(qqq.say());
console.log(qqq1.family);
*/

// 寄生构造函数模式（工厂模式+构造模式）
// 其实就是将工厂模式按照构造函数模式使用new关键字实例化对象
function Bbb(user,age){
    var obj=new Object();
    obj.user=user;
    obj.age=age;
    obj.run=function(){
        return this.user+this.age+'yunxing';
    }
    return obj;
}


// 稳妥构造函数
// 构造函数内部不能使用this，实例话对象不能用new
function Aaa(user,age){
    var obj=new Object();
    obj.user=user;
    obj.age=age;
    obj.run=function(){
        return this.user+this.age+'yunxing';
    }
    return obj;
}

// 继承(原型链)
function Bxb(){     //被继承的函数（超类型）
    this.user='Sakura';
}
Bxb.prototype.say=function(){
    console.log(this.level+'我是父类Bxb原型中的方法');
}
function Desk(){    //继承的函数（子类型）
    this.age=100;
}
function Table(){
    this.level='AAA';
}
Desk.prototype=new Bxb();       //Desk继承于Bxb
Table.prototype=new Desk();     //Table继承于Desk
// 通过原型链使Desk继承Bxb
// 将超类型实例化后的对象实例，赋值给子类型的原型属性即可
// new Bxb()会将Bxb构造函数里的信息和原型里的信息都交给Desk
// Desk的原型得到的是Bxb的构造以及原型中的信息
var desk=new Desk();
var table=new Table();
/*
console.log(desk.user);
console.log(table.user);
console.log(table.__proto__);
console.log(table.constructor==desk.constructor);
table.say();
console.log(table instanceof Object);
console.log(table instanceof Bxb);
console.log(table instanceof Desk);
console.log(table instanceof Table);
console.log('say' in table);
*/

// 继承（借用构造函数）
function Ppp(user,age){
    this.user=user;
    this.age=age;
    this.family=['sakura','misaka','qwerty','qqq'];
}
Ppp.prototype.family='家庭';
function Ddd(user,age){
    Ppp.call(this,user,age);
}
/*
var ddd=new Ddd('Sakura',45);
console.log(ddd.user);
*/
//借用构造函数（对象冒充）只能继承构造函数中的实例属性，不能继承原型中的属性(比如需要共享的方法等)

// 借用构造函数+原型链实现继承(组合继承)
function Mmm(user,age){
    this.user=user;
    this.age=age;
}
Mmm.prototype.run=function(){
    return this.user+this.age;
}
Aaa.prototype=new Mmm();
function Aaa(user,age){
    Mmm.call(this,user,age);
}
/*
var aaa=new Aaa('Lee',99);
console.log(aaa.run());
*/
// 本身对象冒充的方式不能继承超类型原型里的属性，所以讲Mmm超类型实例化的对象赋值给Aaa子类型的原型属性，再用对象冒充的方式使Aaa继承Mmm中的构造属性
// 这样既可以使子类型继承父类型中原型中的属性，也能实现子类型给超类型传参
