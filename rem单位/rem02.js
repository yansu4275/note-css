(function(doc, win) {
		var html = doc.getElementsByTagName("html")[0],
// orientationchange->手机屏幕转屏事件
// resize->页面大小改变事件(一边pc端有用)
          	reEvt = "orientationchange" in win ? "orientationchange" : "resize",
            reFontSize = function() {
	            	var clientW = doc.documentElement.clientWidth || doc.body.clientWidth; 
	          	if(!clientW) {
		     	     return;
	           	};
	
// 根据ui图尺寸设置rem，375px 宽度下，1rem =10px
	           	html.style.fontSize = 10 * (clientW / 375) + "px";
            }
            win.addEventListener(reEvt, reFontSize);

            doc.addEventListener("DOMContentLoaded", reFontSize);
 	})(document, window);  






//var win-w = document.documentElement.scrollWidth
//if (w>=300&&w<=750) {
//	
//} else{
//	
//}
	















