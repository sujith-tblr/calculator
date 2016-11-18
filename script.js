    $(document).ready(function() {
        //***********Creating title,h1 and form**********//
        $("head").append($("<title></title>").text("Calculator"));
        $("placeholder").append($("<h1></h1>").text("Simple Calculator"));

        $("placeholder").append($('<form>').attr({
            name: 'Calculator'
        }));

        $("form").append($('<input>').attr({
            type: 'button',
            id: 'field',
            name: 'Display',
            value: '0'
        }));
        
        $("form").append("<br>");
        var chars = ["(", ")", "CE", "C", "9", "8", "7", "/", "6", "5", "4", "*", "3", "2", "1", "-", "0", ".", "=", "+"];
        var fctns = '';
            //**********Creating Buttons*************//
        for (var i = 0; i <20; i++) {

            if(/\d|\(/.test(chars[i]))fctns='add_digit';
            else if (/\)|\+|-|\*|\//.test(chars[i]))fctns='expr';
            else if(/=/.test(chars[i]))fctns="eql";
            else if(/C/.test(chars[i]))fctns="reset";
            else if(/CE/.test(chars[i]))fctns="last_trim";
            else if(/\./.test(chars[i]))fctns="put_dot";

            $("form").append($('<button>').attr({
            name: 'button',
            value: chars[i],
            type: 'button',
            class: fctns
        }).text(chars[i]));  
        
           if (i%4==3)
            $("form").append("<br>"); 
                                    }
       });
     //*************************************//
    var pre = '0';
    var x2 = '';
    var arr = [];
    //***********Used to reset everything***********//
    $(document).on('click', '.reset', function() {
        arr = [];
        x2 = '';
        pre = '0';
        document.Calculator.Display.value = pre;
    });
    //***********Used to insert digits to the display area***********//
    $(document).on('click', '.add_digit', function() {
        digit = this.value;
        if ((pre == 0) &&
            (pre.indexOf(".") == -1) || (pre == '+') || (pre == '-') || (pre == '*') || (pre == '/')
        ) {
            pre = digit;
        } else {
            pre = pre + digit;
            };
        document.Calculator.Display.value = pre;
    }); 
    //***********Used for inserting decimal points***********//
    $(document).on('click', '.put_dot', function() {

        if (pre.indexOf(".") == -1 && pre.indexOf("/") == -1 && pre.indexOf("*") == -1 && pre.indexOf("-") == -1 && pre.indexOf("+") == -1)
            pre = pre + ".";

        else if (pre.indexOf("/") == 0 || pre.indexOf("*") == 0 || pre.indexOf("-") == 0 || pre.indexOf("+") == 0)
            pre = 0 + ".";
       document.Calculator.Display.value = pre;
    });
    //***********Used to insert operators to the display screen.***********//
    $(document).on('click', '.expr', function() {
        opr = this.value;
        pre = document.Calculator.Display.value;
        if (pre != '+' && pre != '-' && pre != '*' && pre != '/' && pre != ')')
        arr.push(pre);
        pre = opr;
        arr.push(pre);
        document.Calculator.Display.value = pre;
    });
    //***********Used for evaluating the expression***********//
    $(document).on('click', '.eql', function() {
        if (pre != ')')
            arr.push(pre);
        for (i = 0; i < arr.length; i++) {
            x2 += arr[i];                 }
        document.Calculator.Display.value = eval(x2);
        arr = [];
        x2 = '';
        pre = document.Calculator.Display.value;
    });
    //***********Used for backspacing***********//
    $(document).on('click', '.last_trim', function() {
        str = document.Calculator.Display.value;
        document.Calculator.Display.value = str.substring(0, str.length - 1)
    });