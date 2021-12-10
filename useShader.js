"use strict";

const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2", {
	preserveDrawingBuffer: true,
	antialias: true,
});

const vs = document.getElementById("shader-vs");
const fs = document.getElementById("shader-fs");

const MAX_LIGHTS = 30;

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.clearColor(0.0, 0.0, 0.0, 1.0);

let vertices = [
	-1.0, 1.0, 0.0, // top left
	1.0, 1.0, 0.0, // top right
	-1.0, -1.0, 0.0, // bottom left
	1.0, -1.0, 0.0, // bottom right
];
vertices = new Float32Array(vertices);

// Triangle strip
let indices = [0, 1, 2, 3];

var tempMatrix = mat4.create();
var rotateMatrix = mat4.create();
var mvMatrix = mat4.create();
var pMatrix = mat4.create();

indices = new Uint8Array(indices);

let vao = gl.createVertexArray();
gl.bindVertexArray(vao);

let buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW, 0); //Here we get both triangles for the scene (from verticies)

gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT * 3, 0);

let ibo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW, 0);

const configs = [
	Configuration.scenario1(),
	Configuration.scenario2(),
	Configuration.scenario3(),
	Configuration.scenario5(),
	Configuration.scenario5(), 
];

var mouseX = 0;
var mouseY = 0;
var mousePressed = false;
let lights = [];
let lightsColor = [];
let lightsIntensity = [];
let walls = [];

let fading = { value: 100 };
let lightIntensity = { value: 100 };
let color = { value: [255, 255, 0] };
let configuration = { value: 4 };

const gui = initGUI();

let uniformWindowSize = null;
let uniformMousePos = null;
let uniformMap = null;
let uniformFading = null;
let uniformLights = null;
let uniformLightsColor = null;
let uniformLightsIntensity = null;
let uniformLightsLength = null;
let uniformWalls = null;
let uniformWallsLength = null;

let vertexPositionAttribute = null;
let uniformPMatrix = null;
let uniformMVMatrix = null;
let uniformIsWall = null;

let vShader = new Shader(vs.textContent, gl.VERTEX_SHADER, gl);
let fShader = new Shader(fs.textContent, gl.FRAGMENT_SHADER, gl);

vShader.compileShader();
fShader.compileShader();

mat4.identity(rotateMatrix);

let program = Shader.createProgram(
	vShader.compiledShader,
	fShader.compiledShader,
	gl
);

// Uniforms
uniformWindowSize = gl.getUniformLocation(program, "u_WindowSize");
uniformFading = gl.getUniformLocation(program, "u_Fading");
uniformLights = gl.getUniformLocation(program, "u_Lights");
uniformLightsColor = gl.getUniformLocation(program, "u_LightsColor");
uniformLightsIntensity = gl.getUniformLocation(program, "u_LightsIntensity");
uniformLightsLength = gl.getUniformLocation(program, "u_LightsLength");
uniformWalls = gl.getUniformLocation(program, "u_Walls");
uniformWallsLength = gl.getUniformLocation(program, "u_WallsLength");

uniformIsWall = gl.getUniformLocation(program, "u_drawWall");
vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
gl.enableVertexAttribArray(vertexPositionAttribute);
uniformPMatrix = gl.getUniformLocation(program, "uPMatrix");
uniformMVMatrix = gl.getUniformLocation(program, "uMVMatrix");

gl.useProgram(program);

changeConfig(0);

window.requestAnimationFrame(draw);

function draw() {
	gl.clear(gl.COLOR_BUFFER_BIT);

	mat4.perspective(pMatrix, degToRad(60), canvas.width / canvas.height, 0.1, 1000.0);
	mat4.identity(mvMatrix);
	mat4.translate(pMatrix, pMatrix, [0.0, 0.0, -2.0]);
	mat4.multiply(mvMatrix, rotateMatrix, mvMatrix);

	gl.uniform2f(uniformWindowSize, canvas.width, canvas.height);
	gl.uniform1i(uniformFading, fading.value);
	gl.uniformMatrix4fv(uniformPMatrix, false, pMatrix);
	gl.uniformMatrix4fv(uniformMVMatrix, false, mvMatrix);

	gl.bindVertexArray(vao);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	gl.drawElements(gl.TRIANGLE_STRIP, indices.length, gl.UNSIGNED_BYTE, 0);

	gl.drawElements(gl.TRIANGLE_STRIP, indices.length, gl.UNSIGNED_BYTE, 0);

	window.requestAnimationFrame(draw);
}

function smallRand() {
	return (Math.random() - 0.5) * 0.004;
}

function degToRad(degrees) {
	return (degrees * Math.PI) / 180;
}
function rotateCamera(angle, vector) {
	mat4.identity(tempMatrix);
	mat4.rotate(tempMatrix, tempMatrix, degToRad(angle), vector);
	mat4.multiply(rotateMatrix, tempMatrix, rotateMatrix);
}

function changeConfig(e) {
	let c = configs[configuration.value];

	lights = [];
	lights.push(...c.lights);

	lightsColor = [];
	lightsColor.push(...c.lightsColor);

	lightsIntensity = [];
	lightsIntensity.push(...c.lightsIntensity);

	walls = makeWalls(c.walls);

	updateDisplay();
}

function updateDisplay() {
	gl.uniform2fv(uniformLights, lights);
	gl.uniform3fv(uniformLightsColor, lightsColor);
	gl.uniform1fv(uniformLightsIntensity, lightsIntensity);
	gl.uniform1i(uniformLightsLength, lights.length / 2);

	gl.uniform4fv(uniformWalls, walls);
	console.log(uniformWalls);
	gl.uniform1i(uniformWallsLength, walls.length / 4);
}

function initGUI() {
	const gui = new dat.GUI({ width: 600, enam: "Propriétés" });

	// dynamically add all scenarios
	var scenarios = {};
	for (let i = 0; i < configs.length; ++i) {
		scenarios["Scénario " + (i + 1)] = i;
	}

	let config = gui.add(configuration, "value", scenarios);

	config.__onChange = changeConfig;

	gui.add(fading, "value", 1, 1000).name("Vitesse d'estompement");

	let folder = gui.addFolder("Propriété prochaine lumière");
	folder.add(lightIntensity, "value", 0, 1000).name("Intensité de la lumière");
	folder.addColor(color, "value");
	folder.open();

	return gui;
}