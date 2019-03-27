// 将左侧元素的内容放到变量里面
var targets = '';

// 定义target的index
var targetIndex = 1

// 鼠标位置
var mouseX = 0, mouseY = 0;

var templateDom = $('#template')

// 鼠标按下以后获取目标元素的内容
$('#list').on('mousedown', 'li', function(event) {
    targetIndex++;
    var li = $(this)[0]
    templateDom.css({
       'display': 'block',
       'width': li.offsetWidth,
       'height': li.offsetHeight,
       'top': li.offsetTop,
       'left': li.offsetLeft,
       'z-index': targetIndex
    })
    templateDom.html('<p>'+$(this).html()+'</p>')
    var offsetX = event.offsetX
    var offsetY = event.offsetY
    $('#container').on('mousemove',function(events){
        // console.log(event)
        console.log(events.clientX - offsetX)
        $('#template').css({
            'top': events.clientX - offsetX,
            'left': events.clientY - offsetY
        })
    })
})

$('#template').mousedown(function(event){
    var offsetX = event.offsetX
    var offsetY = event.offsetY
    console.log(event)
    $('#container').on('mousemove',function(events){
        console.log(events)
        console.log(events.clientX - offsetX)
        $('#template').css({
            'top': events.clientY - offsetY - events.target.offsetTop + 'px',
            'left': events.clientX - offsetX - events.target.offsetLeft + 'px'
        })
    })
})

// 移除mousemove事件
$('#container').on('mouseup',function(){
    $(this).unbind('mousemove')
})

$('#container').click(function() {
    console.log('width=='+event.target.offsetWidth+'; height=='+event.target.offsetHeight)
    console.log(event)
})


