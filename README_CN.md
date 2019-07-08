目录
=================
   * [效果](#效果)
   * [iOS 计算器](#ios-计算器)
      * [HTML](#html)
      * [CSS](#css)
      * [JavaScript](#javascript)

# 效果

<p align="center"><img src ="images/calculator.gif" width = "400px"></p>

# iOS 计算器
[![LICENSE](https://img.shields.io/cocoapods/l/AFNetworking.svg)](https://github.com/Hephaest/Simple-Java-Caculator/blob/master/LICENSE)
[![JQuery](https://img.shields.io/badge/JQuery-1.12.2-orange.svg)](https://github.com/Hephaest/iOSCalculator/blob/master/src/jquery-1.12.2.js)
[![Dependencies](https://img.shields.io/badge/Dependencies-up%20to%20date-green.svg)](https://github.com/Hephaest/iOSCalculator/tree/master/src)

[English](README.md) | 中文

最后一次更新于 `2019/07/08`

该项目可在浏览器页面上实现 iOS 计算器。<br>
该项目可被分成三部分: `HTML`，`CSS` 和 `JavaScript`。 具体实现方法会在下方详细展开。

## HTML
首先，我们需要创建一个 HTML 文件来定义 iOS 计算器的布局。它只有一个文本框。 第一行的按钮均为特殊操作符按钮 (被标记为 `btn orange_btn`)。除此之外，最后一列的按钮表示常见操作符 (被标记为 `gray_btn`)。 剩下的按钮均为普通数字按钮 (被标记为 `btn`). 所有的按钮被包裹在 `table` 标签下。

具体代码如下：
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="interface.css">
    <script src="end_console.js"></script>
    <script src="jquery-1.12.2.js"></script> <!-- 只需要引用其中一种方法! -->
<!--     <script src="jQuery_solution.js"></script> -->
    <title>JavaScript Calculator</title>
</head>
<body>
<table>
    <!--展示表达式-->
    <tr>
        <td colspan="4"><input class="output_txt" type="text"  value="0" disabled></td>
    </tr>
    <!--iOS 布局->
    <tr>
        <td><input class="gray_btn" type="button" value="AC"></td>
        <td><input class="gray_btn" type="button" value="+/-"></td>
        <td><input class="gray_btn" type="button" value="%"></td>
        <td><input class="btn orange_btn" type="button" value="÷"></td></tr>
    <tr>
        <td><input class="btn" type="button" value="7"></td>
        <td><input class="btn" type="button" value="8"></td>
        <td><input class="btn" type="button" value="9"></td>
        <td><input class="btn orange_btn" type="button" value="×"></td></tr>
    <tr>
        <td><input class="btn" type="button" value="4"></td>
        <td><input class="btn" type="button" value="5"></td>
        <td><input class="btn" type="button" value="6"></td>
        <td><input class="btn orange_btn" type="button" value="-"></td></tr>
    <tr>
        <td><input class="btn" type="button" value="1"></td>
        <td><input class="btn" type="button" value="2"></td>
        <td><input class="btn" type="button" value="3"></td>
        <td><input class="btn orange_btn" type="button" value="+"></td></tr>
    <tr>
        <td colspan="2"><input class="btn btn_long" type="button" value="0"></td>
        <td><input class="btn" type="button" value="."></td>
        <td><input class="btn orange_btn" type="button" value="="></td></tr>
</table>
</body>
</html>
```
## CSS
第二个任务是渲染 iOS 的布局。比如在我们的事例中，所有按钮的边缘都是圆角。除此之外，`gray_btn` 对应的按钮16进制的颜色表示是 `#a6a6a6`，`orange_btn` 对应的按钮16进制的颜色表示是 `#ff9705` 而 `btn` 对应的按钮16进制的颜色表示是 `#333333`。

具体代码如下：
```CSS
button,input,td,body{
    border: 0;
    margin: 0;
    padding: 0;
    outline:none; /* 移除用户点击时按钮边缘出现的蓝框 */
}

table{
    display: block;
    position:absolute;
    width: 400px;
    height: 620px;
    top:50%;
    left:50%;
    margin-top: -310px;
    margin-left: -200px;
    border-spacing: 0px;
    background-color: black;
}

td{
    width: 100px;
    height: 100px;
    text-align:center;
}
.output_txt {
    width: 340px;
    height: 100px;
    border:0px;
    color: white;
    font-size: 70px;
    text-align: right;
    margin-left: 0px;
    background-color: black;
}
.btn{
    width: 85px;
    height: 85px;
    border-radius: 50%;
    font-size:40px;
    color:#ffffff;
    background-color: #333333;
}

.btn_long{
    width: 180px;
    height: 80px;
    border-radius: 50px;
}

.orange_btn{
    background-color: #ff9705;
}

.gray_btn{
    width: 85px;
    height: 85px;
    border-radius: 50%;
    font-size:40px;
    color: black;
    background-color: #a6a6a6;
}
```
## JavaScript
我提供了两种用 JavaScript 实现的计算方法(只是形式上不同，本质还是一致的)。在 JavaScript 中，它有现成的内置函数 `eval()` 用于计算表达式的结果，这样就不需要我们自己去写相对应的算法啦。需要实现的功能是每当用户点击按钮，文本框要实时显示被更新的表达式。如果表达式有错误(不是算术表达式)，那么就需要立刻在文本框提示用户当前表达式是"Error"。

简单的 Javascript 写法的代码如下：
```JavaScript
/**
 * 最基本的 Javascript 写法。
 * @author Hephaest
 * @version 2018/10/20
 */

/**
 * 以防输入错误。
 * @param text 用户输入的文本。
 * @returns {*} 检查结果。
 */
function handle_undefined(text){
    var check = (parseInt(text)) * 0.01;
    text = toString(check)!== "object undefined"? check : "Error";
    return text;
}

/**
 * 以防用户输入的表达式会引起异常。
 * @param text 即将被计算的表达式文本。
 * @returns {any} 计算结果或"Error"。
 */
function calculator(text){
    var output;
    try{
        // 如果当前表达式能被 eval() 计算，说明表达式无误，否则进入异常处理。
        output = eval(text);
    } catch(e){
        output= "Error";
    }
    return output;
}

/**
 * 遍历所有的按钮并实时更新文本框的表达式。
 */
window.onload = function () {
    let button = document.getElementsByClassName("btn");
    let expression = document.getElementsByClassName("output_txt")[0];
    let special_op = document.getElementsByClassName("gray_btn");
    let record = false;
    for (let i = 0; i < special_op.length; i++) {
        special_op[i].onclick = function () {
            if (this.value === "AC") expression.value = "0";
            else if (this.value === "+/-") expression.value = parseInt(expression.value)* (-1);
            else expression.value = handle_undefined(expression.value);
            }
    }

    for (let i = 0; i < button.length; i++) {
        button[i].onclick = function () {
            if (this.value === "."){
                if (expression.value.indexOf(".") === -1) expression.value += this.value;
            } else if (this.value === "÷" || this.value === "×"){
                if(this.value === "÷") expression.value += "/";
                else expression.value += "*";
            } else if(this.value === "="){
                expression.value = calculator(expression.value);
                record = true;
            } else {
                if(expression.value === "0" || record === true){
                    expression.value = this.value;
                    record = false;
                } else{
                    expression.value += this.value;
                }
            }
        }
    }
}
```

JQuery 写法的代码如下：
```JavaScript
/**
 * 只使用 JQuery 的写法。
 * @author Hephaest
 * @version 2018/10/20
 */

/**
 * 确认将被计算或显示的表达式是否有误。
 * @type {{handle_undefined: (function(*=): *), calculator: (function(*=): any)}}
 */
$.func={
    // 如果用户输入有误，在文本框显示"Error"。
    handle_undefined: function (text) {
        var check = (parseInt(text)) * 0.01;
        text = (toString(check)!= "object undefined")? check : "Error";
        return text;
    },

    // 如果当前表达式无法被计算，被异常处理捕获并在文本框显示"Error"。
    calculator: function (text) {
        var output;
        try{
            output = eval(text);
        } catch(e){
            output= "Error";
        }
        return output;
    }

}

/**
 * 捕获用户输入的字符并实时更新文本框里显示的表达式。
 */
$(document).ready(function () {
    var button = $(".btn");
    var expression = $(".output_txt")[0];
    var special_op = $(".gray_btn");
    var record = false;

    // 判断是否是特殊操作符。
    special_op.bind("click",function () {
        if (this.value === "AC") {
            expression.value = "0";
        }
        else if (this.value === "+/-") {
            expression.value = parseInt(expression.value)* (-1);
        }
        else {
            expression.value = $.func.handle_undefined(expression.value);

        }
    })

    // 连接操作符和数字形成表达式。
    button.bind("click", function () {
        if (this.value === "."){
            if (expression.value.indexOf(".") === -1) expression.value += this.value;
        } else if (this.value === "÷" || this.value === "×"){
            if(this.value === "÷") expression.value += "/";
            else expression.value += "*";
        } else if(this.value === "="){
            expression.value = $.func.calculator(expression.value);
            record=true;
        } else {
            if(expression.value === "0" || record === true){
                expression.value = this.value;
                record = false;
            } else{
                expression.value += this.value;
            }
        }
    })

})
```
