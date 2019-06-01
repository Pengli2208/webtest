var arrPoint1 = []; // 用于保存已经波形图的轨迹?
var arrPoint2 = []; // 用于保存已经波形图的轨迹?
var y_base1 = 150;
var y_base2 = 150;

function RefreshData() {


    function GetStyle2(element, property) {
        var proValue = null;
        if (!document.defaultView) {
            proValue = element.currentStyle[property];
        } else {
            proValue = document.defaultView.getComputedStyle(element)[property];
        }
        return proValue;
    }


    function DrawBase(ctx, width, height) {
        /*
        默认的线条宽px
        默认的颜色是黑色
        产生的原因是
        */
        //获取元素

        //var width = ctx.width;
        //var height = ctx.width;
        var spance = 20;

        var grid = 100;
        var xLineNumber = Math.floor(width / grid); //计算需要几条横
        var yLineNumber = Math.floor(height / grid); //计算需要几条竖
        ctx.strokeStyle = "#eee";
        for (var i = 0; i < xLineNumber; i++) { //循环来画
            ctx.beginPath();
            ctx.moveTo(i * grid, 0);
            ctx.lineTo(i * grid, height);
            ctx.stroke();
        }
        for (var i = 0; i < yLineNumber; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * grid);
            ctx.lineTo(width, i * grid);
            ctx.stroke();
        }
        //绘制坐标

        //1.绘制Y    
        var arrowSize = 10;
        ctx.beginPath();
        ctx.moveTo(spance, spance);
        ctx.lineTo(spance, height - spance);
        ctx.strokeStyle = "red";

        ctx.fillStyle = "red"
        ctx.stroke();
        //2.绘制X
        ctx.moveTo(spance, height - spance);
        ctx.lineTo(width - spance, height - spance);
        ctx.stroke();
        ctx.closePath();
        //3.绘制X轴的箭头
        ctx.beginPath();
        ctx.moveTo(width - spance, height - spance - 5);
        ctx.lineTo(width - spance, height - spance + 5);
        ctx.lineTo(width - spance + 10, height - spance);
        ctx.fill();
        ctx.closePath();
        //绘制Y轴箭
        ctx.beginPath();
        ctx.moveTo(spance - 5, spance);
        ctx.lineTo(spance + 5, spance);
        ctx.lineTo(spance, spance - 10);
        ctx.lineTo(spance - 5, spance);
        ctx.fill();

        ctx.closePath();
    }


    function UpdateData(typ, context_1, y_base_1, width1, height1) {
        // 首先让我们的函数周期调用
        var step = 10; // x轴每次走的步?
        var spance = 20;
        DrawBase(context_1, width1, height1);
        // 获取canvas对象和context,并进行一系列初始
        //PageLoad(context_1);


        context_1.beginPath();
        //DrawBase(context_1)
        if (typ == 0) {
            if (arrPoint1.length > (width1 / step)) {
                arrPoint1.splice(0, 1);
            }
            arrPoint1.push(y_base_1);
            for (var i = 0; i < arrPoint1.length; i++) {
                context_1.lineTo(spance + i * step, arrPoint1[i]);
            }
        } else {
            if (arrPoint2.length > (width1 / step)) {
                arrPoint2.splice(0, 1);
            }
            arrPoint2.push(y_base_1);
            for (var i = 0; i < arrPoint2.length; i++) {
                context_1.lineTo(spance + i * step, arrPoint2[i]);
            }
        }
        // 再一次性将所有图形呈现在html
        context_1.stroke();
        context_1.closePath();
        // OK,这时候已经花完了,现在要算一算我们的下一个目标点的坐标了,算完了以保存在一个全局变量
        // 等待下次再执行画图函数时,将变量添加到数组让canvas画图使用


    }


    function Onetime1() {

        var canvas_1 = document.getElementById("canvas_wave1");
        var tb = document.getElementById("t_b_9");
        // 获得canvas上下文
        canvas_1.width = parseInt(GetStyle2(tb, "width"));
        canvas_1.height = parseInt(GetStyle2(tb, "height"));
        //canvas_1.width=window.innerWidth*0.6;
        //canvas_1.height=300;//window.innerHeight*0.66;
        var context_1 = canvas_1.getContext("2d");
        var urlStr = "/refreshCnt1?time=" + Math.random();
        $.ajax({
            url: urlStr,
            success: function(data) {
                //alert(data);
                // $("#cnt1").html(data);
                y_base1 = 50 + Number(data) % 50;
                // $("#cnt1").html(y_base1.toString());
                //("#cnt").html(data+1000);
                //y_base = 150+ Math.random()*20;
            },
            error: function() {
                // $("#cnt1").html("error");
                //y_base = 250+ Math.random()*20;
            }
        });
        UpdateData(0, context_1, y_base1, canvas_1.width, canvas_1.height);
    }

    function Onetime2() {
        var canvas_1 = document.getElementById("canvas_wave2");
        var tb = document.getElementById("t_b_9");
        // 获得canvas上下文
        canvas_1.width = parseInt(GetStyle2(tb, "width"));
        canvas_1.height = parseInt(GetStyle2(tb, "height"));
        var context_1 = canvas_1.getContext("2d");
        var urlStr = "/refreshCnt2?time=" + Math.random();

        $.ajax({
            url: urlStr,
            success: function(data) {
                //alert(data);
                //$("#cnt2").html(data);
                y_base2 = 100 - Number(data) % 100;
                //  $("#cnt2").html(y_base2.toString());
                //("#cnt").html(data+1000);
                //y_base = 150+ Math.random()*20;
            },
            error: function() {
                //$("#cnt2").html("error");
                //y_base = 250+ Math.random()*20;
            }
        });

        //DrawBase(context_1)
        UpdateData(1, context_1, y_base2, canvas_1.width, canvas_1.height);
    }
    var itv = setInterval(Onetime1, 100);
    var itv = setInterval(Onetime2, 100);
}