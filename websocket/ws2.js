var ws = new WebSocket("ws://localhost:8181");
// var ws = new WebSocket("wss://echo.websocket.org");


ws.onopen = function(event){
	console.log("connection open ")
	let user = { name: 'ws2'};
	ws.send(JSON.stringify(user))
}

let inputInfo = document.getElementById('input')

let sendInput = document.getElementById('sendInput');
let showLi = document.getElementById('showLi');
function sendMessage(){
	let content = {
		"name": "ws2",
		"value": inputInfo.value,
		"otherName": "ws1"
	}
	ws.send(JSON.stringify(content))
}

ws.onmessage = function(event) {
	console.log("received message : " + event.data);
	let data = JSON.parse(event.data);
	let li = document.createElement('li');
	li.innerHTML = data.value
	showLi.appendChild(li)
	// ws.close()
}

ws.onclose = function(){
	console.log('connection closed')
}
ws.onerror = function (event) {
	//产生异常
	}; 

function sendInputFn(){
	let content = {
		"name": "ws2",
		"value": sendInput.value,
		"otherName": "ws1"
	}
	ws.send(JSON.stringify(content))
}

