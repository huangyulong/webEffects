/**
 * 一个可复用的插件需要满足以下条件：
    插件自身的作用域与用户当前的作用域相互独立，也就是插件内部的私有变量不能影响使用者的环境变量；
    插件需具备默认设置参数；
    插件除了具备已实现的基本功能外，需提供部分API，使用者可以通过该API修改插件功能的默认参数，从而实现用户自定义插件效果；
    插件需提供监听入口，及针对指定元素进行监听，使得该元素与插件响应达到插件效果；
    插件支持链式调用。
 */
(function(){
    // options是默认的参数
    var options = {
        title: '这是一个弹框'
    }

    var api = {
        config: function(ops) {
            // 判断用户有没有传入options 如果没有就返回默认的options
            if(!ops) {
                return options
            } else {
                for(var key in ops) {
                    options[key] = ops[key]
                }
            }
            // 返回this可以进行链式调用
            return this
        },
        listen: function(elem) {
            // 判断传入得是不是dom元素的属性  如果是得话就进行监听并执行函数
            if(typeof elem === 'string') {
                var elems = document.querySelectorAll(elem), i = elems.length;
                while(i--) {
                    this.listen(elems[i])
                }
                return
            }
            if(document.getElementsByClassName('alert').length === 0) {
                methods.creatAlert()
            }
            return this
        }
    }

    var methods = {
        creatAlert: function() {
            var alertDom = document.createElement('div')
            alertDom.className = "alert"
            alertDom.innerHTML = '<p>'+options.title+'</p>'
            document.getElementById('body').appendChild(alertDom)
        }
    }

    this.plugin = api
})()

/**
 * 调用得时候可以这样
 * this.plugin.config(args).listen(elem)
 */