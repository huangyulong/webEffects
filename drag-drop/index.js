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
})

var containerOffsetTop = $('#container').offset().top
var containerOffsetLeft = $('#container').offset().left

$('#container').mousedown(function(e){
    console.log(e)
    $('#container').on('mousemove',function(events){
        $('#template').css({
            'top': events.clientY -containerOffsetTop - e.offsetY + 'px',
            'left': events.clientX - containerOffsetLeft - e.offsetX + 'px'
        })
    })
})

$('#template').mousedown(function(e){
    e.stopPropagation();
    $('#container').on('mousemove',function(events){
        $('#template').css({
            'top': events.clientY -containerOffsetTop - e.offsetY + 'px',
            'left': events.clientX - containerOffsetLeft - e.offsetX + 'px'
        })
    })
})

$('#container').mouseup(function(){
    $(this).unbind('mousemove')
})

$('#template').mouseup(function(){
    $(this).unbind('mousemove')
})

