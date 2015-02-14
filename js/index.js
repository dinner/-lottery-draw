var mdArray = [];
var bIsAction = "no";
var bh = 1;
var MyMar;
var heightSpeed = 0.01;
var jsTime = 0;
var resultId = '1';

//读取成功
function ready() {
      var name = 'zlx';
      var phoneNum = 10000000000;
      for(var i=0;i<50;i++){
      	var html = "";
      	var xsPhoneNum = phoneNum.toString().substring(0, 3)+'****'+phoneNum.toString().substring(7, 11);
      	html+="<div class='lef-contList' id='";
      	html+=phoneNum;
      	html+="'><div class='lef-contList-le-title'><div class='lef-contList-le-title-lef'>";
      	html +=name;
      	html +="</div><div class='lef-contList-le-title-rig'>";
      	html += xsPhoneNum;
      	html += '</div>';
      	$('#demo1').append(html);
      	var oInfo = new st_info(name,phoneNum);
      	mdArray.push(oInfo);
      	phoneNum++;
      }	
}
//抽奖人信息结构体
function st_info(name,phone) {
	this.name=name;
	this.phoneNum=phone;
	return this;
}
//
Number.prototype.isEqual = function(number, digits){
	digits = digits == undefined? 10: digits; // 默认精度为10
	return this.toFixed(digits) === number.toFixed(digits);
}
//
Array.prototype.baoremove = function(dx)
　{
　　if(isNaN(dx)||dx>this.length){return false;}
　　this.splice(dx,1);
　}

function Marquee(){
	var demo=document.getElementById("demo");
	var demo2=document.getElementById("demo2");
	var demo1=document.getElementById("demo1");
	demo2.innerHTML=demo1.innerHTML;
	jsTime += 10;
    if(demo2.offsetTop-demo.scrollTop<=0){
        demo.scrollTop-=demo1.offsetHeight;
    }
    else{
        demo.scrollTop += heightSpeed;
        var speed = Math.round(heightSpeed * 100)/100;
        	if (bIsAction == "yes") {
        		if(speed < 10)
        		{
        		heightSpeed += 0.02;
        		}
        	}
        	else{
				if(speed != 1)
				{
        		heightSpeed -= 0.02;
//        		console.log('a');
        		}
        	}
		if(speed.isEqual(1) && bIsAction=="no" && (demo.scrollTop % 58 == 0)){
			clearInterval(MyMar);
			MyMar = null;
			//通过位置偏移计算是第几个div
			var topOffSet = demo.scrollTop;
			var arrayNum = topOffSet/58;//下标
			var oResult = mdArray[arrayNum];
			var resultName = oResult.name;
			var resultPhone = oResult.phoneNum;
			var xsPhone = resultPhone.toString().substring(0, 3)+"****"+resultPhone.toString().substring(7, 11);
			resultId = resultPhone;
		//	alert(arrayNum);
		//	mdArray.slice(arrayNum, 1);
			mdArray.baoremove(arrayNum);
			//
			var html="";
			var id = "ul"+resultPhone;
			html += "<div id='";
			html += id;
			html += "' style='display: none;'><ul><li class='ui-text-le'>"
			html += bh;
			html += "</li><li class='ui-text-con'>";
			html += resultName;
			html += "</li><li class='ui-text-rig'>";
			html += xsPhone;
			html += "</li></ul></div>";
			$('#content').append(html);
			$('#'+id).show('slow');
			document.getElementById('resultName').innerHTML = resultName;
			document.getElementById('resultPhone').innerHTML = xsPhone;
			document.getElementById('labelB').innerHTML=bh;
			bh = bh+1;
			}
        }
//    console.log(demo2.offsetTop + "--" + demo.scrollTop + "--" + demo1.offsetHeight+"--"+speed +"--"+heightSpeed+"--"+demo.scrollTop);
}

function start() {
	MyMar=setInterval(Marquee,10);
}
function end() {
}

function btActionClicked(){
		if(bIsAction == "no"){
			if (MyMar == null) {
				bIsAction = "yes";
				heightSpeed = 1;
				jsTime = 0;
				document.getElementById('btAction').innerHTML="停止";
				document.getElementById('resultName').innerHTML = "";
				document.getElementById('resultPhone').innerHTML = "";
				document.getElementById('labelB').innerHTML=bh;
				//
				var my = document.getElementById(resultId.toString());
				if (my != null){
				    my.parentNode.removeChild(my);
				}
				//
				start();
			}
		}
		else{
			document.getElementById('btAction').innerHTML="开始抽奖";
			bIsAction = "no";
		}
}