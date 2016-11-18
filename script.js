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

        //**********Creating Buttons*************//
        createbutton('(', 'add_digit');
        createbutton(')', 'expr');
        createbutton('CE', 'last_trim');
        createbutton('C', 'myFunction');
        $("form").append("<br>");
        createbutton('+', 'expr');
        createbutton('-', 'expr');
        createbutton('*', 'expr');
        createbutton('/', 'expr');
        $("form").append("<br>");

        for (var i = 9; i >= 0; i--) {
            createbutton(i, 'add_digit');
            if (/6|2/.test(i))
                $("form").append("<br>"); }

        createbutton('.', 'put_dot');
        createbutton('=', 'eql');
        //*************************************//
    });

    function createbutton(x, fn) {
        $("form").append($('<button>').attr({
            name: 'button',
            value: x,
            type: 'button',
            class: fn
        }).text(x));    }

    var pre = '0';
    var x2 = '';
    var arr = [];

    //***********Used to reset everything***********//
    $(document).on('click', '.myFunction', function() {
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

            x2 += arr[i];

        }
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