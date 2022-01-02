"use strict";

/* gl.framebufferTexture2D
 * gl.bindTexture
 * sampler 2D pour dessiner les textues (types de données du shader à créer pour faire les rotations...).
 * Pour dessiner des éléments : drawElement ET PAS DRAWARRAY !!! (sinon ne prend pas en compte les indices)
 * Creer une classe MESH où on fait les VEO VAO etc... --> ce sera plus simple.
 * Après mesh.draw, mesh.enable 
 */

const canvas = document.getElementById("canvas");
const gl = canvas.getContext("webgl2", {
	preserveDrawingBuffer: true,
	antialias: true,
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

gl.getExtension("EXT_color_buffer_float"); // pour dessiner dans des textures de floats

const vs = document.getElementById("shader-vs");
const fs = document.getElementById("shader-fs");

const MAX_LIGHTS = 30;

gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.clearColor(0.0, 0.1, 0., 1.0);

let vertices = [
	-1.0, 1.0, 0.0, // top left
	1.0, 1.0, 0.0, // top right
	-1.0, -1.0, 0.0, // bottom left
	1.0, -1.0, 0.0, // bottom right
];

vertices = new Float32Array(vertices);

// Triangle strip
let indices = [0, 1, 2, 3];

// Triangle (not triangle strip)
let wallIndices = [0,1,2,1,2,3];

indices = new Uint8Array(indices);
wallIndices = new Uint8Array(wallIndices);

var tempMatrix = mat4.create();
var rotateMatrix = mat4.create();
var mvMatrix = mat4.create();
var pMatrix = mat4.create();

let vao = gl.createVertexArray();
gl.bindVertexArray(vao);

let buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW, 0); //Here we get both triangles for the scene (from verticies)

gl.enableVertexAttribArray(0);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, vertices.BYTES_PER_ELEMENT * 3, 0);

let ibo = gl.createBuffer();

let wallVBO = 0;
let wallVAO = 0;
let wallEBO = 0;

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
let walls2D = [];
let wallsVertexBuffer = null;
let wallsIndices = null;
let wallsIndicesBuffer = null;
let wallBuffer = null;

let fading = { value: 100 };
let lightIntensity = { value: 100 };
let color = { value: [255, 255, 0] };
let configuration = { value: 0 }; // Change the init scenario

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

let program = Shader.createProgram(vShader.compiledShader, fShader.compiledShader, gl);

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
	gl.viewport(0, 0, canvas.width, canvas.height);

	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.clear(gl.DEPTH_BUFFER_BIT);

	gl.enable(gl.DEPTH_TEST);

	mat4.perspective(pMatrix, degToRad(60), canvas.width / canvas.height, 0.1, 1000.0);
	mat4.identity(mvMatrix);
	mat4.translate(pMatrix, pMatrix, [0.0, 0.0, -2.0]);
	mat4.multiply(mvMatrix, rotateMatrix, mvMatrix);

	gl.uniform2f(uniformWindowSize, canvas.width, canvas.height);
	gl.uniform1i(uniformFading, fading.value);
	gl.uniformMatrix4fv(uniformPMatrix, false, pMatrix);
	gl.uniformMatrix4fv(uniformMVMatrix, false, mvMatrix);

	gl.bindVertexArray(vao);

	gl.uniform1i(uniformIsWall, 0);
	
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	gl.drawElements(gl.TRIANGLE_STRIP, indices.length, gl.UNSIGNED_BYTE, 0);
	
	gl.uniform1i(uniformIsWall, 1);

	gl.bindVertexArray(wallVAO);
	gl.drawElements(gl.TRIANGLES, wallsIndices.length, gl.UNSIGNED_SHORT, 0);
	gl.bindVertexArray(null);

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

function getIndices(walls) {
	// for 4 points : [0, 1, 2, 2, 1, 3]
	// 4 points == 1 wall
	// => for 8 points [0, 1, 2, 2, 1, 3,    4, 5, 6, 6, 7]
	// etc...
	
	// 1 point == 3 items in the wall
	// 4 points = 12 items
	if (walls.length % 12 != 0) {
		return null;
	}
	
	let ret = []

	// walls.length % 12 == 4
	for (let i = 0; i < walls.length; i += 4) {
		ret.push(i);
		ret.push(i+1);
		ret.push(i+2);
		ret.push(i+2);
		ret.push(i+1);
		ret.push(i+3);
	}
	return ret;
}

function changeConfig(e) {
	let c = configs[configuration.value];

	lights = [];
	lights.push(...c.lights);

	lightsColor = [];
	lightsColor.push(...c.lightsColor);

	lightsIntensity = [];
	lightsIntensity.push(...c.lightsIntensity);

	let [walls, indices] = makeWalls(c.walls);
	walls2D = c.walls;
	wallsVertexBuffer = new Float32Array(walls);
	wallsIndices = indices;
	wallsIndicesBuffer = new Uint16Array(wallsIndices);
	
	updateDisplay();
}

function updateDisplay() {
	// disable vertex array for safety
	gl.bindVertexArray(null);

	wallVBO = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, wallVBO);
	gl.bufferData(gl.ARRAY_BUFFER, wallsVertexBuffer, gl.STATIC_DRAW);

	wallEBO = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wallEBO);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, wallsIndicesBuffer, gl.STATIC_DRAW);

	wallVAO = gl.createVertexArray();

	// now bind it to the VAO
	gl.bindVertexArray(wallVAO);
	// bind indices
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wallEBO);
	// vertices and attributes
	gl.bindBuffer(gl.ARRAY_BUFFER, wallVBO);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, false, wallsVertexBuffer.BYTES_PER_ELEMENT * 3, 0);
	gl.enableVertexAttribArray(0);

	// unbind par sécurité
	gl.bindVertexArray(null);
	
	gl.uniform2fv(uniformLights, lights);
	gl.uniform3fv(uniformLightsColor, lightsColor);
	gl.uniform1fv(uniformLightsIntensity, lightsIntensity);
	gl.uniform1i(uniformLightsLength, lights.length / 2);
	gl.uniform4fv(uniformWalls, walls2D);
	gl.uniform1i(uniformWallsLength, walls2D.length / 4);
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

	// let folder = gui.addFolder("Propriété prochaine lumière");
	// folder.add(lightIntensity, "value", 0, 1000).name("Intensité de la lumière");
	// folder.addColor(color, "value");
	// folder.open();

	return gui;
}