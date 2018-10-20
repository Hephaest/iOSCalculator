// In case of input error
function handle_undefined(text){
    var check = (parseInt(text)) * 0.01;
    text = (toString(check)!= "object undefined")? check : "Error";
    return text;
}
//In case of input error
function calculator(text){
    var output;
    try{
        output = eval(text);
    } catch(e){
        output= "Error";
    }
    return output;
}

window.onload = function () {
    var button = document.getElementsByClassName("btn");
    var expression = document.getElementsByClassName("output_txt")[0];
    var special_op = document.getElementsByClassName("gray_btn");
    var record = false;
    for (var i = 0; i < special_op.length; i++) {
        special_op[i].onclick = function () {
            if (this.value === "AC") {
                expression.value = "0";
            }
            else if (this.value === "+/-") {
                expression.value = parseInt(expression.value)* (-1);
            }
            else {
                    expression.value = handle_undefined(expression.value);

                }
            }
    }
    for (var i = 0; i < button.length; i++) {
        button[i].onclick = function () {
            if (this.value === "."){
                if (expression.value.indexOf(".") != -1) {
                    //do nothing
                }
                else {
                    expression.value += this.value;
                }
            }
            else if (this.value === "÷" || this.value === "×"){
                if(this.value === "÷"){
                    expression.value += "/";
                }
                else {
                    expression.value += "*";
                }
            }
            else if(this.value === "="){
                expression.value = calculator(expression.value);
                record=true;
            }
            else {
                if(expression.value === "0" || record === true){
                    expression.value = this.value;
                    record = false;
                }
                else{
                    expression.value += this.value;
                }
            }
        }
    }
}