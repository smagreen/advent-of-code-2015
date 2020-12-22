const crypto = require('crypto');

console.log(crypto.createHash('md5').update('abcdef609043').digest("hex"));
console.log(crypto.createHash('md5').update('pqrstuv1048970').digest("hex"));


let n = 0;
const rex = RegExp(/^000000/g);
while(true){
    const s = 'yzbqklnj' + n;
    const md5 = crypto.createHash('md5').update(s).digest("hex")
    if(md5.match(rex)){
        console.log(n);
        break;
    }
    n++;
}