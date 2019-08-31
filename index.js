const glob = require('glob');
const chalk = require('chalk');
const tinify = require('tinify');
tinify.key = 'KckuU929qtv_nPK_czL6HKfcAJO9FCKm';
let files = glob.sync('images/**/*.{png,jpg,jpeg}');

const timeInfo = `tinify 共处理${files.length}个文件, 共耗时`;
console.time(timeInfo);
const tinifyImg = src =>
    new Promise((resolve, reject) => {
        tinify.fromFile(src).toFile(src, err => {
            if (err) {
                resolve({ code: -1, path: src });
            } else {
                console.log(`成功压缩 ${chalk.blue(src)}`);
                resolve({ code: 1, path: src });
            }
        });
    });
Promise.all(files.map(v => tinifyImg(v)))
    .then(res => {
        console.log(res);
        console.timeEnd(timeInfo);
    })
    .catch(e => {
        console.log(e);
    });
