var strName;

function greeting(name: string): string {
    return 'greeting' + name;
}

var data = ['张三', '李四', '王五'];
data.forEach(function (val) {
    console.log(val);
});

data.forEach((val) => {
    console.log(val);
});