// In case of input error
$.func={
    handle_undefined: function (text) {
        var check = (parseInt(text)) * 0.01;
        text = (toString(check)!= "object undefined")? check : "Error";
        return text;
    },

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

$(document).ready(function () {
    var button = $(".btn");
    var expression = $(".output_txt")[0];
    var special_op = $(".gray_btn");
    var record = false;
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

    button.bind("click", function () {
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
            expression.value = $.func.calculator(expression.value);
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
    })

})
