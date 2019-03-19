var video = document.getElementById('video')
var times = document.getElementById('times')
var conBar = document.getElementById('con_bar')
var conBack = document.getElementById('con_back')
var backWidth = conBack.offsetWidth
var current_time = 0;
var all_time = 0;
var allTimeFormate = 0;
var currentTimeFormate = 0;

function renderTime() {
    times.innerHTML = `<p style="color: red">${currentTimeFormate}/${allTimeFomate}</p>`
}
window.onload = function () {
    all_time = parseInt(video.duration)
    allTimeFomate = parseInt(video.duration/60) + ':' + parseInt(video.duration%(60))
    renderTime()
}

// ontimeupdate 用来监听视频播放的时间的
video.ontimeupdate = function() {
    current_time = video.currentTime
    currentTimeFormate = parseInt(video.currentTime/60) + ':' + parseInt(video.currentTime%60)
    conBar.style.width = current_time/all_time * backWidth + 'px'
    renderTime()
}

// layerX 是相对于有个绝对定位的父元素进行定位的
conBack.onclick= function (event) {
    video.currentTime = event.layerX/backWidth*all_time
}







