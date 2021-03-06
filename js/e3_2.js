const students = [];
var curStudent = null;
var tableBody = null;

function Student(name, id, className, rfid, web) {
    this.name = name || '';
    this.id = id || '';
    this.className = className || '';
    this.rfid = rfid || 0;
    this.web = web || 0;
}


function initStudents() {
    students[0] = new Student('张三', '001', 'IOT1802', 90, 80);
    students.push(new Student('李四', '002', 'IOT1802', 70, 60));
    students.push(new Student('王五', '003', 'IOT1802', 50, 90));
    console.log(students);
}
function updateStudent2Form(s) {
    frm.iptId.value = s.id;
    frm.iptName.value = s.name;
    frm.iptClassName.value = s.className;
    frm.iptRfid.value = s.rfid;
    frm.iptWeb.value = s.web;
    curStudent = s;
}

const frm = {
    iptId: null,
    iptName: null,
    iptClassName: null,
    iptRfid: null,
    iptWeb: null
}

function onAdd() {
    let student = new Student(
        frm.iptName.value, frm.iptId.value, frm.iptClassName.value, frm.iptRfid.value, frm.iptWeb.value);
    students.push(student);
    refresh(students);
}


function onUpdate() {
    curStudent.id = frm.iptId.value;
    curStudent.name = frm.iptName.value;
    curStudent.className = frm.iptClassName.value;
    curStudent.rfid = frm.iptRfid.value;
    curStudent.web = frm.iptWeb.value;

    refresh(students);

}

function onQuery() {
    const id = frm.iptId.value;
    const result = [];

    for (let s of students) {
        if (s.id === id) {
            result.push(s);
        }
    }
    if (result.length <= 0) {
        alert('没有查到！');
        refresh(students);
    } else {
        refresh(result);
    }
}


function onDelete(s) {
    let index = 0;
    for (let stu of students) {
        if (stu.id === s.id) {
            students.splice(index, 1);
            break;
        }
        index++;
    }
    refresh(students);
}

function refresh(stus) {
    tableBody.innerHTML = '';
    for (let s of stus) {
        //创建一行 tr
        const tr = document.createElement('tr');
        tr.addEventListener('click', function (evt) {
            updateStudent2Form(s);
        });
        //创建每一列 td
        const td1 = document.createElement('td');
        td1.innerText = s.id;
        tr.appendChild(td1);

        const td2 = document.createElement('td');
        td2.innerText = s.name;
        tr.appendChild(td2);

        const td3 = document.createElement('td');
        td3.innerText = s.className;
        tr.appendChild(td3);

        const td4 = document.createElement('td');
        td4.innerText = s.rfid;
        tr.appendChild(td4);

        const td5 = document.createElement('td');
        td5.innerText = s.web;
        tr.appendChild(td5);


        const td6 = document.createElement('td');
        const btnDel = document.createElement('a');
        btnDel.href = '#';
        btnDel.innerText = '删除';
        btnDel.addEventListener('click', function (evt) {
            evt.stopPropagation();
            onDelete(s);
        });
        td6.appendChild(btnDel);
        tr.appendChild(td6);

        tableBody.appendChild(tr);
    }
}

window.onload = function () {
    initStudents();

    this.tableBody = document.getElementById('stuTbody');
    frm.iptId = document.getElementById('stuId');
    frm.iptName = document.getElementById('stuName');
    frm.iptClassName = document.getElementById('stuClass');
    frm.iptRfid = document.getElementById('rfid');
    frm.iptWeb = document.getElementById('web');

    const btnAdd = document.getElementById('add');
    btnAdd.addEventListener('click', function (evt) {
        onAdd();
        evt.returnValue = false;
    });

    const btnUpdate = document.getElementById('update');
    btnUpdate.addEventListener('click', function (evt) {
        onUpdate();
        evt.returnValue = false;
    });

    const btnQuery = document.getElementById('query');
    btnQuery.addEventListener('click', function (evt) {
        onQuery();
        evt.returnValue = false;
    });

    refresh(students);
}