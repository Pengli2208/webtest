	
var x = 0; // canvas画布原点x
var y = 0; // canvas画布原点y
var arrPoint = []; // 用于保存已经波形图的轨迹点
var index = 0; // 这个我是用来打日志用的..下面为了看清除了多少次canvas画布
var step = 10; // x轴每次走的步长
var width=500; // 这个是画布宽度
var height=500; // 这个是画图高度
var value = 0;
var x_base = 0;

function DrawBase(ctx)
{
    /*
    默认的线条宽度1px
    默认的颜色是黑色
    产生的原因是
    */
    //获取元素
    var grid=10;
    var xLineNumber=Math.floor(width/grid);//计算需要几条横线
    var yLineNumber=Math.floor(height/grid);//计算需要几条竖线
    ctx.strokeStyle="#eee";
    for(var i=0;i<xLineNumber;i++){//循环来画线
        ctx.beginPath();
        ctx.moveTo(i*grid,0);
        ctx.lineTo(i*grid,height);
        ctx.stroke();
    }
    for(var i=0;i<yLineNumber;i++){
        ctx.beginPath();
        ctx.moveTo(0,i*grid);
        ctx.lineTo(width,i*grid);
        ctx.stroke();
    }
    //绘制坐标轴
 
    //1.绘制Y轴
    var spance=20;
    var arrowSize=10;
    ctx.beginPath();
    ctx.moveTo(spance,spance);
    ctx.lineTo(spance,height-spance);
    ctx.strokeStyle="black";
    ctx.stroke();
    //2.绘制X轴
    ctx.beginPath();
    ctx.moveTo(spance,height-spance);
    ctx.lineTo(width-spance,height-spance);
    ctx.stroke();
    //3.绘制X轴的箭头
    ctx.moveTo(width-spance,height-spance-5);
    ctx.lineTo(width-spance,height-spance+5);
    ctx.lineTo(width-spance+10,height-spance);
    ctx.closePath();
    ctx.fill();
    //绘制Y轴箭头
    ctx.moveTo(spance-5,spance);
    ctx.lineTo(spance+5,spance);
    ctx.lineTo(spance,spance-10);
    ctx.closePath();
    ctx.fill();
}

function PageLoad(context_1)
{
	var x0=0.1*canvas_1.width;
	var y0=0.9*canvas_1.height;
	//the begin of the axias
	var widthAx=0.8*canvas_1.width;
	var heightAx=0.8*canvas_1.height;
	//the width and height of the axais system

	context_1.moveTo(0.1*canvas_1.width,0.1*canvas_1.height);
	context_1.lineTo(0.1*canvas_1.width,0.9*canvas_1.height);
	context_1.lineTo(0.9*canvas_1.width,0.9*canvas_1.height);
	context_1.moveTo(0.09*canvas_1.width,0.115*canvas_1.height);
	context_1.lineTo(0.1*canvas_1.width,0.1*canvas_1.height);
	context_1.lineTo(0.11*canvas_1.width,0.115*canvas_1.height);
	context_1.moveTo(0.885*canvas_1.width,0.89*canvas_1.height);
	context_1.lineTo(0.9*canvas_1.width,0.9*canvas_1.height);
	context_1.lineTo(0.885*canvas_1.width,0.91*canvas_1.height);
	context_1.strokeStyle='black';
	context_1.lineWidth=2;
	context_1.stroke();
	context_1.beginPath();
	var textX=[0,1,2,3,4];
	for(var i=0;i<4&&x0<canvas_1.width;i++){

	    context_1.font="20pt Calibri";
	    context_1.fillText(textX[i],x0,y0+20);
	    x0+=0.2*canvas_1.width;
	}//X轴的数字
	var textY=[10,20,30,40];
	x0=0.1*canvas_1.width;
	for(var i=0;i<4&&y0>0;i++)
	{
	    y0-=0.2*canvas_1.height;
	    context_1.font="20pt Calibri";
	    context_1.fillText(textY[i],x0-30,y0);

	}
	// drawData();
	var tempData=[32,22,30];
	y0=0.9*canvas_1.height;
	var nowX0=x0+0.2*canvas_1.width;
	context_1.arc(nowX0,y0-canvas_1.height*0.8*tempData[0]/40,6,0,2*Math.PI);
	context_1.fillStyle="red";
	context_1.fill();
	context_1.beginPath();
	context_1.moveTo(nowX0,y0-canvas_1.height*0.8*tempData[0]/40);
	for(var i=1;i<3;i++)
	{
	    nowX0+=0.2*canvas_1.width;
	    context_1.lineTo(nowX0,y0-tempData[i]/40*canvas_1.height*0.8);
	    context_1.strokeStyle='red';
	    context_1.stroke();
	    context_1.beginPath();
	    context_1.fillStyle="red";
	    context_1.arc(nowX0,y0-tempDat[i]/40*canvas_1.height*0.8,6,0,2*Math.PI);
	    //context_1.stroke();
	    context_1.fill();
	}

}

function UpdateData(context_1, y_base)
{
// 首先让我们的函数周期调用


	
	// 获取canvas对象和context,并进行一系列初始化
	//PageLoad(context_1);

	if(arrPoint.length>(width/step)){
		arrPoint.splice(0,1);
	}
	arrPoint.push(y_base);

	// 开始画了,在画之前先将所有的图形都画出来
	context_1.strokeStyle = "rgb(255,0,0)";
	context_1.fileStyle = "rgb(255,0,0)";
	var grd12 = context_1.createLinearGradient(100,100,500,500);
	grd12.addColorStop(0,'pink');
	grd12.addColorStop(1,'white');
	context_1.fillStyle = grd12;
	context_1.fillRect(0,0,500,500);

	context_1.beginPath();
	//DrawBase(context_1)
	for(var i = 0; i < arrPoint.length; i++){
		context_1.lineTo(i*step,arrPoint[i]);

	}
	// 再一次性将所有图形呈现在html上
	context_1.stroke();
	context_1.closePath();
	// OK,这时候已经花完了,现在要算一算我们的下一个目标点的坐标了,算完了以后,保存在一个全局变量中
	// 等待下次再执行画图函数时,将变量添加到数组中,让canvas画图使用

	
}

