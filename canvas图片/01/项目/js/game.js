(function(){
    var game = window.game = function(params){
        // 得到画布
        this.canvas =document.querySelector(params.id)
        this.ctx = this.canvas.getContext('2d');
        
        // 资源文件路径
        this.RUrl = params.RUrl

        // 帧编号
        this.fno = 0
        // 设置画布宽高
        this.init()

        // 读取资源，是一个异步函数，但是其他事件必须要在它执行完毕后再执行，所以用回调函数
        var then = this
        this.loadAllResource(function(){
            console.log('图片加载完毕')      
            then.start()      
        })
    }
    // 视口的匹配
    game.prototype.init = function(){
        windowW = document.documentElement.clientWidth
        windowH = document.documentElement.clientHeight
        if (windowW < 320) {
            windowW = 320
        } else if (windowW > 414) {
            windowW = 414
        }
        if (windowH < 500) {
            windowH = 500
        } else if (windowH > 680) {
            windowH = 680
        }
        this.canvas.width = windowW
        this.canvas.height = windowH
    }

    // 读取资源
    game.prototype.loadAllResource = function(callback){
        // 资源对象
        this.R = {}
        // 图片数量
        var a = 0
        // 修改this指向
        var then = this
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                var data = JSON.parse(xhr.responseText).imgs
                console.log(data)
                // 遍历数组
                for(let i = 0; i<data.length; i++){
                    console.log(data[i])
                    // for循环里面的this指向修改
                    then.R[data[i].name] = new Image()
                    // 发送请求
                    then.R[data[i].name].src = data[i].url
                    then.R[data[i].name].onload = function () {
                        a++
                        // 清屏
                        then.ctx.clearRect(0, 0, then.canvas.width, then.canvas.height);
                        
                        // 提示文字，居中
                        var txt = `正在加载${a}/${data.length}，请稍后......`
                        then.ctx.font = "20px 微软雅黑"                        
                        then.ctx.textAlign='center';
                        then.ctx.fillText(txt, then.canvas.width/2, then.canvas.height*(1-0.618));
                        // 判断图片是否加载完成
                        if (a == data.length) {
                            // callback 指的是上面调用这个函数的回调函数
                            callback()
                        }
                    }
                }
                console.log(then.R)
            }
        }
        xhr.open("get", this.RUrl, true)
        xhr.send(null)
    }

    // 开始游戏
    game.prototype.start = function () {
        var then = this
        this.timer = setInterval(() => {
            // 图片加载完毕清屏
            then.ctx.clearRect(0,0,then.canvas.width,then.canvas.height)    
            // 帧数
            this.fno++
            then.ctx.font="15px 雅黑"
            then.ctx.textAlign = "left"
            then.ctx.fillText(then.fno,0,15)
        }, 20);
    }
})()