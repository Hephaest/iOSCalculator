/**
 * Use pure JQuery.
 * @author Hephaest
 * @version 2018/10/20
 */

/**
 * Check input and output expression.
 * @type {{handle_undefined: (function(*=): *), calculator: (function(*=): any)}}
 */
$.func={
    // If input is invalid, display "Error" in text box.
    handle_undefined: function (text) {
        var check = (parseInt(text)) * 0.01;
        text = (toString(check)!= "object undefined")? check : "Error";
        return text;
    },

    // If expression is invalid, display "Error" in text box.
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
 * Check the expression and display the final result.
 */
$(document).ready(function () {
    var button = $(".btn");
    var expression = $(".output_txt")[0];
    var special_op = $(".gray_btn");
    var record = false;

    // Check special operators.
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

    // Concatenate the expression and display the final result.
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
