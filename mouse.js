var graphicsCanvas = document.getElementById("canvas");
function getMousePosition(graphicsCanvas, evt) {
	var rect = graphicsCanvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top,
	};
}
graphicsCanvas.addEventListener(
	"mousedown",
	function (evt) {
		if (evt.button == 0) {
			mousePressed = true;
			var mousePosition = getMousePosition(graphicsCanvas, evt);
			mouseX = mousePosition.x;
			mouseY = mousePosition.y;
		}
	},
	false
);
graphicsCanvas.addEventListener(
	"mousemove",
	function (evt) {
		if (mousePressed) {
			var mousePosition = getMousePosition(graphicsCanvas, evt);
			var diffX = mousePosition.x - mouseX;
			var diffY = mousePosition.y - mouseY;
			mouseX = mousePosition.x;
			mouseY = mousePosition.y;
			rotateCamera(diffY, [1, 0, 0]);
			rotateCamera(diffX, [0, 1, 0]);
		}
	},
	false
);
graphicsCanvas.addEventListener(
	"mouseup",
	function (evt) {
		if (evt.button == 0) {
			mousePressed = false;
		}
	},
	false
);