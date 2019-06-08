var arrPoint1 = []; // 用于保存已经波形图的轨迹?
var arrPoint2 = []; // 用于保存已经波形图的轨迹?
var y_base1 = 150;
var y_base2 = 150;

function goBarChart(dataArr) {
    // 声明所需变量
    var canvas, ctx;
    // 图表属
    var cWidth, cHeight, cMargin, cSpace;
    var originX, originY;
    // 柱状图属
    var bMargin, tobalBars, bWidth, maxValue;
    var totalYNomber;
    var color_ = ['blue', 'green', 'red']
        // 运动相关变量
    var ctr, numctr, speed;
    //鼠标移动
    var mousePosition = {};

    // 获得canvas上下
    var canvas = document.getElementById("barChart");
    // 获得canvas上下文
    canvas.width = parseInt(GetStyle1("width"));
    canvas.height = parseInt(GetStyle1("height"));

    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
    }
    initChart(); // 图表初始
    drawLineLabelMarkers(); // 绘制图表轴、标签和标记
    drawBarAnimate(); // 绘制柱状图的动画
    //检测鼠标移
    var mouseTimer = null;
    canvas.addEventListener("mousemove", function(e) {
        e = e || window.event;
        if (e.layerX || e.layerX == 0) {
            mousePosition.x = e.layerX;
            mousePosition.y = e.layerY;
        } else if (e.offsetX || e.offsetX == 0) {
            mousePosition.x = e.offsetX;
            mousePosition.y = e.offsetY;
        }

        clearTimeout(mouseTimer);
        mouseTimer = setTimeout(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawLineLabelMarkers();
            drawBarAnimate(true);
        }, 100);
    });

    //点击刷新图表
    canvas.onclick = function() {
        initChart(); // 图表初始
        drawLineLabelMarkers(); // 绘制图表轴、标签和标记
        drawBarAnimate(); // 绘制折线图的动画
    };

    function GetStyle1(property) {
        var proValue = null;
        var element = document.getElementById("t_b_6");
        if (!document.defaultView) {
            proValue = element.currentStyle[property];
        } else {
            proValue = document.defaultView.getComputedStyle(element)[property];
        }
        return proValue;
    }


    // 图表初始
    function initChart() {
        cMargin = 15;
        cSpace = 45;
        cHeight = canvas.height - cMargin * 2 - cSpace;
        cWidth = canvas.width - cMargin * 2 - cSpace;
        originX = cMargin + cSpace;
        originY = cMargin + cHeight;

        // 柱状图信
        bMargin = 20;
        tobalBars = dataArr.length;
        bWidth = parseInt(cWidth / tobalBars - bMargin);
        maxValue = 0;
        for (var i = 0; i < dataArr.length; i++) {
            var barVal = parseInt(dataArr[i][1]);
            if (barVal > maxValue) {
                maxValue = barVal;
            }
        }
        maxValue += 30;
        totalYNomber = 10;
        // 运动相关
        ctr = 1;
        numctr = 100;
        speed = 10;

    }

    // 绘制图表轴、标签和标记
    function drawLineLabelMarkers() {
        ctx.translate(0.5, 0.5); // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
        ctx.font = "22px Arial";
        ctx.lineWidth = 1;

        ctx.fillStyle = "rgba(0,200,0,0.9)";
        ctx.strokeStyle = "grey";
        // y
        drawLine(originX, originY, originX, cMargin);
        // x
        drawLine(originX, originY, originX + cWidth, originY);

        // 绘制标记
        drawMarkers();
        ctx.translate(-0.5, -0.5); // 还原位置

    }

    // 画线的方
    function drawLine(x, y, X, Y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.closePath();
    }

    // 绘制标记
    function drawMarkers() {
        ctx.fillStyle = "rgba(0,200,0,0.9)";
        ctx.strokeStyle = "grey";
        // 绘制 y
        var oneVal = parseInt(maxValue / totalYNomber);
        ctx.textAlign = "right";
        for (var i = 0; i <= totalYNomber; i++) {
            var markerVal = i * oneVal;
            var xMarker = originX - 5;
            var yMarker = parseInt(cHeight * (1 - markerVal / maxValue)) + cMargin;
            //console.log(xMarker, yMarker+3,markerVal/maxValue,originY);
            ctx.fillText(markerVal, xMarker, yMarker + 3, cSpace); // 文字
            if (i > 0) {
                drawLine(originX, yMarker, originX + cWidth, yMarker);
            }
        }
        // 绘制 x
        ctx.textAlign = "center";
        for (var i = 0; i < tobalBars; i++) {
            var markerVal = dataArr[i][0];
            var xMarker = parseInt(originX + cWidth * (i / tobalBars) + bMargin + bWidth / 2);
            var yMarker = originY + 25;
            ctx.fillText(markerVal, xMarker, yMarker, cSpace); // 文字
        }
        // 绘制标题 y
        ctx.save();
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("任   务", -canvas.height / 2, cSpace - 22);
        ctx.restore();
        // 绘制标题 x
        ctx.fillText("计   划", originX + cWidth / 2, originY + cSpace / 2 + 30);

        ctx.lineWidth = 1; //设置边框大写
        ctx.strokeStyle = "red"; //填充边框颜色
        ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2); //对边框的设置
    }

    //绘制柱形
    function drawBarAnimate(mouseMove) {
        for (var i = 0; i < tobalBars; i++) {
            var oneVal = parseInt(maxValue / totalYNomber);
            var barVal = dataArr[i][1];
            var barH = parseInt(cHeight * barVal / maxValue * ctr / numctr);
            var y = originY - barH;
            var x = originX + (bWidth + bMargin) * i + bMargin;
            drawRect(x, y, bWidth, barH, mouseMove, i); //高度减一避免盖住

            ctx.fillText(parseInt(barVal * ctr / numctr), x + 28, y - 6); // 文字
        }
        if (ctr < numctr) {
            ctr++;
            setTimeout(function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawLineLabelMarkers();
                drawBarAnimate();
            }, speed);
        }
    }

    //绘制方块
    function drawRect(x, y, X, Y, mouseMove, idx) {
        ctx.beginPath();
        ctx.rect(x, y, X, Y);
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";
        if (mouseMove && ctx.isPointInPath(mousePosition.x, mousePosition.y)) { //如果是鼠标移动的到柱状图上，重新绘制图表
            ctx.fillStyle = color_[idx];
        } else {
            ctx.fillStyle = color_[idx];
        }
        ctx.fill();
        ctx.closePath();

    }


}