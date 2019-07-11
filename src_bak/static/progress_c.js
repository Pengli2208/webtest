function GetStyle3(element, property) {
	        var proValue = null;
	        if (!document.defaultView) {
	            proValue = element.currentStyle[property];
	        } else {
	            proValue = document.defaultView.getComputedStyle(element)[property];
	        }
	        return proValue;
}

function RefreshProgress()
{
//	var head = document.getElementsByTagName('head');
//	var testScript = document.createElement('script');
//	testScript.src = 'static/gauge.min.js';
//	testScript.type = 'text/javascript';
//	head[0].appendChild(testScript);

	var canvas = document.getElementById('canvasprog'); //获取canvas元素
	var context = canvas.getContext('2d'); //获取画图环境，指明为2d
	var centerX = canvas.width / 2; //Canvas中心点x轴坐标
	var centerY = canvas.height / 2; //Canvas中心点y轴坐标
	var rad = Math.PI * 2 / 100; //将360度分成100份，那么每一份就是rad度
	var speed = 0.1; //加载的快慢就靠它了
	var radius = 100;
	var lineWidth = 40;
	
	function initCanvas()
	{
        	canvas.width = parseInt(GetStyle3(circle, "width"));
        	canvas.height = canvas.width +lineWidth;
		context = canvas.getContext('2d'); //获取画图环境，指明为2d
		centerX = canvas.width / 2; //Canvas中心点x轴坐标
		centerY = canvas.height / 2; //Canvas中心点y轴坐标
		radius = centerX- lineWidth/2;
        }
	//绘制蓝色外圈
	function blueCircle(n) {
	  context.save();
	  context.beginPath();
	  context.strokeStyle = "#49f";
	  context.lineWidth = lineWidth;
	  context.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + n * rad, false);
	  context.stroke();
	  context.restore();
	}
 
	//绘制白色外圈
	function whiteCircle() {
	  context.save();
	  context.beginPath();
	  context.strokeStyle = "#A5DEF1";
	  context.lineWidth = lineWidth;
	  context.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
	  context.stroke();
	  context.closePath();
	  context.restore();
	}
	 
	//百分比文字绘制
	function text(n) {
	  context.save();
	  context.fillStyle = "#F47C7C";
	  context.font = "60px Arial";
	  context.textAlign = "center";
	  context.textBaseline = "middle";
	  context.fillText(n.toFixed(0) + "%", centerX, centerY);
	  context.restore();
	}
 
	//动画循环
	(function drawFrame() {
	  initCanvas();
	  window.requestAnimationFrame(drawFrame, canvas);
	  context.clearRect(0, 0, canvas.width, canvas.height);
	 
	  whiteCircle();
	  text(speed);
	  blueCircle(speed);
	 
	  if (speed > 100) speed = 0;
	  speed += 0.1;
	})();
	//window.requestAnimationFrame(drawFrame, canvas);
}

function AddGauge()
{
	var canvas_g = document.getElementById('gauge1'); 
	canvas_g.width = parseInt(GetStyle3(circle, "width"));
	canvas_g.height = canvas_g.width ;
		
	var radius = canvas_g.width/2;
	new RadialGauge({
				renderTo: canvas_g,//'gauge1',
				width: radius*2,
				height: radius*2,
				X: radius,
				Y: radius,
				units: '效  率',
				title: false,
				value: 0,
				minValue: 0,
				maxValue: 100,
				majorTicks: [
					'0','10','20','30','40','50','60','70','80','90','100',
				],
				minorTicks: 2,
				strokeTicks: false,
				highlights: [
					{ from: 0, to: 50, color: 'rgba(0,255,0,.15)' },
					{ from: 50, to: 70, color: 'rgba(255,255,0,.15)' },
					{ from: 70, to: 80, color: 'rgba(255,30,0,.25)' },
					{ from: 80, to: 100, color: 'rgba(255,0,225,.25)' },
				],
				colorPlate: '#222',
				colorMajorTicks: '#f5f5f5',
				colorMinorTicks: '#ddd',
				colorTitle: '#fff',
				colorUnits: '#ccc',
				colorNumbers: '#eee',
				colorNeedle: 'rgba(240, 128, 128, 1)',
				colorNeedleEnd: 'rgba(255, 160, 122, .9)',
				valueBox: true,
				animationRule: 'bounce',
				animationDuration: 500
			}).draw();
		
//	new RadialGauge({ renderTo: 'gauge2' }).draw();
//
	if (!window.addEventListener) {
		window.addEventListener = function(evt, listener) {
			window.attachEvent('on' + evt, listener);
		};
	}
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(cb) {
			var i = 0, s = this.length;
			for (; i < s; i++) {
				cb && cb(this[i], i, this);
			}
		}
	}
	// animage all gauges on a page
	window.addEventListener('load', function() {
		document.gauges.forEach(function(gauge) {
			setInterval(function() {
				gauge.value = Math.random() *
					(gauge.options.maxValue - gauge.options.minValue) +
					gauge.options.minValue;
			}, gauge.animation.duration + 500);
		});
	});
}