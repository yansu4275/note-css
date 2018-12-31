window.onload = function(){
    //375px 设计图，1rem = 10px
    getRem(375,10)
};
window.onresize = function(){
    getRem(375,10)
};
function getRem(pwidth,prem){
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    html.style.fontSize = oWidth/pwidth*prem + "px";
}