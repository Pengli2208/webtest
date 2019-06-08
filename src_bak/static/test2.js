var arrPoint1 = []; // 用于保存已经波形图的轨迹?
var arrPoint2 = []; // 用于保存已经波形图的轨迹?
var y_base1 = 150;
var y_base2 = 150;

function RefreshData() {
    // 图表属
    var cSpaceX, cSpaceH, cMargin;
    var valueYMax;

    function InitChart(canvas) {
        cSpaceH = 30;
        cSpaceX = 45;
        cMargin = 10;
        valueYMax = 800;
    }

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
        var y_base = height - cSpaceH;
        var gridx = 80;
        var yLineNumber = 5;
        var xLineNumber = Math.floor((width - cSpaceH) / gridx); //计算需要几条横
        var gridy = Math.floor((height - cSpaceH) / yLineNumber); //计算需要几条竖
        var yRatio = Math.floor(valueYMax / yLineNumber);
        ctx.strokeStyle = "#eee";
        //Y
        ctx.textAlign = "center";
        ctx.font = "20px Arial";
        for (var i = 0; i < xLineNumber + 1; i++) { //循环来画
            if (i * gridx + cSpaceX <= (width - cSpaceH)) {
                ctx.strokeStyle = "#eee";
                ctx.beginPath();
                ctx.moveTo(i * gridx + cSpaceX, cMargin);
                ctx.lineTo(i * gridx + cSpaceX, y_base);
                ctx.stroke();
                ctx.fillStyle = "rgba(0,200,0,0.9)";
                ctx.strokeStyle = "grey";
                ctx.fillText((i * gridx).toString(), i * gridx + cSpaceH, y_base + 20);
            }
        }
        ctx.strokeStyle = "#eee";
        for (var i = 0; i < yLineNumber + 1; i++) {
            if (height - cSpaceH - i * gridy >= cSpaceH) {
                ctx.strokeStyle = "#eee";
                ctx.beginPath();
                ctx.moveTo(cSpaceX, height - cSpaceH - i * gridy);
                ctx.lineTo(width - cMargin, height - cSpaceH - i * gridy);
                ctx.stroke();
                ctx.fillStyle = "rgba(0,200,0,0.9)";
                ctx.strokeStyle = "grey";
                if (i != 0)
                    ctx.fillText((i * yRatio).toString(), cSpaceX - 20, height - cSpaceH - i * gridy + 10);
            }
        }
        //绘制坐标

        //1.绘制Y   
        var totalYNomber = 8;
        var maxValueY = 800;
        ctx.beginPath();
        ctx.moveTo(cSpaceX, 0);
        ctx.lineTo(cSpaceX, height - cSpaceH);
        ctx.strokeStyle = "rgba(0,200,0,0.9)";
        ctx.fillStyle = "rgba(0,200,0,0.9)";
        ctx.stroke();
        //2.绘制X
        ctx.moveTo(cSpaceX, height - cSpaceH);
        ctx.lineTo(width, height - cSpaceH);
        ctx.stroke();
        ctx.closePath();
        //3.绘制X轴的箭头
        ctx.beginPath();
        ctx.moveTo(width - 10, height - cSpaceH - 5);
        ctx.lineTo(width - 10, height - cSpaceH + 5);
        ctx.lineTo(width, height - cSpaceH);
        ctx.fill();
        ctx.closePath();
        //绘制Y轴箭
        ctx.beginPath();
        ctx.moveTo(cSpaceX - 5, 10);
        ctx.lineTo(cSpaceX + 5, 10);
        ctx.lineTo(cSpaceX, 0);
        ctx.lineTo(cSpaceX - 5, 10);
        ctx.fill();

        ctx.closePath();
        ctx.lineWidth = 1; //设置边框大写
        ctx.strokeStyle = "blue"; //填充边框颜色
        ctx.strokeRect(1, 1, width - 3, height - 3); //对边框的设置
    }


    function UpdateData(typ, context_1, y_base_1, width1, height1) {
        // 首先让我们的函数周期调用
        var step = 10; // x轴每次走的步?
        InitChart(context_1);
        if (typ == 0) {
            valueYMax = 1000;
        } else {
            valueYMax = 60;
        }
        DrawBase(context_1, width1, height1);

        // 获取canvas对象和context,并进行一系列初始
        context_1.beginPath();
        context_1.strokeStyle = "red";
        width1 = width1 - cSpaceX - cMargin;
        //DrawBase(context_1)
        context_1.lineWidth = 2; //设置边框大写
        if (typ == 0) {
            if (arrPoint1.length > (width1 / step)) {
                arrPoint1.splice(0, 1);
            }
            arrPoint1.push(y_base_1);
            for (var i = 0; i < arrPoint1.length; i++) {
                context_1.lineTo(cSpaceX + 1 + i * step, arrPoint1[i]);
            }
        } else {
            if (arrPoint2.length > (width1 / step)) {
                arrPoint2.splice(0, 1);
            }
            arrPoint2.push(y_base_1);
            for (var i = 0; i < arrPoint2.length; i++) {
                context_1.lineTo(cSpaceX + 1 + i * step, arrPoint2[i]);
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
                $("#curr").html(y_base1.toString() + "A");
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
        //InitChart
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
                $("#volt").html(y_base2.toString() + "V");
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