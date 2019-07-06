/**
 * Only use pure JavaScript.
 * @author Hephaest
 * @version 2018/10/20
 */

/**
 * In case of input error.
 * @param text User input.
 * @returns {*} the check result.
 */
function handle_undefined(text){
    var check = (parseInt(text)) * 0.01;
    text = toString(check)!== "object undefined"? check : "Error";
    return text;
}

/**
 * In case of input error.
 * @param text Output.
 * @returns {any} the output result.
 */
function calculator(text){
    var output;
    try{
        // If the string represents an expression, eval() evaluates the expression.
        output = eval(text);
    } catch(e){
        output= "Error";
    }
    return output;
}

/**
 * Traverse the buttons and get the real-time expression.
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